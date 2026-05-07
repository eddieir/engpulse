import { RepositoryHealthTable } from "@/components/dashboard/RepositoryHealthTable";
import { HealthBadge } from "@/components/shared/StatusBadge";
import { mockRepositories } from "@/lib/mock-data";
import { GitBranch, AlertCircle, CheckCircle } from "lucide-react";

export default function RepositoriesPage() {
  const healthCounts = {
    healthy: mockRepositories.filter((r) => r.healthStatus === "healthy").length,
    watch: mockRepositories.filter((r) => r.healthStatus === "watch").length,
    at_risk: mockRepositories.filter((r) => r.healthStatus === "at_risk").length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Repositories</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Health status across all monitored repositories
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Healthy</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{healthCounts.healthy}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">repositories on track</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Watch</span>
          </div>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{healthCounts.watch}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">need monitoring</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">At Risk</span>
          </div>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{healthCounts.at_risk}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">need attention now</p>
        </div>
      </div>

      {/* At-risk callout */}
      {healthCounts.at_risk > 0 && (
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">Repositories need attention</p>
              <p className="text-sm text-orange-700 dark:text-orange-400 mt-0.5">
                {mockRepositories
                  .filter((r) => r.healthStatus === "at_risk")
                  .map((r) => r.name)
                  .join(", ")}{" "}
                {healthCounts.at_risk === 1 ? "is" : "are"} at risk this week. Review the status details below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full table */}
      <RepositoryHealthTable repositories={mockRepositories} />

      {/* Repo cards for context */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRepositories.map((repo) => (
          <div key={repo.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span className="font-mono font-semibold text-slate-900 dark:text-white text-sm">{repo.name}</span>
              </div>
              <HealthBadge status={repo.healthStatus} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{repo.plainEnglishStatus}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">{repo.shippedUpdates}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Shipped</p>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">{repo.openPRs}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">PRs</p>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">{repo.openBugs}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Bugs</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{repo.lastActivity} · {repo.language}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
