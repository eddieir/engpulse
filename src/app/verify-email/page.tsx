import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifying Email — EngPulse",
  robots: { index: false, follow: false },
};

// Token verification is handled by GET /api/verify-email?token=...
// This page is only shown if the user navigates to /verify-email without a token.
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">✉️</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Check your email</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          We sent a verification link to your inbox. Click the link to activate your 7-day EngPulse demo access.
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          The link expires in 24 hours. If you didn&apos;t receive it, check your spam folder or{" "}
          <a href="/beta" className="text-blue-600 dark:text-blue-400 hover:underline">request a new link</a>.
        </p>
      </div>
    </div>
  );
}
