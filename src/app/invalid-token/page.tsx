import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invalid or Expired Link — EngPulse",
  robots: { index: false, follow: false },
};

export default async function InvalidTokenPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  const messages: Record<string, { title: string; body: string }> = {
    expired: {
      title: "This link has expired",
      body: "Verification links expire after 24 hours. Request a new one below.",
    },
    used: {
      title: "This link has already been used",
      body: "It looks like your email was already verified. Try requesting beta access again if you need a new session.",
    },
    default: {
      title: "This link is invalid",
      body: "We couldn't verify this link. It may have been copied incorrectly or already used.",
    },
  };

  const content = messages[reason as keyof typeof messages] ?? messages.default;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{content.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{content.body}</p>
        <Link
          href="/beta"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
        >
          Request new access →
        </Link>
      </div>
    </div>
  );
}
