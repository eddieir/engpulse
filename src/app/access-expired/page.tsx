import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Access Expired — EngPulse",
  robots: { index: false, follow: false },
};

export default function AccessExpiredPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">⏰</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Your 7-day access has expired
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          Your EngPulse beta access period has ended. To continue using the dashboard with your GitHub data, please contact our team or upgrade to a plan.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">What would you like to do?</h2>
          <div className="space-y-3">
            <Link
              href="/pricing/contact?plan=extension"
              className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Request extension</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Continue with your beta access</p>
              </div>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">View pricing plans</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Starter from €49/month</p>
              </div>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              href="/pricing/contact?plan=Starter"
              className="flex items-center justify-between px-4 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Contact pricing team</p>
                <p className="text-xs text-blue-200">We&apos;ll respond within 24 hours</p>
              </div>
              <span className="text-blue-200">→</span>
            </Link>
          </div>
        </div>

        <Link href="/demo" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
          View public demo →
        </Link>
      </div>
    </div>
  );
}
