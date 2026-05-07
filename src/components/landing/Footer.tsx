import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span>EngPulse</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Engineering clarity for non-technical leaders. Turn GitHub activity into plain-English leadership insight.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { href: "/demo", label: "Demo" },
                { href: "#how-it-works", label: "How it works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/launch-kit", label: "Launch Kit" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Integrations</h4>
            <ul className="space-y-2">
              {["GitHub", "Slack", "Jira", "Linear", "Notion"].map((name) => (
                <li key={name}>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {name} {name !== "GitHub" && <span className="text-xs text-blue-500">Soon</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Company</h4>
            <ul className="space-y-2">
              {[
                { href: "#", label: "LinkedIn" },
                { href: "#", label: "Privacy" },
                { href: "#", label: "Terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2025 EngPulse. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built for engineering leaders who value clarity.</p>
        </div>
      </div>
    </footer>
  );
}
