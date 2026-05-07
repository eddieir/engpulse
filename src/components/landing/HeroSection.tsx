"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const FLOAT_Y = [0, -6, 0] as number[];
const FLOAT_Y_SLOW = [0, -4, 0] as number[];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/30" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/8 dark:bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-400/8 dark:bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6"
        >
          {t.hero.headlinePre}
          <span className="text-blue-600 dark:text-blue-400">{t.hero.headlineAccent}</span>
          {t.hero.headlinePost}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-9 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
        >
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:-translate-y-0.5"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/beta"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl transition-all hover:-translate-y-0.5"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="flex flex-wrap items-center justify-center gap-5 mb-14 text-sm text-slate-500 dark:text-slate-500"
        >
          {[
            t.hero.trustBadges.readOnly,
            t.hero.trustBadges.noCard,
            t.hero.trustBadges.setup,
          ].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Floating insight card - top left */}
            <motion.div
              animate={{ y: FLOAT_Y }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -left-16 top-12 z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-slate-900/40 border border-slate-200 dark:border-slate-700 p-3.5 w-52"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Active Blocker</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Payment API PR waiting 3 days for review in api-service.
              </p>
              <div className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">→ Assign reviewer today</div>
            </motion.div>

            {/* Floating insight card - top right */}
            <motion.div
              animate={{ y: FLOAT_Y_SLOW }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="hidden lg:block absolute -right-12 top-6 z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-slate-900/40 border border-slate-200 dark:border-slate-700 p-3.5 w-48"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Shipping Speed</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">+18%</span>
                <span className="text-xs text-slate-500">vs last week</span>
              </div>
            </motion.div>

            {/* Main dashboard card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/15 dark:shadow-slate-900/60 border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <div className="flex-1 mx-4 px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg text-xs text-slate-400 dark:text-slate-500 text-left flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  app.engpulse.io/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 bg-slate-50/50 dark:bg-slate-900">
                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    {
                      label: t.hero.dashboardLabels.healthScore,
                      value: "76",
                      sub: t.hero.dashboardLabels.status,
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-950/30",
                      dot: "bg-amber-500",
                    },
                    {
                      label: t.hero.dashboardLabels.shipped,
                      value: "12",
                      sub: t.hero.dashboardLabels.shippedSub,
                      color: "text-blue-600 dark:text-blue-400",
                      bg: "bg-white dark:bg-slate-800",
                      dot: null,
                    },
                    {
                      label: t.hero.dashboardLabels.prsWaiting,
                      value: "7",
                      sub: t.hero.dashboardLabels.prsSub,
                      color: "text-orange-600 dark:text-orange-400",
                      bg: "bg-white dark:bg-slate-800",
                      dot: null,
                    },
                    {
                      label: t.hero.dashboardLabels.confidence,
                      value: "78%",
                      sub: t.hero.dashboardLabels.confidenceSub,
                      color: "text-slate-700 dark:text-slate-300",
                      bg: "bg-white dark:bg-slate-800",
                      dot: null,
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className={`${card.bg} rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 text-left`}
                    >
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                        {card.dot && <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />}
                        {card.label}
                      </p>
                      <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.sub}</p>
                    </div>
                  ))}
                </div>

                {/* CEO Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t.hero.dashboardLabels.ceoSummary}
                    </span>
                    <div className="ml-auto px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                      Watch
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t.hero.dashboardLabels.summaryText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 max-w-lg mx-auto"
        >
          {t.hero.trust}
        </motion.p>
      </div>
    </section>
  );
}
