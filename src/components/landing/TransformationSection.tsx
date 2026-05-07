"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitPullRequest, Bug, GitCommit, Clock, AlertCircle, Tag, CheckCircle2, TrendingDown, Eye, HelpCircle, FileText, BarChart3 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const rawIcons = [GitPullRequest, Bug, GitCommit, Clock, AlertCircle, Tag];
const insightIcons = [CheckCircle2, TrendingDown, Eye, HelpCircle, FileText, BarChart3];

export function TransformationSection() {
  const { t } = useI18n();

  return (
    <section id="product" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.transformation.headline}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t.transformation.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Raw signals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <GitCommit className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {t.transformation.rawTitle}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {t.transformation.rawItems.map((rawItem, i) => {
                const Icon = rawIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="flex items-center gap-3 p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{rawItem}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-2 py-4"
          >
            <div className="hidden lg:flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 text-center max-w-[80px] leading-tight">
                {t.transformation.arrowLabel}
              </span>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <div className="flex-1 h-px bg-blue-200 dark:bg-blue-800" />
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white rotate-90 lg:rotate-0" />
              </div>
              <div className="flex-1 h-px bg-blue-200 dark:bg-blue-800" />
            </div>
          </motion.div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
            className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800/60 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-blue-200 dark:border-blue-800/60 bg-blue-100/60 dark:bg-blue-950/40">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300" />
                </div>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {t.transformation.insightTitle}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {t.transformation.insightItems.map((insightItem, i) => {
                const Icon = insightIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="flex items-center gap-3 p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-blue-200/60 dark:border-blue-800/40"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{insightItem}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
