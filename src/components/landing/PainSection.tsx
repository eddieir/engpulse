"use client";

import { motion } from "framer-motion";
import {
  GitFork as Github,
  Clock,
  AlertTriangle,
  FileText,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

const icons = [Github, Clock, AlertTriangle, FileText, BarChart3, MessageSquare];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function PainSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {t.pain.headline}
            <br />
            <span className="text-slate-400 dark:text-slate-500">{t.pain.headlineAccent}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.pain.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {t.pain.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={item}
                className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800/60 hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {card.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-7 text-center"
        >
          <p className="text-white text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {t.pain.detail}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
