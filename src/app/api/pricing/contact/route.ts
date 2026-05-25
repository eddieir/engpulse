import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendPricingConfirmationEmail, sendPricingInternalNotification } from "@/lib/emails";
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
    fn: "api/pricing/contact",
    event,
    ts: new Date().toISOString(),
    ...(data ?? {}),
  };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

function ok(requestId: string, message: string) {
  return Response.json({ ok: true, message, requestId });
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
  log("info", requestId, "pricing_request_start", { method: request.method });

  log("info", requestId, "body_parse_start");
  let body: Record<string, unknown>;
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
    selected_plan,
    team_size,
    repo_count,
    current_reporting_tool,
    message,
    preferred_language,
  } = body as Record<string, unknown>;

  log("info", requestId, "validation_start");
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!selected_plan) missingFields.selected_plan = "Please select a plan.";

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

  log("info", requestId, "supabase_client_create_start");
  const supabase = createServerClient();
  log("info", requestId, "supabase_client_create_success");

  log("info", requestId, "pricing_insert_start");
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
    log("error", requestId, "pricing_insert_failed", {
      error: insertError?.message,
      code: insertError?.code,
      details: insertError?.details,
    });
    return fail(requestId, 500, "DATABASE_ERROR", "We could not save your request. Please try again.");
  }
  log("info", requestId, "pricing_insert_success", { id: inquiry.id });

  log("info", requestId, "user_email_send_start");
  try {
    await sendPricingConfirmationEmail({
      to: emailStr,
      name: String(full_name).trim(),
      plan: String(selected_plan),
    });
    log("info", requestId, "user_email_send_success");
  } catch (e) {
    log("error", requestId, "user_email_send_failed", {
      error: e instanceof Error ? e.message : String(e),
    });
  }

  log("info", requestId, "internal_email_send_start");
  try {
    await sendPricingInternalNotification({
      inquiry: {
        full_name: String(full_name).trim(),
        email: emailStr,
        company: String(company).trim(),
        role: String(role),
        selected_plan: String(selected_plan),
        team_size: team_size ? String(team_size) : undefined,
        repo_count: repo_count ? String(repo_count) : undefined,
        current_reporting_tool: current_reporting_tool ? String(current_reporting_tool) : undefined,
        message: message ? String(message) : undefined,
      },
    });
    log("info", requestId, "internal_email_send_success");
  } catch (e) {
    log("error", requestId, "internal_email_send_failed", {
      error: e instanceof Error ? e.message : String(e),
    });
  }

  log("info", requestId, "audit_event_start");
  void (async () => {
    const { error } = await supabase.from("audit_events").insert({
      event_type: "pricing_inquiry_submitted",
      entity_type: "pricing_inquiry",
      entity_id: inquiry.id,
      email: emailStr,
      metadata: { plan: selected_plan, requestId },
    });
    if (error) log("warn", requestId, "audit_event_failed", { error: error.message });
    else log("info", requestId, "audit_event_success");
  })();

  log("info", requestId, "pricing_request_success");
  return ok(requestId, "Your pricing request has been received. Our team will contact you within 24 hours.");
}
