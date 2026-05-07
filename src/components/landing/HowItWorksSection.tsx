"use client";

import { motion } from "framer-motion";
import { GitFork, GitBranch, FileText } from "lucide-react";

const Github = GitFork;
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

const stepIcons = [Github, GitBranch, FileText];

export function HowItWorksSection() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.howItWorks.headline}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="relative bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all group"
              >
                {/* Step number - large background */}
                <div className="text-6xl font-bold text-slate-100 dark:text-slate-700 mb-4 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Status badge */}
                <div className="mb-3">
                  {i < 2 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t.howItWorks.available}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {t.howItWorks.inBeta}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/70 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (between steps) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-slate-200 dark:bg-slate-700 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-slate-500 dark:text-slate-400"
        >
          {t.howItWorks.note}
        </motion.p>
      </div>
    </section>
  );
}
