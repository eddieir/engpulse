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

  // Env inventory — booleans only, never values
  const envVars = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "PRICING_TEAM_EMAIL",
    "ADMIN_DEBUG_KEY",
    "NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE",
  ] as const;

  const environment: Record<string, boolean> = {};
  const missingEnv: string[] = [];
  for (const key of envVars) {
    const present = !!process.env[key];
    environment[key] = present;
    if (!present) missingEnv.push(key);
  }

  if (missingEnv.length > 0) {
    log.warn("env_vars_missing", { missing: missingEnv });
  } else {
    log.info("env_vars_ok");
  }

  // Supabase connectivity + table checks
  const supabaseResult: {
    connected: boolean;
    tables: Record<string, boolean>;
    error?: string;
  } = { connected: false, tables: {} };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    supabaseResult.error = "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY";
    log.error("supabase_skipped", { reason: supabaseResult.error });
  } else {
    try {
      const supabase = createClient(url, key, { auth: { persistSession: false } });

      for (const table of TABLES) {
        try {
          const { error } = await supabase.from(table).select("id").limit(1);
          supabaseResult.tables[table] = !error;
          if (error) {
            log.error(`table_check_failed_${table}`, { error: error.message, code: error.code });
          } else {
            log.info(`table_check_ok_${table}`);
          }
        } catch (e) {
          supabaseResult.tables[table] = false;
          log.error(`table_check_exception_${table}`, {
            error: e instanceof Error ? e.message : String(e),
          });
        }
      }

      supabaseResult.connected = Object.values(supabaseResult.tables).every(Boolean);
      log.info("supabase_check_complete", { connected: supabaseResult.connected });
    } catch (e) {
      supabaseResult.error = e instanceof Error ? e.message : String(e);
      log.error("supabase_exception", { error: supabaseResult.error });
    }
  }

  // Resend configured check (no actual send — just verify key is present)
  const resendKey = process.env.RESEND_API_KEY;
  const resendConfigured = !!resendKey;
  let resendError: string | undefined;

  if (!resendConfigured) {
    resendError = "RESEND_API_KEY not set";
    log.warn("resend_not_configured");
  } else {
    // Lightweight probe: instantiate client only, no email sent
    try {
      new Resend(resendKey);
      log.info("resend_configured");
    } catch (e) {
      resendError = e instanceof Error ? e.message : String(e);
      log.error("resend_init_failed", { error: resendError });
    }
  }

  const allOk =
    missingEnv.length === 0 && supabaseResult.connected && resendConfigured && !resendError;

  log.info("health_check_complete", { ok: allOk });

  return Response.json(
    {
      ok: allOk,
      requestId,
      environment,
      missingEnv,
      supabase: {
        connected: supabaseResult.connected,
        tables: supabaseResult.tables,
        ...(supabaseResult.error ? { error: supabaseResult.error } : {}),
      },
      resend: {
        configured: resendConfigured,
        ...(resendError ? { error: resendError } : {}),
      },
    },
    { status: allOk ? 200 : 503 }
  );
}
