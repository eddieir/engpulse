import type { Metadata } from "next";
import { PricingPageClient } from "./PricingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  title: "EngPulse Pricing — Engineering Leadership Reports for Growing Teams",
  description:
    "Free beta, Starter at €49/month for up to 10 repositories, Team at €149/month. Plain-English engineering reports for CTOs, founders, and engineering leaders.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "EngPulse Pricing — Engineering Leadership Reports for Growing Teams",
    description:
      "Simple transparent pricing for engineering intelligence. Free beta, Starter €49/month, Team €149/month.",
    url: `${SITE_URL}/pricing`,
  },
};

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens after the free beta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After your 7-day free beta access expires, you can request an extension or contact the pricing team to discuss a Starter or Team plan.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Starter plan different from Free Beta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Free Beta gives you 7-day demo access with 1 repository. The Starter plan at €49/month gives you up to 10 repositories, weekly automated reports, email delivery, and ongoing access.",
      },
    },
    {
      "@type": "Question",
      name: "Why do paid plans contact the pricing team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We're in early beta. Paid access is provisioned manually by our team to ensure every customer gets the right setup. Once billing automation is ready, plans will activate automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use private GitHub repositories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EngPulse supports private repositories with the appropriate read-only GitHub OAuth scopes. No code content is stored — only metadata and activity.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel or stop access?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can disconnect GitHub and remove your data at any time from the settings page. No long-term commitments during beta.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }}
      />
      <PricingPageClient />
    </>
  );
}
