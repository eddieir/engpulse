import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { hashToken } from "@/lib/crypto";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!code) {
    return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_not_configured`);
  }

  // Validate the session cookie so we can associate the connection to the user
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("ep_access_token")?.value;

  if (!rawToken) {
    return Response.redirect(`${siteUrl}/verify-required`);
  }

  const supabase = createServerClient();
  const tokenHash = hashToken(rawToken);

  const { data: session } = await supabase
    .from("access_sessions")
    .select("id, beta_request_id, expires_at, status")
    .eq("access_token_hash", tokenHash)
    .single();

  if (!session || session.status !== "active" || new Date(session.expires_at) < new Date()) {
    return Response.redirect(`${siteUrl}/verify-required`);
  }

  try {
    // Exchange the code for an access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenRes.ok) {
      return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
    }

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
    }

    const githubToken: string = tokenData.access_token;
    const scopes: string[] = (tokenData.scope || "").split(",").filter(Boolean);

    // Fetch the authenticated GitHub user
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!userRes.ok) {
      return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
    }

    const ghUser = await userRes.json();

    // NOTE: raw GitHub token is NOT stored — only the connection metadata.
    // If you need to make ongoing API calls, encrypt the token before storing.
    const { error: connError } = await supabase.from("github_connections").insert({
      beta_request_id: session.beta_request_id,
      provider: "github",
      provider_user_id: String(ghUser.id),
      provider_username: ghUser.login,
      provider_org: ghUser.company || null,
      access_status: "connected",
      scopes,
      connected_at: new Date().toISOString(),
    });

    if (connError) {
      console.error("github_connections insert error:", connError);
      return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
    }

    await supabase.from("audit_events").insert({
      event_type: "github_oauth_connected",
      entity_type: "github_connection",
      email: null,
      metadata: { username: ghUser.login, scopes },
    });

    return Response.redirect(`${siteUrl}/onboarding/connect-github?connected=true`);
  } catch (err) {
    console.error("GitHub OAuth callback error:", err);
    return Response.redirect(`${siteUrl}/onboarding/connect-github?error=oauth_failed`);
  }
}
