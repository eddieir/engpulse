import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { hashToken, generateSecureToken } from "@/lib/crypto";
import { sendAccessActivatedEmail } from "@/lib/emails";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawToken = searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!rawToken) {
    return Response.redirect(`${siteUrl}/invalid-token`);
  }

  const supabase = createServerClient();
  const tokenHash = hashToken(rawToken);

  // Look up token
  const { data: tokenRecord, error: tokenError } = await supabase
    .from("email_verification_tokens")
    .select("id, beta_request_id, expires_at, used_at, email")
    .eq("token_hash", tokenHash)
    .single();

  if (tokenError || !tokenRecord) {
    return Response.redirect(`${siteUrl}/invalid-token`);
  }

  if (tokenRecord.used_at) {
    return Response.redirect(`${siteUrl}/invalid-token?reason=used`);
  }

  if (new Date(tokenRecord.expires_at) < new Date()) {
    return Response.redirect(`${siteUrl}/invalid-token?reason=expired`);
  }

  // Look up beta request
  const { data: betaRequest } = await supabase
    .from("beta_requests")
    .select("id, full_name, email, status")
    .eq("id", tokenRecord.beta_request_id)
    .single();

  if (!betaRequest) {
    return Response.redirect(`${siteUrl}/invalid-token`);
  }

  if (betaRequest.status === "active") {
    // Already verified — just redirect
    return Response.redirect(`${siteUrl}/onboarding/connect-github`);
  }

  const now = new Date();
  const accessExpiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Mark token as used
  await supabase
    .from("email_verification_tokens")
    .update({ used_at: now.toISOString() })
    .eq("id", tokenRecord.id);

  // Update beta request
  await supabase
    .from("beta_requests")
    .update({
      status: "active",
      email_verified_at: now.toISOString(),
      access_start_at: now.toISOString(),
      access_expires_at: accessExpiresAt.toISOString(),
      updated_at: now.toISOString(),
    })
    .eq("id", betaRequest.id);

  // Create access session
  const rawAccessToken = generateSecureToken();
  const accessTokenHash = hashToken(rawAccessToken);

  await supabase.from("access_sessions").insert({
    beta_request_id: betaRequest.id,
    access_token_hash: accessTokenHash,
    status: "active",
    expires_at: accessExpiresAt.toISOString(),
  });

  // Send access activated email
  try {
    await sendAccessActivatedEmail({
      to: betaRequest.email,
      name: betaRequest.full_name,
      expiresAt: accessExpiresAt,
    });
  } catch (e) {
    console.error("sendAccessActivatedEmail error:", e);
  }

  // Audit events
  await supabase.from("audit_events").insert([
    {
      event_type: "email_verified",
      entity_type: "beta_request",
      entity_id: betaRequest.id,
      email: betaRequest.email,
    },
    {
      event_type: "access_activated",
      entity_type: "beta_request",
      entity_id: betaRequest.id,
      email: betaRequest.email,
      metadata: { expires_at: accessExpiresAt.toISOString() },
    },
  ]);

  // Set httpOnly session cookie
  const cookieStore = await cookies();
  cookieStore.set("ep_access_token", rawAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: accessExpiresAt,
  });

  return Response.redirect(`${siteUrl}/onboarding/connect-github`);
}
