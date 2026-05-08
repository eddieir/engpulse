// Analytics event tracking.
// Replace the stub implementation with your preferred provider
// (PostHog, Plausible, Segment, Mixpanel, etc.).

type AnalyticsEvent =
  | "page_view"
  | "demo_clicked"
  | "beta_started"
  | "beta_submitted"
  | "verification_email_sent"
  | "email_verified"
  | "github_connect_clicked"
  | "github_connected"
  | "github_simulated"
  | "pricing_plan_clicked"
  | "pricing_inquiry_submitted"
  | "dashboard_opened"
  | "access_expired";

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, properties);
  }
  // TODO: wire up your analytics provider here
  // Example: posthog.capture(event, properties)
}
