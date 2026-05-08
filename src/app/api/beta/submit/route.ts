import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { generateSecureToken, hashToken } from "@/lib/crypto";
import { sendVerificationEmail } from "@/lib/emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    // Basic validation
    if (!full_name || !email || !company || !role || !team_size) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = createServerClient();

    // Check for existing active/pending request
    const { data: existing } = await supabase
      .from("beta_requests")
      .select("id, status")
      .eq("email", emailLower)
      .in("status", ["pending_email_verification", "email_verified", "active"])
      .single();

    if (existing) {
      if (existing.status === "active") {
        return Response.json(
          { error: "This email already has active access. Check your inbox.", code: "already_active" },
          { status: 409 }
        );
      }
      return Response.json(
        { error: "A verification email was already sent. Check your inbox or wait 24 hours.", code: "already_pending" },
        { status: 409 }
      );
    }

    // Create beta request
    const { data: betaRequest, error: insertError } = await supabase
      .from("beta_requests")
      .insert({
        full_name: full_name.trim(),
        email: emailLower,
        company: company.trim(),
        role,
        team_size,
        current_reporting_method: current_reporting_method || null,
        biggest_reporting_pain: biggest_reporting_pain || null,
        would_send_to_ceo: would_send_to_ceo || false,
        preferred_language: preferred_language || "en",
        selected_plan: selected_plan || "Free Beta",
        status: "pending_email_verification",
      })
      .select("id")
      .single();

    if (insertError || !betaRequest) {
      console.error("beta_requests insert error:", insertError);
      return Response.json({ error: "Server error. Please try again." }, { status: 500 });
    }

    // Generate verification token
    const rawToken = generateSecureToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const { error: tokenError } = await supabase
      .from("email_verification_tokens")
      .insert({
        beta_request_id: betaRequest.id,
        email: emailLower,
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error("token insert error:", tokenError);
      return Response.json({ error: "Server error. Please try again." }, { status: 500 });
    }

    // Send verification email
    try {
      await sendVerificationEmail({
        to: emailLower,
        name: full_name.trim(),
        token: rawToken,
      });
    } catch (emailError) {
      console.error("Resend error:", emailError);
      // Don't fail the request if email fails — record is saved
    }

    // Audit event
    await supabase.from("audit_events").insert({
      event_type: "beta_form_submitted",
      entity_type: "beta_request",
      entity_id: betaRequest.id,
      email: emailLower,
      metadata: { plan: selected_plan, role, team_size },
    });

    return Response.json({ success: true, message: "Verification email sent." });
  } catch (err) {
    console.error("beta submit error:", err);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
