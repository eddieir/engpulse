import type { Metadata } from "next";
import { PricingContactClient } from "./PricingContactClient";

export const metadata: Metadata = {
  title: "Contact Pricing Team — EngPulse",
  description: "Talk to the EngPulse pricing team about Starter, Team, or custom plans for your engineering organization.",
  robots: { index: true, follow: true },
};

export default async function PricingContactPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return <PricingContactClient defaultPlan={plan} />;
}
