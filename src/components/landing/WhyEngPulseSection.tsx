"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EASE } from "@/lib/animation";

const columns = [
  {
    label: "QA & Test tools",
    sublabel: "e.g. test management, CI dashboards",
    accent: "text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
    bg: "bg-white dark:bg-slate-800",
    rows: [
      { text: "CI/CD pass rate", has: true },
      { text: "Test coverage %", has: true },
      { text: "Flaky test tracking", has: true },
      { text: "Delivery confidence score", has: false },
      { text: "Board-ready plain-English summary", has: false },
      { text: "Blocker escalation for leaders", has: false },
      { text: "CEO / board Q&A answers", has: false },
      { text: "Designed for QA engineers", has: true },
    ],
  },
  {
    label: "Dev productivity tools",
    sublabel: "e.g. DORA metrics, PR cycle time",
    accent: "text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
    bg: "bg-white dark:bg-slate-800",
    rows: [
      { text: "CI/CD pass rate", has: true },
      { text: "PR cycle time & DORA metrics", has: true },
      { text: "Individual developer tracking", has: true },
      { text: "Delivery confidence score", has: false },
      { text: "Board-ready plain-English summary", has: false },
      { text: "Blocker escalation for leaders", has: false },
      { text: "CEO / board Q&A answers", has: false },
      { text: "Designed for QA engineers", has: false },
    ],
  },
  {
    label: "EngPulse",
    sublabel: "Engineering intelligence for leaders",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-400 dark:border-blue-500",
    bg: "bg-white dark:bg-slate-800",
    highlight: true,
    rows: [
      { text: "CI/CD pass rate", has: true },
      { text: "PR flow & test coverage signals", has: true },
      { text: "Team-level delivery health (no individual tracking)", has: true },
      { text: "Delivery confidence score", has: true },
      { text: "Board-ready plain-English summary", has: true },
      { text: "Blocker escalation for leaders", has: true },
      { text: "CEO / board Q&A answers", has: true },
      { text: "Designed for QA engineers", has: false },
    ],
  },
];

export function WhyEngPulseSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
            Built for leaders, not tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Other tools answer engineer questions.
            <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400"> EngPulse answers CEO questions.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            QA tools and DORA dashboards are built for engineers. EngPulse is built for the CTO who has a board meeting on Monday.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((col, ci) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1, ease: EASE }}
              className={`rounded-2xl border-2 ${col.border} ${col.bg} overflow-hidden ${col.highlight ? "shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/20" : ""}`}
            >
              {/* Header */}
              <div className={`px-5 py-4 ${col.highlight ? "bg-blue-600" : "border-b border-slate-100 dark:border-slate-700"}`}>
                {col.highlight && (
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">
                    EngPulse
                  </span>
                )}
                <p className={`font-bold text-base ${col.highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {col.label}
                </p>
                <p className={`text-xs mt-0.5 ${col.highlight ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>
                  {col.sublabel}
                </p>
              </div>

              {/* Rows */}
              <div className="px-5 py-4 space-y-3">
                {col.rows.map((row) => (
                  <div key={row.text} className="flex items-start gap-2.5">
                    {row.has ? (
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${col.highlight ? "text-blue-500 dark:text-blue-400" : "text-emerald-500"}`} />
                    ) : (
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-300 dark:text-slate-600" />
                    )}
                    <span className={`text-sm leading-snug ${row.has ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600 line-through"}`}>
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8"
        >
          EngPulse does not track individual developers. It measures team-level delivery health and translates it into leadership language.
        </motion.p>
      </div>
    </section>
  );
}
