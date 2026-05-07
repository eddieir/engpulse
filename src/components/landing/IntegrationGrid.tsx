"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const logoMap: Record<string, string> = {
  GitHub: "GH",
  Slack: "SL",
  Jira: "JR",
  Linear: "LN",
  Notion: "NT",
  GitLab: "GL",
  Bitbucket: "BB",
  "Azure DevOps": "AZ",
};

const colorMap: Record<string, string> = {
  GitHub: "from-slate-700 to-slate-900 text-white",
  Slack: "from-purple-500 to-pink-600 text-white",
  Jira: "from-blue-500 to-blue-700 text-white",
  Linear: "from-violet-500 to-indigo-700 text-white",
  Notion: "from-slate-800 to-black text-white",
  GitLab: "from-orange-500 to-red-600 text-white",
  Bitbucket: "from-blue-600 to-blue-800 text-white",
  "Azure DevOps": "from-blue-400 to-indigo-600 text-white",
};

export function IntegrationGrid() {
  const { t } = useI18n();

  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.integrations.headline}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.integrations.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {t.integrations.items.map((integration) => (
            <motion.div
              key={integration.name}
              variants={cardAnim}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-2xl p-5 border transition-all",
                integration.status === "live"
                  ? "border-emerald-200 dark:border-emerald-800/60 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  : "border-slate-200 dark:border-slate-700 opacity-75 hover:opacity-100"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold",
                    colorMap[integration.name] ?? "from-slate-400 to-slate-600 text-white"
                  )}
                >
                  {logoMap[integration.name] ?? integration.name.slice(0, 2)}
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold border",
                    integration.status === "live"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : "bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600"
                  )}
                >
                  {integration.status === "live" ? t.integrations.live : t.integrations.soon}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                {integration.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
