"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";

export function PricingSection({ showHeader = true }: { showHeader?: boolean }) {
  const { t } = useI18n();

  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t.pricing.headline}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {t.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className={cn(
                "relative rounded-2xl p-7 border transition-all",
                plan.highlight
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/25"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md hover:-translate-y-0.5"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold",
                    plan.highlight
                      ? "bg-white text-blue-600"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  )}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <h3
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-2",
                    plan.highlight ? "text-blue-200" : "text-slate-500 dark:text-slate-400"
                  )}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      plan.highlight ? "text-white" : "text-slate-900 dark:text-white"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlight ? "text-blue-200" : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {t.pricing.perMonth}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm",
                    plan.highlight ? "text-blue-100" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={cn(
                        "w-4 h-4 flex-shrink-0 mt-0.5",
                        plan.highlight ? "text-white/80" : "text-emerald-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        plan.highlight ? "text-white" : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/beta"
                className={cn(
                  "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                )}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl py-2.5 px-4 mb-4">
          {t.pricing.urgency}
        </p>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          {t.pricing.enterprise}{" "}
          <Link href="/beta" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            {t.pricing.contactUs}
          </Link>
        </p>
      </div>
    </section>
  );
}
