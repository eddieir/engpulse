"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

export function SecurityPreviewSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              className="p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                  {t.securityPreview.sectionLabel}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t.securityPreview.headline}
              </h2>
              <p className="text-slate-400 mb-7 leading-relaxed">
                {t.securityPreview.subtitle}
              </p>

              <ul className="space-y-3 mb-8">
                {t.securityPreview.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
              >
                {t.securityPreview.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Visual panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              className="hidden lg:flex items-center justify-center p-10 border-l border-white/10"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-blue-400" />
                </div>
                <blockquote className="text-slate-300 text-base font-medium leading-relaxed italic max-w-[200px]">
                  &ldquo;{t.securityPreview.tagline}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
