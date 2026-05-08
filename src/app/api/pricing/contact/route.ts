import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendPricingConfirmationEmail, sendPricingInternalNotification } from "@/lib/emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    if (!full_name || !email || !company || !role || !selected_plan) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = createServerClient();

    // Save pricing inquiry
    const { data: inquiry, error: insertError } = await supabase
      .from("pricing_inquiries")
      .insert({
        full_name: full_name.trim(),
        email: emailLower,
        company: company.trim(),
        role,
        selected_plan,
        team_size: team_size || null,
        repo_count: repo_count || null,
        current_reporting_tool: current_reporting_tool || null,
        message: message?.trim() || null,
        preferred_language: preferred_language || "en",
        status: "new",
      })
      .select("id")
      .single();

    if (insertError || !inquiry) {
      console.error("pricing_inquiries insert error:", insertError);
      return Response.json({ error: "Server error. Please try again." }, { status: 500 });
    }

    // Send emails
    try {
      await sendPricingConfirmationEmail({
        to: emailLower,
        name: full_name.trim(),
        plan: selected_plan,
      });
    } catch (e) {
      console.error("pricing confirmation email error:", e);
    }

    try {
      await sendPricingInternalNotification({
        inquiry: {
          full_name: full_name.trim(),
          email: emailLower,
          company: company.trim(),
          role,
          selected_plan,
          team_size,
          repo_count,
          current_reporting_tool,
          message,
        },
      });
    } catch (e) {
      console.error("pricing internal notification error:", e);
    }

    // Audit event
    await supabase.from("audit_events").insert({
      event_type: "pricing_inquiry_submitted",
      entity_type: "pricing_inquiry",
      entity_id: inquiry.id,
      email: emailLower,
      metadata: { plan: selected_plan },
    });

    return Response.json({ success: true, message: "Pricing inquiry received." });
  } catch (err) {
    console.error("pricing contact error:", err);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
