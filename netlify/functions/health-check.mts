import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createLogger, makeRequestId } from "./_shared/logger";

const FN = "health-check";
const TABLES = [
  "beta_requests",
  "email_verification_tokens",
  "pricing_inquiries",
  "audit_events",
] as const;

export default async function handler(request: Request): Promise<Response> {
  const requestId = makeRequestId();
  const log = createLogger(FN, requestId);

  log.info("health_check_start");

  // Auth gate
  const adminKey = process.env.ADMIN_DEBUG_KEY;
  const providedKey = request.headers.get("x-debug-key");

  if (!adminKey || providedKey !== adminKey) {
    log.warn("health_check_unauthorized");
    return Response.json({ ok: false, error: "UNAUTHORIZED", requestId }, { status: 401 });
  }

  // ── Database env (required) ───────────────────────────────────────────────
  const dbRequired = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
  const dbEnvReady = Object.values(dbRequired).every(Boolean);

  // ── Email env (optional) ──────────────────────────────────────────────────
  const emailOptional = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    PRICING_TEAM_EMAIL: !!process.env.PRICING_TEAM_EMAIL,
  };
  const emailEnvReady = Object.values(emailOptional).every(Boolean);

  // ── Other env ─────────────────────────────────────────────────────────────
  const siteEnv = {
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
    ADMIN_DEBUG_KEY: !!process.env.ADMIN_DEBUG_KEY,
    NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE: !!process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  const missingDb = Object.entries(dbRequired).filter(([, v]) => !v).map(([k]) => k);
  const missingEmail = Object.entries(emailOptional).filter(([, v]) => !v).map(([k]) => k);

  if (missingDb.length > 0) {
    log.error("database_env_missing", { missing: missingDb });
  } else {
    log.info("database_env_ok");
  }
  if (missingEmail.length > 0) {
    log.warn("email_env_missing_optional", { missing: missingEmail });
  } else {
    log.info("email_env_ok");
  }

  // ── Supabase connectivity + table checks ──────────────────────────────────
  const tables: Record<string, boolean> = {};
  let supabaseConnected = false;
  let supabaseError: string | undefined;

  if (!dbEnvReady) {
    supabaseError = `Missing required env: ${missingDb.join(", ")}`;
    log.error("supabase_skipped", { reason: supabaseError });
  } else {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );

      for (const table of TABLES) {
        try {
          const { error } = await supabase.from(table).select("id").limit(1);
          tables[table] = !error;
          if (error) {
            log.error(`table_check_failed_${table}`, { error: error.message, code: error.code });
          } else {
            log.info(`table_check_ok_${table}`);
          }
        } catch (e) {
          tables[table] = false;
          log.error(`table_check_exception_${table}`, {
            error: e instanceof Error ? e.message : String(e),
          });
        }
      }

      supabaseConnected = Object.values(tables).every(Boolean);
      log.info("supabase_check_complete", { connected: supabaseConnected });
    } catch (e) {
      supabaseError = e instanceof Error ? e.message : String(e);
      log.error("supabase_exception", { error: supabaseError });
    }
  }

  // ── Resend configured check ───────────────────────────────────────────────
  let resendConfigured = false;
  let resendError: string | undefined;

  if (!process.env.RESEND_API_KEY) {
    resendError = "RESEND_API_KEY not set";
    log.warn("resend_not_configured");
  } else {
    try {
      new Resend(process.env.RESEND_API_KEY);
      resendConfigured = true;
      log.info("resend_configured");
    } catch (e) {
      resendError = e instanceof Error ? e.message : String(e);
      log.error("resend_init_failed", { error: resendError });
    }
  }

  // ok = database is fully ready (env + tables)
  const ok = dbEnvReady && supabaseConnected;

  log.info("health_check_complete", { ok, db_ready: dbEnvReady, email_ready: emailEnvReady });

  return Response.json(
    {
      ok,
      requestId,
      database: {
        ready: dbEnvReady && supabaseConnected,
        required: dbRequired,
        tables,
        ...(supabaseError ? { error: supabaseError } : {}),
      },
      email: {
        ready: emailEnvReady && resendConfigured,
        optional: emailOptional,
        resend_configured: resendConfigured,
        ...(resendError ? { error: resendError } : {}),
      },
      site: siteEnv,
    },
    { status: ok ? 200 : 503 }
  );
}
