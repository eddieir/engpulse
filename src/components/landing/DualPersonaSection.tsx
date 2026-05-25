"use client";

import { motion } from "framer-motion";
import { Crown, Users, Check } from "lucide-react";
import { EASE } from "@/lib/animation";

const personas = [
  {
    icon: Crown,
    audience: "CEOs, CTOs & VPs Engineering",
    tagline: "Board-ready answers in seconds",
    color: "bg-blue-600",
    ringColor: "ring-blue-400/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    badgeBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
    features: [
      "Plain-English engineering summary for board decks",
      "Delivery confidence score with trend",
      "Blocker escalation surface — no Slack digging",
      "Pre-answered CEO & board questions",
      "Team-level health, zero individual tracking",
    ],
  },
  {
    icon: Users,
    audience: "Engineering Managers & QA Leads",
    tagline: "One dashboard for ship/hold decisions",
    color: "bg-emerald-600",
    ringColor: "ring-emerald-400/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
    features: [
      "Release readiness gates — go, caution, or hold",
      "CI/CD pass rate, MTTR, and flake rate tracking",
      "Test coverage per repo with trend indicators",
      "Failed build history with recovery time",
      "Per-sprint quality signals for retrospectives",
    ],
  },
];

export function DualPersonaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
            One platform, two lenses
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Built for every engineering leader,
            <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400"> from CTO to QA Lead.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Switch between Leadership view and Manager view instantly. Same data, different lens — so everyone from the boardroom to the sprint retrospective gets exactly what they need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((p, i) => (
            <motion.div
              key={p.audience}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              className={`rounded-2xl border-2 ${p.borderColor} bg-white dark:bg-slate-900 overflow-hidden ring-1 ${p.ringColor} shadow-lg`}
            >
              {/* Header */}
              <div className={`px-6 py-5 ${p.color} flex items-start gap-4`}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">{p.audience}</p>
                  <p className="text-sm text-white/80 mt-0.5">{p.tagline}</p>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-5 space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              {/* Pill */}
              <div className="px-6 pb-5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${p.badgeBg}`}>
                  <p.icon className="w-3 h-3" />
                  {i === 0 ? "Leadership view" : "Manager view"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8"
        >
          Switch views with one click. No separate products, no extra seats, no data silos.
        </motion.p>
      </div>
    </section>
  );
}
