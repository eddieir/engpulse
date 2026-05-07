import { HealthBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import type { Repository } from "@/types";
import { Clock, GitPullRequest, Bug } from "lucide-react";

interface RepositoryHealthTableProps {
  repositories: Repository[];
}

export function RepositoryHealthTable({ repositories }: RepositoryHealthTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-5 py-3">Repository</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Health</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Shipped</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Open PRs</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Waiting &gt;48h</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Open Bugs</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Last Activity</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {repositories.map((repo) => (
              <tr key={repo.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">{repo.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{repo.language}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5"><HealthBadge status={repo.healthStatus} /></td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{repo.shippedUpdates}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">updates</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{repo.openPRs}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={cn("text-sm font-medium", repo.stuckPRs > 2 ? "text-red-600 dark:text-red-400" : repo.stuckPRs > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>
                    {repo.stuckPRs}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={cn("text-sm font-medium", repo.openBugs > 4 ? "text-red-600 dark:text-red-400" : repo.openBugs > 1 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>
                    {repo.openBugs}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{repo.lastActivity}</span>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-[200px]">{repo.plainEnglishStatus}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
        {repositories.map((repo) => (
          <div key={repo.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-mono font-semibold text-slate-900 dark:text-white text-sm">{repo.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{repo.language}</p>
              </div>
              <HealthBadge status={repo.healthStatus} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-2.5">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{repo.shippedUpdates}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Shipped</p>
              </div>
              <div className="text-center">
                <p className={cn("text-lg font-bold", repo.stuckPRs > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>{repo.stuckPRs}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Stuck PRs</p>
              </div>
              <div className="text-center">
                <p className={cn("text-lg font-bold", repo.openBugs > 3 ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-300")}>{repo.openBugs}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Bugs</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />{repo.lastActivity}
            </div>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">{repo.plainEnglishStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Keep these icons to prevent unused import warnings
const _unused = { GitPullRequest, Bug };
void _unused;
