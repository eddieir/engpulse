"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";

export function SocialProofSection() {
  const { t } = useI18n();
  const sp = t.socialProof;

  return (
    <section className="py-8 px-4 sm:px-6 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE }}
        className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
      >
        <span className="text-sm text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
          {sp.intro}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sp.roles.map((role) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {role}
            </span>
          ))}
        </div>
        <span className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-slate-700" />
        <span className="text-sm text-slate-500 dark:text-slate-400 italic whitespace-nowrap">
          {sp.tagline}
        </span>
      </motion.div>
    </section>
  );
}
