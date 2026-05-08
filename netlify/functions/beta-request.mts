import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomBytes, createHash } from "crypto";
import { createLogger, makeRequestId } from "./_shared/logger";
import { validateEnv, ENV_DB, ENV_EMAIL } from "./_shared/env";

const FN = "beta-request";

// ── response helpers ─────────────────────────────────────────────────────────

function jsonOk(requestId: string, message: string, extra?: Record<string, unknown>): Response {
  return Response.json({ ok: true, message, requestId, ...extra });
}

function jsonFail(
  requestId: string,
  status: number,
  error: string,
  message: string,
  fields?: Record<string, string>
): Response {
  return Response.json(
    { ok: false, error, message, requestId, ...(fields ? { fields } : {}) },
    { status }
  );
}

// ── internal helpers ─────────────────────────────────────────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function sendVerificationEmail(
  to: string,
  name: string,
  token: string
): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";
  const verifyUrl = `${siteUrl}/verify-email?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const result = await resend.emails.send({
    from,
    to,
    subject: "Activate your EngPulse 7-day demo access",
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:40px 20px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:#2563eb;padding:32px 40px;text-align:center">
      <span style="color:#fff;font-weight:700;font-size:18px">⚡ EngPulse</span>
    </div>
    <div style="padding:40px">
      <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 12px">Hi ${name},</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px">
        You requested 7-day demo access to <strong>EngPulse</strong> — the board-ready engineering reporting tool.
      </p>
      <p style="color:#475569;line-height:1.6;margin:0 0 32px">
        Click the button below to activate your account. This link expires in <strong>24 hours</strong>.
      </p>
      <div style="text-align:center;margin:0 0 32px">
        <a href="${verifyUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 32px;border-radius:12px">
          Activate demo access →
        </a>
      </div>
      <p style="color:#94a3b8;font-size:13px;margin:0">If you didn't request this, ignore this email.</p>
      <p style="color:#94a3b8;font-size:13px;margin:8px 0 0">Or copy this link: <a href="${verifyUrl}" style="color:#2563eb">${verifyUrl}</a></p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse</p>
    </div>
  </div>
</body>
</html>`,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
}

// ── handler ───────────────────────────────────────────────────────────────────

