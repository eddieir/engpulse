import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomBytes, createHash } from "crypto";

// ── helpers ──────────────────────────────────────────────────────────────────

function jsonOk(message: string, extra?: Record<string, unknown>): Response {
  return Response.json({ ok: true, message, ...extra });
}

function jsonFail(
  status: number,
  error: string,
  message: string,
  fields?: Record<string, string>
): Response {
  return Response.json(
    { ok: false, error, message, ...(fields ? { fields } : {}) },
    { status }
  );
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) {
    console.error("[beta-request] Missing env var: NEXT_PUBLIC_SUPABASE_URL");
    throw new Error("NEXT_PUBLIC_SUPABASE_URL not set");
  }
  if (!key) {
    console.error("[beta-request] Missing env var: SUPABASE_SERVICE_ROLE_KEY");
    throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  }
  console.log("[beta-request] Supabase env vars: present");
  return createClient(url, key, { auth: { persistSession: false } });
}

function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function sendVerificationEmail(to: string, name: string, token: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[beta-request] Missing env var: RESEND_API_KEY");
    throw new Error("RESEND_API_KEY not set");
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";
  const verifyUrl = `${siteUrl}/verify-email?token=${token}`;

  const resend = new Resend(key);
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
        You requested 7-day demo access to <strong>EngPulse</strong> — the board-ready engineering reporting tool for CTOs, founders, and engineering leaders.
      </p>
      <p style="color:#475569;line-height:1.6;margin:0 0 32px">
        Click the button below to activate your account. This link expires in <strong>24 hours</strong>.
      </p>
      <div style="text-align:center;margin:0 0 32px">
        <a href="${verifyUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 32px;border-radius:12px">
          Activate demo access →
        </a>
      </div>
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 8px">If you didn't request this, you can safely ignore this email.</p>
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0">Or copy this link: <a href="${verifyUrl}" style="color:#2563eb">${verifyUrl}</a></p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse · Engineering clarity for non-technical leaders</p>
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
  console.log("[beta-request] POST received, method:", request.method);

  if (request.method !== "POST") {
    return jsonFail(405, "METHOD_NOT_ALLOWED", "Method not allowed.");
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonFail(400, "BAD_REQUEST", "Invalid JSON body.");
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

  // Field-level validation
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!team_size) missingFields.team_size = "Engineering team size is required.";

  if (Object.keys(missingFields).length > 0) {
    console.log("[beta-request] Validation failed:", Object.keys(missingFields));
    return jsonFail(400, "VALIDATION_ERROR", "Please complete all required fields.", missingFields);
  }

  const emailStr = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return jsonFail(400, "VALIDATION_ERROR", "Please enter a valid email address.", {
      email: "Invalid email address.",
    });
  }

  console.log("[beta-request] Validation passed for:", emailStr);

  // Init Supabase
  let supabase: ReturnType<typeof getSupabase>;
  try {
    supabase = getSupabase();
  } catch {
    return jsonFail(
      503,
      "SERVICE_UNAVAILABLE",
      "We could not process your request right now. Please try again later or contact us."
    );
  }

  // Check for duplicate
  console.log("[beta-request] Checking for duplicate email");
  const { data: existing } = await supabase
    .from("beta_requests")
    .select("id, status")
    .eq("email", emailStr)
    .in("status", ["pending_email_verification", "email_verified", "active"])
    .maybeSingle();

  if (existing) {
    if (existing.status === "active") {
      return jsonFail(
        409,
        "ALREADY_ACTIVE",
        "This email already has active beta access. Check your inbox or go to onboarding."
      );
    }
    return jsonFail(
      409,
      "DUPLICATE_BETA_REQUEST",
      "We already sent a verification email to this address. Check your inbox (and spam folder) or wait 24 hours."
    );
  }

  // Insert beta request
  console.log("[beta-request] Inserting beta_request");
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
    console.error("[beta-request] beta_requests insert error:", insertError?.message);
    return jsonFail(500, "DATABASE_ERROR", "We could not save your request. Please try again.");
  }

  console.log("[beta-request] beta_request inserted, id:", betaRequest.id);

  // Generate and store verification token
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  console.log("[beta-request] Inserting verification token");
  const { error: tokenError } = await supabase
    .from("email_verification_tokens")
    .insert({
      beta_request_id: betaRequest.id,
      email: emailStr,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    });

  if (tokenError) {
    console.error("[beta-request] token insert error:", tokenError.message);
    return jsonFail(
      500,
      "DATABASE_ERROR",
      "We could not generate your verification link. Please try again."
    );
  }

  // Send verification email — non-blocking on failure
  console.log("[beta-request] Sending verification email");
  let emailSent = true;
  try {
    await sendVerificationEmail(emailStr, String(full_name).trim(), rawToken);
    console.log("[beta-request] Email sent successfully");
  } catch (emailErr) {
    emailSent = false;
    console.error(
      "[beta-request] Email send failed:",
      emailErr instanceof Error ? emailErr.message : emailErr
    );
  }

  // Audit event (fire-and-forget, don't block success response)
  supabase.from("audit_events").insert({
    event_type: "beta_form_submitted",
    entity_type: "beta_request",
    entity_id: betaRequest.id,
    email: emailStr,
    metadata: { plan: selected_plan, role, team_size, email_sent: emailSent },
  });

  console.log("[beta-request] Done for:", emailStr, "| email_sent:", emailSent);

  if (!emailSent) {
    return jsonOk(
      "Your request was saved, but we could not send the verification email. Please contact support.",
      { email_sent: false, warning: "EMAIL_FAILED" }
    );
  }

  return jsonOk("Check your email to activate your 7-day EngPulse beta access.");
}
