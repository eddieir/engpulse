import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { hashToken } from "@/lib/crypto";
import { cookies } from "next/headers";

// GET /api/session/check
// Returns the current session status for client-side access checks.
export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("ep_access_token")?.value;

    if (!rawToken) {
      return Response.json({ authenticated: false, reason: "no_token" });
    }

    const supabase = createServerClient();
    const tokenHash = hashToken(rawToken);

    const { data: session } = await supabase
      .from("access_sessions")
      .select("id, beta_request_id, expires_at, status, last_seen_at")
      .eq("access_token_hash", tokenHash)
      .single();

    if (!session) {
      return Response.json({ authenticated: false, reason: "invalid_token" });
    }

    if (session.status !== "active") {
      return Response.json({ authenticated: false, reason: "revoked" });
    }

    if (new Date(session.expires_at) < new Date()) {
      // Mark as expired in DB
      await supabase
        .from("access_sessions")
        .update({ status: "expired" })
        .eq("id", session.id);
      await supabase
        .from("beta_requests")
        .update({ status: "expired", updated_at: new Date().toISOString() })
        .eq("id", session.beta_request_id);
      return Response.json({ authenticated: false, reason: "expired" });
    }

    // Update last_seen_at
    await supabase
      .from("access_sessions")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("id", session.id);

    const { data: betaRequest } = await supabase
      .from("beta_requests")
      .select("full_name, email, access_expires_at, selected_plan")
      .eq("id", session.beta_request_id)
      .single();

    return Response.json({
      authenticated: true,
      beta_request_id: session.beta_request_id,
      expires_at: session.expires_at,
      full_name: betaRequest?.full_name,
      email: betaRequest?.email,
      selected_plan: betaRequest?.selected_plan,
    });
  } catch (err) {
    console.error("session check error:", err);
    return Response.json({ authenticated: false, reason: "server_error" });
  }
}
