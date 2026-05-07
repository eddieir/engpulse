"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" fill="white" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">EngPulse</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
              {f.tagline}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{f.betaBadge}</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              {f.product}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/demo", label: f.links.demo },
                { href: "/pricing", label: f.links.pricing },
                { href: "/security", label: f.links.security },
                { href: "/beta", label: f.links.beta },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              {f.integrations}
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "GitHub", live: true },
                { name: "Slack", live: false },
                { name: "Jira", live: false },
                { name: "Linear", live: false },
                { name: "Notion", live: false },
              ].map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{item.name}</span>
                  {item.live ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  ) : (
                    <span className="text-xs text-blue-500 dark:text-blue-400">{t.integrations.soon}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              {f.legal}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "#", label: f.links.privacy },
                { href: "#", label: f.links.terms },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">{f.copyright}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{f.built}</p>
        </div>
      </div>
    </footer>
  );
}
