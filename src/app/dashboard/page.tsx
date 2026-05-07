"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "@/lib/mock-data";
import { ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"ceo" | "engineering">("ceo");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Week of April 29 – May 5, 2025
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
              CEO View
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
              Engineering View
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
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
                {viewMode === "ceo" ? "CEO Summary" : "Engineering Summary"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <HealthBadge status={mockWeeklyReport.healthStatus} />
            <span className="text-xs text-slate-400 dark:text-slate-500">Updated 2h ago</span>
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
              { label: "Deployments", value: "12" },
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
              <h3 className="font-semibold text-slate-900 dark:text-white">Board-ready answers</h3>
              <Link href="/dashboard/report" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Full report <ArrowRight className="w-3 h-3" />
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
            <h2 className="font-semibold text-slate-900 dark:text-white">Active blockers</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Issues requiring leadership attention</p>
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

      {/* Trend Chart */}
      <TrendChart />
    </div>
  );
}
