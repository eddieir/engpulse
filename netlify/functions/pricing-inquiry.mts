import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// ── helpers ──────────────────────────────────────────────────────────────────

function jsonOk(message: string): Response {
  return Response.json({ ok: true, message });
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
    console.error("[pricing-inquiry] Missing env var: NEXT_PUBLIC_SUPABASE_URL");
    throw new Error("NEXT_PUBLIC_SUPABASE_URL not set");
  }
  if (!key) {
    console.error("[pricing-inquiry] Missing env var: SUPABASE_SERVICE_ROLE_KEY");
    throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  }
  console.log("[pricing-inquiry] Supabase env vars: present");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function sendConfirmationEmail(to: string, name: string, plan: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[pricing-inquiry] Missing env var: RESEND_API_KEY");
    throw new Error("RESEND_API_KEY not set");
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";

  const resend = new Resend(key);
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
      <p style="color:#475569;line-height:1.6;margin:0 0 16px">
        We've received your inquiry for the <strong>${plan}</strong> plan.
      </p>
      <p style="color:#475569;line-height:1.6;margin:0 0 28px">
        A member of our pricing team will contact you shortly to discuss your team's needs.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:0 0 24px">
        <p style="color:#64748b;font-size:13px;margin:0 0 4px;font-weight:600">Selected plan</p>
        <p style="color:#0f172a;font-size:16px;font-weight:700;margin:0">${plan}</p>
      </div>
      <p style="color:#475569;font-size:14px;line-height:1.6;margin:0">
        While you wait, you're welcome to <a href="${siteUrl}/demo" style="color:#2563eb">explore the demo</a> or review our <a href="${siteUrl}/security" style="color:#2563eb">security page</a>.
      </p>
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
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  const from = process.env.EMAIL_FROM || "EngPulse <noreply@engpulse.io>";
  const to =
    process.env.PRICING_TEAM_EMAIL || process.env.EMAIL_FROM || "noreply@engpulse.io";

  const resend = new Resend(key);
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
  <p style="margin-top:24px;color:#64748b;font-size:13px">Log in to Supabase to view this record in the pricing_inquiries table.</p>
</body>
</html>`,
  });
}

// ── handler ───────────────────────────────────────────────────────────────────

export default async function handler(request: Request): Promise<Response> {
  console.log("[pricing-inquiry] POST received, method:", request.method);

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
    selected_plan,
    team_size,
    repo_count,
    current_reporting_tool,
    message,
    preferred_language,
  } = body;

  // Field-level validation
  const missingFields: Record<string, string> = {};
  if (!full_name) missingFields.full_name = "Full name is required.";
  if (!email) missingFields.email = "Work email is required.";
  if (!company) missingFields.company = "Company name is required.";
  if (!role) missingFields.role = "Role is required.";
  if (!selected_plan) missingFields.selected_plan = "Please select a plan.";

  if (Object.keys(missingFields).length > 0) {
    console.log("[pricing-inquiry] Validation failed:", Object.keys(missingFields));
    return jsonFail(400, "VALIDATION_ERROR", "Please complete all required fields.", missingFields);
  }

  const emailStr = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return jsonFail(400, "VALIDATION_ERROR", "Please enter a valid email address.", {
      email: "Invalid email address.",
    });
  }

  console.log("[pricing-inquiry] Validation passed for:", emailStr);

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

  // Insert pricing inquiry
  console.log("[pricing-inquiry] Inserting pricing_inquiry");
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
    console.error("[pricing-inquiry] pricing_inquiries insert error:", insertError?.message);
    return jsonFail(500, "DATABASE_ERROR", "We could not save your request. Please try again.");
  }

  console.log("[pricing-inquiry] pricing_inquiry inserted, id:", inquiry.id);

  // Send confirmation email to user — non-blocking
  console.log("[pricing-inquiry] Sending confirmation email");
  try {
    await sendConfirmationEmail(emailStr, String(full_name).trim(), String(selected_plan));
    console.log("[pricing-inquiry] Confirmation email sent");
  } catch (e) {
    console.error(
      "[pricing-inquiry] Confirmation email failed:",
      e instanceof Error ? e.message : e
    );
  }

  // Send internal notification — non-blocking
  console.log("[pricing-inquiry] Sending internal notification");
  try {
    await sendInternalNotification({
      full_name: String(full_name).trim(),
      email: emailStr,
      company: String(company).trim(),
      role: String(role),
      selected_plan: String(selected_plan),
      team_size: team_size ? String(team_size) : undefined,
      repo_count: repo_count ? String(repo_count) : undefined,
      current_reporting_tool: current_reporting_tool ? String(current_reporting_tool) : undefined,
      message: message ? String(message) : undefined,
    });
    console.log("[pricing-inquiry] Internal notification sent");
  } catch (e) {
    console.error(
      "[pricing-inquiry] Internal notification failed:",
      e instanceof Error ? e.message : e
    );
  }

  // Audit event — fire-and-forget
  supabase.from("audit_events").insert({
    event_type: "pricing_inquiry_submitted",
    entity_type: "pricing_inquiry",
    entity_id: inquiry.id,
    email: emailStr,
    metadata: { plan: selected_plan },
  });

  console.log("[pricing-inquiry] Done for:", emailStr);
  return jsonOk(
    "Your pricing request has been received. Our team will contact you within 24 hours."
  );
}
