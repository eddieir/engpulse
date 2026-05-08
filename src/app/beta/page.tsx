import type { Metadata } from "next";
import { BetaPageClient } from "./BetaPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  title: "Join EngPulse Beta — 7-Day Engineering Reporting Demo Access",
  description:
    "Request free 7-day access to EngPulse. Connect GitHub read-only and get a board-ready engineering report for your CEO or leadership team. No credit card required.",
  alternates: { canonical: `${SITE_URL}/beta` },
  openGraph: {
    title: "Join EngPulse Beta — 7-Day Free Engineering Dashboard Access",
    description:
      "Get 7-day free access to EngPulse. Connect GitHub and see your engineering story as a board-ready report. No credit card required.",
    url: `${SITE_URL}/beta`,
  },
};

export default function BetaPage() {
  return <BetaPageClient />;
}
