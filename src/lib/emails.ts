import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "peyman.iravani@gmail.com";
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || "";

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

async function sendMail(options: { to: string; subject: string; html: string }) {
  const transport = getTransport();
  await transport.sendMail({
    from: `EngPulse <${GMAIL_USER}>`,
    ...options,
  });
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export async function sendVerificationEmail({
  to,
  name,
  token,
}: {
  to: string;
  name: string;
  token: string;
}) {
  const verifyUrl = `${SITE_URL}/verify-email?token=${token}`;

  return sendMail({
    to,
    subject: "Activate your EngPulse 7-day demo access",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:40px 20px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:#2563eb;padding:32px 40px;text-align:center">
      <div style="display:inline-flex;align-items:center;gap:8px">
        <div style="width:28px;height:28px;background:rgba(255,255,255,0.2);border-radius:8px;display:inline-flex;align-items:center;justify-content:center">
          <span style="color:#fff;font-size:14px;font-weight:bold">⚡</span>
        </div>
        <span style="color:#fff;font-weight:700;font-size:18px">EngPulse</span>
      </div>
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
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 8px">
        If you didn't request this, you can safely ignore this email.
      </p>
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0">
        Or copy this link: <a href="${verifyUrl}" style="color:#2563eb">${verifyUrl}</a>
      </p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse · Engineering clarity for non-technical leaders</p>
    </div>
  </div>
</body>
</html>`,
  });
}

export async function sendAccessActivatedEmail({
  to,
  name,
  expiresAt,
}: {
  to: string;
  name: string;
  expiresAt: Date;
}) {
  const expiryFormatted = expiresAt.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const connectUrl = `${SITE_URL}/onboarding/connect-github`;

  return sendMail({
    to,
    subject: "Your EngPulse demo access is active for 7 days",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:40px 20px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:#059669;padding:32px 40px;text-align:center">
      <div style="display:inline-flex;align-items:center;gap:8px">
        <span style="color:#fff;font-weight:700;font-size:18px">⚡ EngPulse</span>
      </div>
    </div>
    <div style="padding:40px">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:center">
        <span style="font-size:20px">✅</span>
        <p style="color:#15803d;font-weight:600;margin:8px 0 0;font-size:15px">Your access is now active!</p>
      </div>
      <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 12px">Welcome aboard, ${name}.</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 12px">
        Your 7-day EngPulse demo access is ready. You can explore the dashboard, connect GitHub (read-only), and see how your engineering story looks to leadership.
      </p>
      <p style="color:#475569;line-height:1.6;margin:0 0 28px">
        <strong>Access expires:</strong> ${expiryFormatted}
      </p>
      <div style="text-align:center;margin:0 0 28px">
        <a href="${connectUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 32px;border-radius:12px">
          Connect GitHub →
        </a>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;margin-bottom:20px">
        <p style="color:#1e40af;font-weight:600;font-size:13px;margin:0 0 8px">🔒 GitHub access is read-only</p>
        <ul style="color:#1e40af;font-size:13px;line-height:1.8;margin:0;padding:0 0 0 20px">
          <li>We never modify code</li>
          <li>We never access secrets or credentials</li>
          <li>You can disconnect anytime</li>
        </ul>
      </div>
      <p style="color:#94a3b8;font-size:13px">
        Questions? Reply to this email or visit <a href="${SITE_URL}/security" style="color:#2563eb">${SITE_URL}/security</a>
      </p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse · Engineering clarity for non-technical leaders</p>
    </div>
  </div>
</body>
</html>`,
  });
}

export async function sendPricingConfirmationEmail({
  to,
  name,
  plan,
}: {
  to: string;
  name: string;
  plan: string;
}) {
  return sendMail({
    to,
    subject: "We received your EngPulse pricing request",
    html: `
<!DOCTYPE html>
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
        A member of our pricing team will contact you shortly to discuss your team's needs and answer any questions.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:0 0 24px">
        <p style="color:#64748b;font-size:13px;margin:0 0 4px;font-weight:600">Selected plan</p>
        <p style="color:#0f172a;font-size:16px;font-weight:700;margin:0">${plan}</p>
      </div>
      <p style="color:#475569;font-size:14px;line-height:1.6;margin:0">
        While you wait, you're welcome to <a href="${SITE_URL}/demo" style="color:#2563eb">explore the demo</a> or review our <a href="${SITE_URL}/security" style="color:#2563eb">security page</a>.
      </p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center">
      <p style="color:#94a3b8;font-size:12px;margin:0">© 2026 EngPulse · Engineering clarity for non-technical leaders</p>
    </div>
  </div>
</body>
</html>`,
  });
}

export async function sendPricingInternalNotification({
  inquiry,
}: {
  inquiry: {
    full_name: string;
    email: string;
    company: string;
    role: string;
    selected_plan: string;
    team_size?: string;
    repo_count?: string;
    current_reporting_tool?: string;
    message?: string;
  };
}) {
  const internalTo = process.env.PRICING_TEAM_EMAIL || GMAIL_USER;

  return sendMail({
    to: internalTo,
    subject: `New EngPulse pricing inquiry — ${inquiry.selected_plan}`,
    html: `
<!DOCTYPE html>
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
