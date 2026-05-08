import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateSecureToken, hashToken } from "@/lib/crypto";
import { sendVerificationEmail } from "@/lib/emails";
import { randomUUID } from "crypto";

function makeRequestId() {
  return `req_${randomUUID().replace(/-/g, "").slice(0, 10)}`;
}

function log(
  level: "info" | "warn" | "error",
  requestId: string,
  event: string,
  data?: Record<string, unknown>
) {
  const entry = {
    level,
    requestId,
    fn: "api/beta/submit",
    event,
    ts: new Date().toISOString(),
    ...(data ?? {}),
  };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

function ok(requestId: string, message: string, extra?: Record<string, unknown>) {
  return Response.json({ ok: true, message, requestId, ...extra });
}

function fail(
  requestId: string,
  status: number,
  error: string,
  message: string,
  fields?: Record<string, string>
) {
  return Response.json(
    { ok: false, error, message, requestId, ...(fields ? { fields } : {}) },
    { status }
  );
}

export async function POST(request: NextRequest) {
  const requestId = makeRequestId();
  log("info", requestId, "beta_request_start", { method: request.method });

  let body: Record<string, unknown>;
  log("info", requestId, "body_parse_start");
  try {
    body = await request.json();
    log("info", requestId, "body_parse_success", { keys: Object.keys(body) });
  } catch {
    log("error", requestId, "body_parse_failed");
    return fail(requestId, 400, "BAD_REQUEST", "Invalid request body.");
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
  } = body as Record<string, unknown>;

  log("info", requestId, "validation_start");
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!team_size) missingFields.team_size = "Engineering team size is required.";

  if (Object.keys(missingFields).length > 0) {
    log("warn", requestId, "validation_failed", { missingFields: Object.keys(missingFields) });
    return fail(requestId, 400, "VALIDATION_ERROR", "Please complete all required fields.", missingFields);
  }

  const emailStr = String(email).trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailStr)) {
    log("warn", requestId, "validation_failed", { reason: "invalid_email" });
    return fail(requestId, 400, "VALIDATION_ERROR", "Please enter a valid email address.", {
      email: "Invalid email address.",
    });
  }
  log("info", requestId, "validation_success");

  log("info", requestId, "env_check_start");
  const missingEnv: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missingEnv.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missingEnv.push("SUPABASE_SERVICE_ROLE_KEY");
  if (missingEnv.length > 0) {
    log("error", requestId, "env_check_failed", { missing: missingEnv });
    return fail(requestId, 503, "CONFIG_ERROR", "Beta requests are temporarily unavailable. Please contact us.");
  }
  log("info", requestId, "env_check_success");

  log("info", requestId, "supabase_client_create_start");
  let supabase: ReturnType<typeof createServerClient>;
  try {
    supabase = createServerClient();
    log("info", requestId, "supabase_client_create_success");
  } catch (e) {
    log("error", requestId, "supabase_client_create_failed", {
      error: e instanceof Error ? e.message : String(e),
    });
    return fail(requestId, 503, "CONFIG_ERROR", "Beta requests are temporarily unavailable. Please contact us.");
  }

  log("info", requestId, "duplicate_check_start");
  const { data: existing, error: dupError } = await supabase
    .from("beta_requests")
    .select("id, status")
    .eq("email", emailStr)
    .in("status", ["pending_email_verification", "email_verified", "active"])
    .maybeSingle();

  if (dupError) {
    log("error", requestId, "duplicate_check_failed", { error: dupError.message, code: dupError.code });
    return fail(requestId, 500, "DATABASE_ERROR", "We could not verify your email. Please try again.");
  }
  log("info", requestId, "duplicate_check_success", { found: !!existing });

  if (existing) {
    log("info", requestId, "duplicate_found", { status: existing.status });
    if (existing.status === "active") {
      return fail(requestId, 409, "ALREADY_ACTIVE", "This email already has active beta access. Check your inbox or go to onboarding.");
    }
    return fail(requestId, 409, "DUPLICATE_BETA_REQUEST", "We already sent a verification email to this address. Check your inbox (and spam folder) or wait 24 hours.");
  }

  log("info", requestId, "beta_insert_start");
  const { data: betaRequest, error: insertError } = await supabase
    .from("beta_requests")
    .insert({
      full_name: String(full_name).trim(),
      email: emailStr,
      company: String(company).trim(),
      role: String(role),
      team_size: String(team_size),
      current_reporting_method: current_reporting_method ? String(current_reporting_method) : null,
      biggest_reporting_pain: biggest_reporting_pain ? String(biggest_reporting_pain) : null,
      would_send_to_ceo: Boolean(would_send_to_ceo),
      preferred_language: preferred_language ? String(preferred_language) : "en",
      selected_plan: selected_plan ? String(selected_plan) : "Free Beta",
      status: "pending_email_verification",
    })
    .select("id")
    .single();

  if (insertError || !betaRequest) {
    log("error", requestId, "beta_insert_failed", {
      error: insertError?.message,
      code: insertError?.code,
      details: insertError?.details,
    });
    return fail(requestId, 500, "DATABASE_ERROR", "We could not save your request. Please try again.");
  }
  log("info", requestId, "beta_insert_success", { id: betaRequest.id });

  log("info", requestId, "token_generate_start");
  const rawToken = generateSecureToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  log("info", requestId, "token_generate_success");

  log("info", requestId, "token_insert_start");
  const { error: tokenError } = await supabase.from("email_verification_tokens").insert({
    beta_request_id: betaRequest.id,
    email: emailStr,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (tokenError) {
    log("error", requestId, "token_insert_failed", { error: tokenError.message, code: tokenError.code });
    return fail(requestId, 500, "DATABASE_ERROR", "We could not generate your verification link. Please try again.");
  }
  log("info", requestId, "token_insert_success");

  log("info", requestId, "email_send_start");
  let emailSent = true;
  try {
    await sendVerificationEmail({ to: emailStr, name: String(full_name).trim(), token: rawToken });
    log("info", requestId, "email_send_success");
  } catch (emailError) {
    emailSent = false;
    log("error", requestId, "email_send_failed", {
      error: emailError instanceof Error ? emailError.message : String(emailError),
    });
  }

  log("info", requestId, "audit_event_start");
  void (async () => {
    const { error } = await supabase.from("audit_events").insert({
      event_type: "beta_form_submitted",
      entity_type: "beta_request",
      entity_id: betaRequest.id,
      email: emailStr,
      metadata: { plan: selected_plan, role, team_size, email_sent: emailSent, requestId },
    });
    if (error) log("warn", requestId, "audit_event_failed", { error: error.message });
    else log("info", requestId, "audit_event_success");
  })();

  if (!emailSent) {
    log("warn", requestId, "beta_request_partial_success", { email_sent: false });
    return ok(
      requestId,
      "Your request was saved, but we could not send the verification email. Please contact support.",
      { email_sent: false, warning: "EMAIL_FAILED" }
    );
  }

  log("info", requestId, "beta_request_success");
  return ok(requestId, "Check your email to activate your 7-day EngPulse beta access.");
}
