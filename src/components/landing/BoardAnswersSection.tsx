"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function BoardAnswersSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.boardAnswers.headline}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.boardAnswers.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {t.boardAnswers.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-2xl p-5 border transition-all",
                "hover:shadow-md hover:-translate-y-0.5",
                card.status === "green"
                  ? "border-emerald-200/60 dark:border-emerald-800/40 hover:border-emerald-300 dark:hover:border-emerald-700"
                  : "border-amber-200/60 dark:border-amber-800/40 hover:border-amber-300 dark:hover:border-amber-700"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                    card.status === "green" ? "bg-emerald-500" : "bg-amber-500"
                  )}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 leading-snug">
                    {card.q}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            {t.boardAnswers.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
