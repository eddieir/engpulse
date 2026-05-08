import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateSecureToken, hashToken } from "@/lib/crypto";
import { sendVerificationEmail } from "@/lib/emails";

function ok(message: string, extra?: Record<string, unknown>) {
  return Response.json({ ok: true, message, ...extra });
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
  console.log("[beta/submit] POST received");

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
    team_size,
    current_reporting_method,
    biggest_reporting_pain,
    would_send_to_ceo,
    preferred_language,
    selected_plan,
  } = body as Record<string, unknown>;

  // Field-level validation
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!team_size) missingFields.team_size = "Engineering team size is required.";

  if (Object.keys(missingFields).length > 0) {
    console.log("[beta/submit] Validation failed:", Object.keys(missingFields));
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
    console.error("[beta/submit] Supabase init failed:", e instanceof Error ? e.message : e);
    return fail(
      503,
      "SERVICE_UNAVAILABLE",
      "We could not process your request right now. Please try again later or contact us."
    );
  }

  // Check for duplicate
  console.log("[beta/submit] Checking for duplicate:", emailStr);
  const { data: existing } = await supabase
    .from("beta_requests")
    .select("id, status")
    .eq("email", emailStr)
    .in("status", ["pending_email_verification", "email_verified", "active"])
    .single();

  if (existing) {
    if (existing.status === "active") {
      return fail(
        409,
        "ALREADY_ACTIVE",
        "This email already has active beta access. Check your inbox or go to onboarding."
      );
    }
    return fail(
      409,
      "DUPLICATE_BETA_REQUEST",
      "We already sent a verification email to this address. Check your inbox (and spam folder) or wait 24 hours."
    );
  }

  // Create beta request
  console.log("[beta/submit] Inserting beta_request for:", emailStr);
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
    console.error("[beta/submit] beta_requests insert error:", insertError?.message);
    return fail(500, "SERVER_ERROR", "We could not save your request. Please try again.");
  }

  // Generate and store verification token
  const rawToken = generateSecureToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  console.log("[beta/submit] Inserting verification token");
  const { error: tokenError } = await supabase.from("email_verification_tokens").insert({
    beta_request_id: betaRequest.id,
    email: emailStr,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (tokenError) {
    console.error("[beta/submit] token insert error:", tokenError.message);
    return fail(500, "SERVER_ERROR", "We could not generate your verification link. Please try again.");
  }

  // Send verification email (non-blocking on failure)
  console.log("[beta/submit] Sending verification email to:", emailStr);
  let emailSent = true;
  try {
    await sendVerificationEmail({
      to: emailStr,
      name: String(full_name).trim(),
      token: rawToken,
    });
  } catch (emailError) {
    emailSent = false;
    console.error("[beta/submit] Email send failed:", emailError instanceof Error ? emailError.message : emailError);
  }

  // Audit event
  await supabase.from("audit_events").insert({
    event_type: "beta_form_submitted",
    entity_type: "beta_request",
    entity_id: betaRequest.id,
    email: emailStr,
    metadata: { plan: selected_plan, role, team_size, email_sent: emailSent },
  });

  console.log("[beta/submit] Success for:", emailStr, "email_sent:", emailSent);

  if (!emailSent) {
    return ok(
      "Your request was saved, but we could not send the verification email. Please contact support.",
      { email_sent: false }
    );
  }

  return ok("Check your email to activate your 7-day EngPulse beta access.");
}
