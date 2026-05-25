"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { BoardAnswerCard } from "@/components/dashboard/BoardAnswerCard";
import { BlockerCard } from "@/components/dashboard/BlockerCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { HealthBadge } from "@/components/shared/StatusBadge";
import {
  mockKpiCards,
  mockBoardAnswers,
  mockBlockers,
  mockWeeklyReport,
  mockKpiCardsQuality,
  mockQaBoardAnswers,
  mockTestCoverage,
  mockReleaseReadiness,
  mockCiCdMetrics,
} from "@/lib/mock-data";
import { ArrowRight, RefreshCw, CheckCircle2, XCircle, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/contexts/PersonaContext";

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"ceo" | "engineering">("ceo");
  const { t } = useI18n();
  const d = t.dashboard;
  const { persona } = usePersona();

  if (persona === "manager") {
    return <ManagerOverview />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Demo banner */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-sm">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
        <span className="font-medium">{d.demoBanner}</span>
        <Link href="/beta" className="ml-auto text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline whitespace-nowrap">
          {d.connectBtn} →
        </Link>
      </div>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{d.overview}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {d.weekOf} Apr 28 – May 4, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("ceo")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                viewMode === "ceo"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {d.ceoView}
            </button>
            <button
              onClick={() => setViewMode("engineering")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                viewMode === "engineering"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {d.engineeringView}
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            {d.refresh}
          </button>
        </div>
      </div>

      {/* CEO Summary Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {viewMode === "ceo" ? d.ceoSummary : d.engSummary}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <HealthBadge status={mockWeeklyReport.healthStatus} />
            <span className="text-xs text-slate-400 dark:text-slate-500">{d.updatedAgo}</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {mockWeeklyReport.summary}
        </p>
        {viewMode === "engineering" && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Merged PRs", value: "23" },
              { label: "Open Issues", value: "18" },
              { label: "Avg Review Time", value: "38h" },
              { label: d.weeklyReport, value: "12" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xs text-slate-400 dark:text-slate-500">{stat.label}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKpiCards.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>

      {/* Health Score + Board Answers */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <HealthScoreCard score={mockWeeklyReport.healthScore} />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">{d.boardAnswers}</h3>
              <Link href="/dashboard/report" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                {d.fullReport} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {mockBoardAnswers.slice(0, 4).map((answer) => (
                <BoardAnswerCard key={answer.id} answer={answer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Blockers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">{d.activeBlockers}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.blockersSubtitle}</p>
          </div>
          <Link href="/dashboard/blockers" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            {d.viewAll} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBlockers.map((blocker) => (
            <BlockerCard key={blocker.id} blocker={blocker} />
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <TrendChart />
    </div>
  );
}

function ManagerOverview() {
  const rr = mockReleaseReadiness;
  const statusColors = {
    go: "bg-emerald-500",
    caution: "bg-amber-500",
    hold: "bg-red-500",
  };
  const statusLabels = {
    go: "Go for release",
    caution: "Caution — review needed",
    hold: "Hold — blockers present",
  };
  const statusBg = {
    go: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    caution: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
    hold: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
  };
  const statusText = {
    go: "text-emerald-800 dark:text-emerald-300",
    caution: "text-amber-800 dark:text-amber-300",
    hold: "text-red-800 dark:text-red-300",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Engineering Manager Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Week of Apr 28 – May 4, 2026</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Release readiness mini-widget */}
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 rounded-2xl border ${statusBg[rr.overallStatus as keyof typeof statusBg]}`}>
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${statusColors[rr.overallStatus as keyof typeof statusColors]}`} />
          <div>
            <p className={`font-bold text-base ${statusText[rr.overallStatus as keyof typeof statusText]}`}>
              {statusLabels[rr.overallStatus as keyof typeof statusLabels]}
            </p>
            <p className={`text-xs mt-0.5 ${statusText[rr.overallStatus as keyof typeof statusText]} opacity-80`}>
              {rr.version} · target {rr.targetDate} · {rr.gatesPassing}/{rr.gatesTotal} gates passing
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/release"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline whitespace-nowrap"
        >
          <Flag className="w-3.5 h-3.5" />
          Full Release Report <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* QA KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKpiCardsQuality.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>

      {/* Test coverage + QA board answers */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Test coverage table */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Test coverage by repo</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Overall {mockTestCoverage.overall}%
                <span className="ml-1.5 text-emerald-600 dark:text-emerald-400">{mockTestCoverage.overallTrend}</span>
              </p>
            </div>
            <Link href="/dashboard/quality" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Full QA report <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockTestCoverage.byRepo.slice(0, 5).map((r) => (
              <div key={r.repo} className="flex items-center gap-3">
                <span className="text-sm text-slate-700 dark:text-slate-300 w-36 truncate flex-shrink-0">{r.repo}</span>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      r.healthStatus === "healthy" ? "bg-emerald-500" : r.healthStatus === "watch" ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${r.coverage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300 w-10 text-right">{r.coverage}%</span>
                <span className={`text-xs w-10 text-right ${r.trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>{r.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* QA board answers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quality signals this week</h3>
          <div className="space-y-3">
            {mockQaBoardAnswers.slice(0, 3).map((a) => (
              <BoardAnswerCard key={a.id} answer={a} />
            ))}
          </div>
        </div>
      </div>

      {/* CI/CD quick stats */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-slate-900 dark:text-white">CI/CD this week</h3>
          <Link href="/dashboard/quality" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View failures <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Pass rate", value: `${mockCiCdMetrics.passRate}%`, trend: mockCiCdMetrics.passRateTrend, positive: mockCiCdMetrics.passRateTrendPositive },
            { label: "Deployments", value: `${mockCiCdMetrics.deploymentFrequency}`, trend: mockCiCdMetrics.deploymentTrend, positive: mockCiCdMetrics.deploymentTrendPositive },
            { label: "Avg MTTR", value: `${mockCiCdMetrics.mttrMinutes}m`, trend: mockCiCdMetrics.mttrTrend, positive: mockCiCdMetrics.mttrTrendPositive },
            { label: "Flaky tests", value: `${mockCiCdMetrics.flakeRate}%`, trend: mockCiCdMetrics.flakeRateTrend, positive: mockCiCdMetrics.flakeRateTrendPositive },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className={`text-xs mt-0.5 font-medium ${s.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>{s.trend}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Blockers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Active Blockers</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Issues needing immediate attention</p>
          </div>
          <Link href="/dashboard/blockers" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBlockers.map((blocker) => (
            <BlockerCard key={blocker.id} blocker={blocker} />
          ))}
        </div>
      </div>
    </div>
  );
}
