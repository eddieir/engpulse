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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <PainSection />
        <TransformationSection />
        <BoardAnswersSection />
        <HowItWorksSection />
        <IntegrationGrid />
        <SecurityPreviewSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
