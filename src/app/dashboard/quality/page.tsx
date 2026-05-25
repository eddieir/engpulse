import { KpiCard } from "@/components/dashboard/KpiCard";
import { BoardAnswerCard } from "@/components/dashboard/BoardAnswerCard";
import { HealthBadge } from "@/components/shared/StatusBadge";
import {
  mockKpiCardsQuality,
  mockQaBoardAnswers,
  mockCiCdMetrics,
  mockTestCoverage,
} from "@/lib/mock-data";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

function CoverageBar({ coverage, healthStatus }: { coverage: number; healthStatus: string }) {
  const color =
    healthStatus === "healthy"
      ? "bg-emerald-500"
      : healthStatus === "watch"
      ? "bg-amber-500"
      : "bg-red-500";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${coverage}%` }} />
      </div>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-10 text-right tabular-nums">
        {coverage}%
      </span>
    </div>
  );
}

export default function QualityPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">QA & CI/CD Health</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Acme Cloud · Week of Apr 28 – May 4, 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKpiCardsQuality.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>

      {/* Test Coverage + Board Answers */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Test Coverage per repo */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Test coverage by repository</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Overall: <strong className="text-slate-700 dark:text-slate-200">{mockTestCoverage.overall}%</strong>
                <span className="ml-1.5 text-emerald-600 dark:text-emerald-400">{mockTestCoverage.overallTrend}</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {mockTestCoverage.byRepo.map((r) => (
              <div key={r.repo}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.repo}</span>
                    <HealthBadge status={r.healthStatus} />
                  </div>
                  <span className={`text-xs font-medium ${r.trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                    {r.trend}
                  </span>
                </div>
                <CoverageBar coverage={r.coverage} healthStatus={r.healthStatus} />
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> ≥75% Healthy</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> 60–74% Watch</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> &lt;60% At risk</span>
          </div>
        </div>

        {/* Board answers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Board-ready quality answers</h3>
          <div className="space-y-3">
            {mockQaBoardAnswers.slice(0, 3).map((a) => (
              <BoardAnswerCard key={a.id} answer={a} />
            ))}
          </div>
        </div>
      </div>

      {/* CI/CD Summary + Failed Builds */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CI/CD summary stats */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-5">CI/CD this week</h3>
          <div className="space-y-5">
            {[
              {
                label: "Pass rate",
                value: `${mockCiCdMetrics.passRate}%`,
                trend: mockCiCdMetrics.passRateTrend,
                positive: mockCiCdMetrics.passRateTrendPositive,
              },
              {
                label: "Deployment frequency",
                value: `${mockCiCdMetrics.deploymentFrequency} deploys`,
                trend: mockCiCdMetrics.deploymentTrend,
                positive: mockCiCdMetrics.deploymentTrendPositive,
              },
              {
                label: "Mean time to recovery",
                value: `${mockCiCdMetrics.mttrMinutes} min`,
                trend: mockCiCdMetrics.mttrTrend,
                positive: mockCiCdMetrics.mttrTrendPositive,
              },
              {
                label: "Flaky test rate",
                value: `${mockCiCdMetrics.flakeRate}%`,
                trend: mockCiCdMetrics.flakeRateTrend,
                positive: mockCiCdMetrics.flakeRateTrendPositive,
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className={`ml-2 text-xs ${stat.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Failed builds */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Build failures this week
            <span className="ml-2 text-xs font-normal text-slate-400">
              {mockCiCdMetrics.failedBuilds.length} total · all resolved
            </span>
          </h3>
          <div className="space-y-3">
            {mockCiCdMetrics.failedBuilds.map((build) => (
              <div
                key={build.id}
                className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700"
              >
                {build.status === "resolved" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{build.repo}</span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate max-w-[160px]">{build.branch}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{build.reason}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                    <span>{build.failedAt}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Recovered in {build.recoveredMinutes} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality risk board answer */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Quality risk this week
          </span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {mockQaBoardAnswers[3].answer}
        </p>
      </div>
    </div>
  );
}
