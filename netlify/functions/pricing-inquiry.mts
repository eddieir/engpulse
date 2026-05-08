import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createLogger, makeRequestId } from "./_shared/logger";
import { validateDatabaseEnv, validatePricingEmailEnv } from "./_shared/env";

const FN = "pricing-inquiry";

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

async function sendConfirmationEmail(
  to: string,
  name: string,
  plan: string
): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const result = await resend.emails.send({
    from,
    to,
    subject: "We received your EngPulse pricing request",
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:40px 20px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:#2563eb;padding:32px 40px;text-align:center">
      <span style="color:#fff;font-weight:700;font-size:18px">⚡ EngPulse</span>
    </div>
    <div style="padding:40px">
      <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 12px">Thanks, ${name}!</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 16px">We've received your inquiry for the <strong>${plan}</strong> plan.</p>
      <p style="color:#475569;line-height:1.6;margin:0 0 28px">Our pricing team will contact you shortly.</p>
      <p style="color:#475569;font-size:14px;margin:0">
        In the meantime, <a href="${siteUrl}/demo" style="color:#2563eb">explore the demo</a>.
      </p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse</p>
    </div>
  </div>
</body>
</html>`,
  });

  if (result.error) throw new Error(`Resend error: ${result.error.message}`);
}

async function sendInternalNotification(inquiry: {
  full_name: string;
  email: string;
  company: string;
  role: string;
  selected_plan: string;
  team_size?: string;
  repo_count?: string;
  current_reporting_tool?: string;
  message?: string;
}): Promise<void> {
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";
  const to = process.env.PRICING_TEAM_EMAIL || process.env.EMAIL_FROM || "noreply@engpulse.io";

  const resend = new Resend(process.env.RESEND_API_KEY!);
  await resend.emails.send({
    from,
    to,
    subject: `New EngPulse pricing inquiry — ${inquiry.selected_plan}`,
    html: `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;padding:24px;color:#334155">
  <h2>New Pricing Inquiry — ${inquiry.selected_plan}</h2>
  <table style="border-collapse:collapse;width:100%;max-width:560px">
    <tr><td style="padding:8px 0;font-weight:600;width:160px">Name</td><td>${inquiry.full_name}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Email</td><td><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Company</td><td>${inquiry.company}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Role</td><td>${inquiry.role}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Plan</td><td><strong>${inquiry.selected_plan}</strong></td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Team size</td><td>${inquiry.team_size || "—"}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Repo count</td><td>${inquiry.repo_count || "—"}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600">Current tool</td><td>${inquiry.current_reporting_tool || "—"}</td></tr>
    <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Message</td><td>${inquiry.message || "—"}</td></tr>
  </table>
</body>
</html>`,
  });
}

// ── handler ───────────────────────────────────────────────────────────────────

export default async function handler(request: Request): Promise<Response> {
  const requestId = makeRequestId();
  const log = createLogger(FN, requestId);

  // 1. start
  log.info("pricing_request_start", { method: request.method });

  // 2. method check
  if (request.method !== "POST") {
    log.warn("request_method_rejected", { method: request.method });
    return jsonFail(requestId, 405, "METHOD_NOT_ALLOWED", "Method not allowed.");
  }
  log.info("request_method_checked");

  // 3–4. body parse
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
    selected_plan,
    team_size,
    repo_count,
    current_reporting_tool,
    message,
    preferred_language,
  } = body;

  // 5–7. validation
  log.info("validation_start");
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!selected_plan) missingFields.selected_plan = "Please select a plan.";

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

  // 8–10. env check
  log.info("env_check_start");
  const dbEnv = validateDatabaseEnv();
  const emailEnv = validatePricingEmailEnv();

  if (!dbEnv.ok) {
    log.error("database_env_missing", { missing: dbEnv.missing });
    return jsonFail(
      requestId,
      503,
      "CONFIG_ERROR",
      "Pricing requests are temporarily unavailable. Please contact us."
    );
  }
  if (!emailEnv.ok) {
    log.warn("email_env_missing_continue_without_email", { missing: emailEnv.missing });
  }
  log.info("env_check_success", { db: true, email: emailEnv.ok });

  // 11–12. Supabase client
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
      "Pricing requests are temporarily unavailable. Please contact us."
    );
  }

  // 13–15. pricing_inquiries insert
  log.info("pricing_insert_start");
  const { data: inquiry, error: insertError } = await supabase
    .from("pricing_inquiries")
    .insert({
      full_name: String(full_name).trim(),
      email: emailStr,
      company: String(company).trim(),
      role: String(role),
      selected_plan: String(selected_plan),
      team_size: team_size ? String(team_size) : null,
      repo_count: repo_count ? String(repo_count) : null,
      current_reporting_tool: current_reporting_tool ? String(current_reporting_tool) : null,
      message: message ? String(message).trim() : null,
      preferred_language: preferred_language ? String(preferred_language) : "en",
      status: "new",
    })
    .select("id")
    .single();

  if (insertError || !inquiry) {
    log.error("pricing_insert_failed", {
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
  log.info("pricing_insert_success", { id: inquiry.id });

  // 16–21. emails (non-blocking — DB is already saved)
  let emailsAttempted = false;
  let emailWarning: string | undefined;

  if (!emailEnv.ok) {
    log.warn("email_send_skipped_not_configured", { missing: emailEnv.missing });
    emailWarning = "EMAIL_NOT_CONFIGURED";
  } else {
    emailsAttempted = true;

    log.info("user_email_send_start");
    try {
      await sendConfirmationEmail(emailStr, String(full_name).trim(), String(selected_plan));
      log.info("user_email_send_success");
    } catch (e) {
      log.error("user_email_send_failed", {
        error: e instanceof Error ? e.message : String(e),
      });
    }

    log.info("internal_email_send_start");
    try {
      await sendInternalNotification({
        full_name: String(full_name).trim(),
        email: emailStr,
        company: String(company).trim(),
        role: String(role),
        selected_plan: String(selected_plan),
        team_size: team_size ? String(team_size) : undefined,
        repo_count: repo_count ? String(repo_count) : undefined,
        current_reporting_tool: current_reporting_tool
          ? String(current_reporting_tool)
          : undefined,
        message: message ? String(message) : undefined,
      });
      log.info("internal_email_send_success");
    } catch (e) {
      log.error("internal_email_send_failed", {
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  // 22–24. audit event (fire-and-forget)
  log.info("audit_event_start");
  void (async () => {
    const { error } = await supabase.from("audit_events").insert({
      event_type: "pricing_inquiry_submitted",
      entity_type: "pricing_inquiry",
      entity_id: inquiry.id,
      email: emailStr,
      metadata: { plan: selected_plan, emails_attempted: emailsAttempted, requestId },
    });
    if (error) log.warn("audit_event_failed", { error: error.message });
    else log.info("audit_event_success");
  })();

  if (emailWarning === "EMAIL_NOT_CONFIGURED") {
    log.warn("pricing_request_partial_success", { warning: emailWarning });
    return jsonOk(
      requestId,
      "Your pricing request was saved. Our team will contact you soon.",
      { warning: "EMAIL_NOT_CONFIGURED" }
    );
  }

  log.info("pricing_request_success");
  return jsonOk(
    requestId,
    "Your pricing request has been received. Our team will contact you within 24 hours."
  );
}
