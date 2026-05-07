"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PricingSection } from "@/components/landing/PricingSection";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-white text-sm pr-4">{q}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-500 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function PricingPageClient() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative py-16 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
              Public Beta
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              {t.pricing.headline}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Pricing cards — header suppressed since page has its own hero */}
        <PricingSection showHeader={false} />

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              {t.pricing.faq.headline}
            </h2>
            <div className="space-y-3">
              {t.pricing.faq.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Not sure which plan is right?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-7">
              Try the demo first. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md"
              >
                {t.nav.viewDemo}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/beta"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-xl transition-all"
              >
                {t.nav.joinBeta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
