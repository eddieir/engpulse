import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendPricingConfirmationEmail, sendPricingInternalNotification } from "@/lib/emails";

function ok(message: string) {
  return Response.json({ ok: true, message });
}

function fail(
  status: number,
  error: string,
  message: string,
  fields?: Record<string, string>
) {
  return Response.json({ ok: false, error, message, ...(fields ? { fields } : {}) }, { status });
}

export async function POST(request: NextRequest) {
  console.log("[pricing/contact] POST received");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "BAD_REQUEST", "Invalid request body.");
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

  // Field-level validation
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!selected_plan) missingFields.selected_plan = "Please select a plan.";

  if (Object.keys(missingFields).length > 0) {
    console.log("[pricing/contact] Validation failed:", Object.keys(missingFields));
    return fail(400, "VALIDATION_ERROR", "Please complete all required fields.", missingFields);
  }

  const emailStr = String(email).trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailStr)) {
    return fail(400, "VALIDATION_ERROR", "Please enter a valid email address.", {
      email: "Invalid email address.",
    });
  }

  let supabase: ReturnType<typeof createServerClient>;
  try {
    supabase = createServerClient();
  } catch (e) {
    console.error("[pricing/contact] Supabase init failed:", e instanceof Error ? e.message : e);
    return fail(
      503,
      "SERVICE_UNAVAILABLE",
      "We could not process your request right now. Please try again later or contact us."
    );
  }

  // Save pricing inquiry
  console.log("[pricing/contact] Inserting pricing_inquiry for:", emailStr);
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
    console.error("[pricing/contact] pricing_inquiries insert error:", insertError?.message);
    return fail(500, "SERVER_ERROR", "We could not save your request. Please try again.");
  }

  // Send confirmation email to user (non-blocking)
  console.log("[pricing/contact] Sending confirmation email to:", emailStr);
  try {
    await sendPricingConfirmationEmail({
      to: emailStr,
      name: String(full_name).trim(),
      plan: String(selected_plan),
    });
  } catch (e) {
    console.error("[pricing/contact] Confirmation email error:", e instanceof Error ? e.message : e);
  }

  // Send internal notification (non-blocking)
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
  } catch (e) {
    console.error("[pricing/contact] Internal notification error:", e instanceof Error ? e.message : e);
  }

  // Audit event
  await supabase.from("audit_events").insert({
    event_type: "pricing_inquiry_submitted",
    entity_type: "pricing_inquiry",
    entity_id: inquiry.id,
    email: emailStr,
    metadata: { plan: selected_plan },
  });

  console.log("[pricing/contact] Success for:", emailStr);
  return ok("Your pricing request has been received. Our team will contact you within 24 hours.");
}
