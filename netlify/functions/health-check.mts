import { createClient } from "@supabase/supabase-js";

export default async function handler(request: Request): Promise<Response> {
  // Require admin debug key
  const adminKey = process.env.ADMIN_DEBUG_KEY;
  const providedKey = request.headers.get("x-debug-key");

  if (!adminKey || providedKey !== adminKey) {
    return Response.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const env = {
    siteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    resendApiKey: !!process.env.RESEND_API_KEY,
    emailFrom: !!process.env.EMAIL_FROM,
    pricingTeamEmail: !!process.env.PRICING_TEAM_EMAIL,
    adminDebugKey: !!process.env.ADMIN_DEBUG_KEY,
  };

  const missingEnv = Object.entries(env)
    .filter(([, present]) => !present)
    .map(([name]) => name);

  if (missingEnv.length > 0) {
    console.error("[health-check] Missing env vars:", missingEnv.join(", "));
  } else {
    console.log("[health-check] All env vars present");
  }

  // Ping Supabase
  let dbConnected = false;
  let dbError: string | null = null;
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && key) {
      const supabase = createClient(url, key, { auth: { persistSession: false } });
      const { error } = await supabase.from("beta_requests").select("id").limit(1);
      if (error) {
        dbError = error.message;
        console.error("[health-check] Supabase ping error:", error.message);
      } else {
        dbConnected = true;
        console.log("[health-check] Supabase ping: ok");
      }
    } else {
      dbError = "Missing Supabase env vars — skipping DB ping";
      console.error("[health-check] Skipping DB ping:", dbError);
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
    console.error("[health-check] Supabase exception:", dbError);
  }

  const ok = missingEnv.length === 0 && dbConnected;

  return Response.json(
    {
      ok,
      env,
      missingEnv,
      database: {
        connected: dbConnected,
        ...(dbError ? { error: dbError } : {}),
      },
    },
    { status: ok ? 200 : 503 }
  );
}
