import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  title: "EngPulse Demo — Weekly Engineering Leadership Dashboard",
  description:
    "Explore a live demo of EngPulse — the board-ready engineering dashboard for CTOs, founders, and engineering leaders. See health score, blockers, and CEO summary.",
  alternates: { canonical: `${SITE_URL}/demo` },
  openGraph: {
    title: "EngPulse Demo — Weekly Engineering Leadership Dashboard",
    description:
      "Live demo of the EngPulse engineering intelligence dashboard. Health score, blockers, board-ready answers, and weekly leadership report.",
    url: `${SITE_URL}/demo`,
  },
};
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { BoardAnswerCard } from "@/components/dashboard/BoardAnswerCard";
import { BlockerCard } from "@/components/dashboard/BlockerCard";
import { RepositoryHealthTable } from "@/components/dashboard/RepositoryHealthTable";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { HealthBadge } from "@/components/shared/StatusBadge";
import {
  mockKpiCards,
  mockBoardAnswers,
  mockBlockers,
  mockRepositories,
  mockWeeklyReport,
} from "@/lib/mock-data";
import { ArrowRight, Info } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Demo banner */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Live demo</strong> — This dashboard uses realistic mock data for Acme Cloud.
              <Link href="/beta" className="underline ml-1">Connect your GitHub</Link> to see real data.
            </p>
          </div>
          <Link
            href="/beta"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Join beta
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dashboard header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Acme Cloud · Week of Apr 28 – May 4, 2026</p>
          </div>
          <HealthBadge status={mockWeeklyReport.healthStatus} />
        </div>

        {/* CEO Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">CEO Summary</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{mockWeeklyReport.summary}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {mockKpiCards.map((card) => <KpiCard key={card.id} card={card} />)}
        </div>

        {/* Health + Board */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <HealthScoreCard score={mockWeeklyReport.healthScore} />
          </div>
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Board-ready answers</h3>
            <div className="space-y-3">
              {mockBoardAnswers.slice(0, 4).map((a) => <BoardAnswerCard key={a.id} answer={a} />)}
            </div>
          </div>
        </div>

        {/* Blockers */}
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Active blockers</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {mockBlockers.map((b) => <BlockerCard key={b.id} blocker={b} />)}
          </div>
        </div>

        {/* Trend chart */}
        <TrendChart />

        {/* Repository health */}
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Repository health</h2>
          <RepositoryHealthTable repositories={mockRepositories} />
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to see your real engineering data?</h2>
          <p className="text-blue-100 mb-6">Connect GitHub and get your first leadership report in minutes.</p>
          <Link
            href="/beta"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-colors"
          >
            Join beta
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
