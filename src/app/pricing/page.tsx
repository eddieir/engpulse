import type { Metadata } from "next";
import { PricingPageClient } from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing — EngPulse",
  description:
    "Free during beta. Starter at €49/month for up to 10 repositories. Plain-English engineering reports for CTOs and founders.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
