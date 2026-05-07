"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, XCircle, Lock, Eye, Unlink, ArrowRight } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

export function SecurityPageClient() {
  const { t } = useI18n();
  const s = t.security;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-16 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/20" />
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight"
            >
              {s.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              {s.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* What we never do — shown first to immediately address concerns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {s.sections.whatWeNever.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {s.sections.whatWeNever.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What we read — shown after trust is established */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {s.sections.whatWeRead.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {s.sections.whatWeRead.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* GitHub permissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {s.sections.permissions.title}
                </h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 ml-12">
                {s.sections.permissions.subtitle}
              </p>
              <div className="space-y-3">
                {s.sections.permissions.items.map((perm, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                    <p className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      {perm.scope}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {perm.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Privacy + Surveillance side by side on desktop */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7"
              >
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
                  {s.sections.privacy.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.sections.privacy.text}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-7"
              >
                <h2 className="text-base font-semibold text-white mb-3">
                  {s.sections.surveillance.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {s.sections.surveillance.text}
                </p>
                <blockquote className="border-l-2 border-blue-400 pl-4 italic text-sm text-slate-400">
                  &ldquo;{s.sections.surveillance.quote}&rdquo;
                </blockquote>
              </motion.div>
            </div>

            {/* Disconnect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                  <Unlink className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  {s.sections.disconnect.title}
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-12">
                {s.sections.disconnect.text}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {t.cta.headline}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-7">
              {t.cta.subtitle}
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-xl transition-all"
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
