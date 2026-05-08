import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Access Required — EngPulse",
  robots: { index: false, follow: false },
};

export default function VerifyRequiredPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">🔒</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Access required</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          This page requires a verified EngPulse account. Join the free beta to get 7-day access.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/beta"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
          >
            Join free beta →
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            View public demo
          </Link>
        </div>
      </div>
    </div>
  );
}
