import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PainSection } from "@/components/landing/PainSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { BoardAnswersSection } from "@/components/landing/BoardAnswersSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { IntegrationGrid } from "@/components/landing/IntegrationGrid";
import { SecurityPreviewSection } from "@/components/landing/SecurityPreviewSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { HomepageFaqSection } from "@/components/landing/HomepageFaqSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { WhyEngPulseSection } from "@/components/landing/WhyEngPulseSection";
import { DualPersonaSection } from "@/components/landing/DualPersonaSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  title: "EngPulse — Board-Ready Engineering Reports from GitHub Activity",
  description:
    "EngPulse turns GitHub pull requests, issues, blockers, and shipping activity into plain-English weekly engineering reports for CTOs, founders, CEOs, and engineering leaders.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      it: `${SITE_URL}/it`,
      es: `${SITE_URL}/es`,
      zh: `${SITE_URL}/zh`,
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EngPulse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EngPulse is an engineering intelligence platform that turns GitHub pull requests, issues, blockers, and shipping activity into plain-English weekly leadership reports for CTOs, founders, CEOs, and VPs of Engineering.",
      },
    },
    {
      "@type": "Question",
      name: "Who is EngPulse for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EngPulse is designed for CTOs, VPs of Engineering, technical founders, and engineering managers who need to communicate engineering progress to non-technical leadership without manual weekly updates.",
      },
    },
    {
      "@type": "Question",
      name: "Does EngPulse modify code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. EngPulse uses read-only GitHub access. It cannot write, push, open pull requests, or modify anything in your repositories.",
      },
    },
    {
      "@type": "Question",
      name: "Is EngPulse a developer productivity tracker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. EngPulse measures team-level delivery flow, not individual developer performance. It is designed to help teams remove blockers, not rank or monitor engineers.",
      },
    },
    {
      "@type": "Question",
      name: "How does the 7-day beta access work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Submit the beta form, verify your email, and get 7 days of free access. Connect GitHub read-only and explore the leadership dashboard. No credit card required.",
      },
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <PainSection />
        <WhyEngPulseSection />
        <DualPersonaSection />
        <TransformationSection />
        <BoardAnswersSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <IntegrationGrid />
        <SecurityPreviewSection />
        <PricingSection />
        <HomepageFaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
