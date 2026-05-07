"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

export function CtaSection() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Strong visual background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              {t.cta.headline}
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-lg mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-blue-700 bg-white hover:bg-blue-50 rounded-2xl transition-all shadow-xl shadow-blue-900/30 hover:-translate-y-0.5"
              >
                {t.cta.primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/beta"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white border border-white/30 hover:border-white/50 hover:bg-white/10 rounded-2xl transition-all hover:-translate-y-0.5"
              >
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
