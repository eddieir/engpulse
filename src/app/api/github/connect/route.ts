import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { hashToken } from "@/lib/crypto";
import { cookies } from "next/headers";

// POST /api/github/connect
// Records a GitHub connection (simulated or real OAuth) for the current session.
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("ep_access_token")?.value;

    if (!rawToken) {
      return Response.json({ error: "Not authenticated." }, { status: 401 });
    }

    const supabase = createServerClient();
    const tokenHash = hashToken(rawToken);

    // Look up session
    const { data: session } = await supabase
      .from("access_sessions")
      .select("id, beta_request_id, expires_at, status")
      .eq("access_token_hash", tokenHash)
      .single();

    if (!session || session.status !== "active") {
      return Response.json({ error: "Session not found or expired." }, { status: 401 });
    }

    if (new Date(session.expires_at) < new Date()) {
      return Response.json({ error: "Access expired." }, { status: 403 });
    }

    const body = await request.json();
    const { mode, repos } = body; // mode: "probe" | "simulated" | "oauth"

    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const isRealOAuth = githubClientId && mode !== "simulated" && mode !== "probe";

    if (isRealOAuth || (githubClientId && mode === "probe")) {
      // Return OAuth redirect URL — client will follow it
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
      const redirectUri = `${siteUrl}/api/github/callback`;
      const scope = "read:org,repo";
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
      return Response.json({ redirect: githubAuthUrl });
    }

    // probe mode with no OAuth configured — just acknowledge, no DB write
    if (mode === "probe") {
      return Response.json({ success: true, mode: "simulated" });
    }

    // Simulated mode: create connection record with repos
    const { data: conn, error: connError } = await supabase
      .from("github_connections")
      .insert({
        beta_request_id: session.beta_request_id,
        provider: "github",
        access_status: "simulated",
        connected_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (connError || !conn) {
      console.error("github_connections insert error:", connError);
      return Response.json({ error: "Server error." }, { status: 500 });
    }

    // Save selected repos if provided
    if (repos && Array.isArray(repos) && repos.length > 0) {
      await supabase.from("selected_repositories").insert(
        repos.map((r: { name: string; full_name: string }) => ({
          beta_request_id: session.beta_request_id,
          github_connection_id: conn.id,
          repo_name: r.name,
          repo_full_name: r.full_name,
          provider: "github",
          is_selected: true,
        }))
      );
    }

    await supabase.from("audit_events").insert({
      event_type: "github_simulated",
      entity_type: "github_connection",
      entity_id: conn.id,
    });

    return Response.json({ success: true, mode: "simulated" });
  } catch (err) {
    console.error("github connect error:", err);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