export default async function handler(request: Request): Promise<Response> {
  const requestId = makeRequestId();
  const log = createLogger(FN, requestId);

  // 1. start
  log.info("beta_request_start", { method: request.method });

  // 2. method check
  if (request.method !== "POST") {
    log.warn("request_method_rejected", { method: request.method });
    return jsonFail(requestId, 405, "METHOD_NOT_ALLOWED", "Method not allowed.");
  }
  log.info("request_method_checked");

  // 3–5. body parse
  log.info("body_parse_start");
  let body: Record<string, unknown>;
  try {
    body = await request.json();
    log.info("body_parse_success", { keys: Object.keys(body) });
  } catch {
    log.error("body_parse_failed");
    return jsonFail(requestId, 400, "BAD_REQUEST", "Invalid JSON body.");
  }

  const {
    full_name,
    email,
    company,
    role,
    team_size,
    current_reporting_method,
    biggest_reporting_pain,
    would_send_to_ceo,
    preferred_language,
    selected_plan,
  } = body;

  // 6–8. validation
  log.info("validation_start");
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!team_size) missingFields.team_size = "Engineering team size is required.";

  if (Object.keys(missingFields).length > 0) {
    log.warn("validation_failed", { missingFields: Object.keys(missingFields) });
    return jsonFail(
      requestId,
      400,
      "VALIDATION_ERROR",
      "Please complete all required fields.",
      missingFields
    );
  }

  const emailStr = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    log.warn("validation_failed", { reason: "invalid_email" });
    return jsonFail(requestId, 400, "VALIDATION_ERROR", "Please enter a valid email address.", {
      email: "Invalid email address.",
    });
  }
  log.info("validation_success");

  // 9–11. env check
  log.info("env_check_start");
  const dbEnv = validateEnv([...ENV_DB]);
  const emailEnv = validateEnv([...ENV_EMAIL]);

  if (!dbEnv.ok) {
    log.error("env_check_failed", { missing: dbEnv.missing });
    return jsonFail(
      requestId,
      503,
      "CONFIG_ERROR",
      "Beta requests are temporarily unavailable. Please contact us."
    );
  }
  if (!emailEnv.ok) {
    log.warn("env_check_email_missing", { missing: emailEnv.missing });
    // email will fail gracefully below — do not block DB save
  }
  log.info("env_check_success", { db: true, email: emailEnv.ok });

  // 12–13. Supabase client
  log.info("supabase_client_create_start");
  let supabase: ReturnType<typeof getSupabase>;
  try {
    supabase = getSupabase();
    log.info("supabase_client_create_success");
  } catch (e) {
    log.error("supabase_client_create_failed", {
      error: e instanceof Error ? e.message : String(e),
    });
    return jsonFail(
      requestId,
      503,
      "CONFIG_ERROR",
      "Beta requests are temporarily unavailable. Please contact us."
    );
  }

  // 14–16. duplicate check
  log.info("duplicate_check_start");
  const { data: existing, error: dupError } = await supabase
    .from("beta_requests")
    .select("id, status")
    .eq("email", emailStr)
    .in("status", ["pending_email_verification", "email_verified", "active"])
    .maybeSingle();

  if (dupError) {
    log.error("duplicate_check_failed", { error: dupError.message, code: dupError.code });
    return jsonFail(
      requestId,
      500,
      "DATABASE_ERROR",
      "We could not verify your email. Please try again."
    );
  }
  log.info("duplicate_check_success", { found: !!existing });

  if (existing) {
    log.info("duplicate_found", { status: existing.status });
    if (existing.status === "active") {
      return jsonFail(
        requestId,
        409,
        "ALREADY_ACTIVE",
        "This email already has active beta access. Check your inbox or go to onboarding."
      );
    }
    return jsonFail(
      requestId,
      409,
      "DUPLICATE_BETA_REQUEST",
      "We already sent a verification email to this address. Check your inbox (and spam folder) or wait 24 hours."
    );
  }

  // 17–19. beta_requests insert
  log.info("beta_insert_start");
  const { data: betaRequest, error: insertError } = await supabase
    .from("beta_requests")
    .insert({
      full_name: String(full_name).trim(),
      email: emailStr,
      company: String(company).trim(),
      role: String(role),
      team_size: String(team_size),
      current_reporting_method: current_reporting_method
        ? String(current_reporting_method)
        : null,
      biggest_reporting_pain: biggest_reporting_pain
        ? String(biggest_reporting_pain)
        : null,
      would_send_to_ceo: Boolean(would_send_to_ceo),
      preferred_language: preferred_language ? String(preferred_language) : "en",
      selected_plan: selected_plan ? String(selected_plan) : "Free Beta",
      status: "pending_email_verification",
    })
    .select("id")
    .single();

  if (insertError || !betaRequest) {
    log.error("beta_insert_failed", {
      error: insertError?.message,
      code: insertError?.code,
      details: insertError?.details,
    });
    return jsonFail(
      requestId,
      500,
      "DATABASE_ERROR",
      "We could not save your request. Please try again."
    );
  }
  log.info("beta_insert_success", { id: betaRequest.id });

  // 20–22. token generate + insert
  log.info("token_generate_start");
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  log.info("token_generate_success");

  log.info("token_insert_start");
  const { error: tokenError } = await supabase.from("email_verification_tokens").insert({
    beta_request_id: betaRequest.id,
    email: emailStr,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (tokenError) {
    log.error("token_insert_failed", { error: tokenError.message, code: tokenError.code });
    return jsonFail(
      requestId,
      500,
      "DATABASE_ERROR",
      "We could not generate your verification link. Please try again."
    );
  }
  log.info("token_insert_success");

  // 23–25. email send (non-blocking — DB is already saved)
  log.info("email_send_start");
  let emailSent = true;
  try {
    await sendVerificationEmail(emailStr, String(full_name).trim(), rawToken);
    log.info("email_send_success");
  } catch (emailErr) {
    emailSent = false;
    log.error("email_send_failed", {
      error: emailErr instanceof Error ? emailErr.message : String(emailErr),
    });
  }

  // 26–28. audit event (fire-and-forget)
  log.info("audit_event_start");
  void (async () => {
    const { error } = await supabase.from("audit_events").insert({
      event_type: "beta_form_submitted",
      entity_type: "beta_request",
      entity_id: betaRequest.id,
      email: emailStr,
      metadata: { plan: selected_plan, role, team_size, email_sent: emailSent, requestId },
    });
    if (error) log.warn("audit_event_failed", { error: error.message });
    else log.info("audit_event_success");
  })();

  // 29–30. final response
  if (!emailSent) {
    log.warn("beta_request_partial_success", { email_sent: false });
    return jsonOk(
      requestId,
      "Your request was saved, but we could not send the verification email. Please contact support.",
      { email_sent: false, warning: "EMAIL_FAILED" }
    );
  }

  log.info("beta_request_success");
  return jsonOk(requestId, "Check your email to activate your 7-day EngPulse beta access.");
}
