import { BlockerCard } from "@/components/dashboard/BlockerCard";
import { mockBlockers } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export default function BlockersPage() {
  const high = mockBlockers.filter((b) => b.severity === "high");
  const medium = mockBlockers.filter((b) => b.severity === "medium");
  const low = mockBlockers.filter((b) => b.severity === "low");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Active Blockers</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Issues that need leadership attention to unblock delivery
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "High priority", count: high.length, color: "text-red-600 dark:text-red-400" },
          { label: "Medium priority", count: medium.length, color: "text-amber-600 dark:text-amber-400" },
          { label: "Low priority", count: low.length, color: "text-blue-600 dark:text-blue-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Leadership context */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Leadership context</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">
              These blockers were identified from GitHub activity. High-priority items may be delaying delivery commitments and should be addressed this week. Consider asking your engineering lead about resolution plans.
            </p>
          </div>
        </div>
      </div>

      {/* Grouped blockers */}
      {high.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-3">High Priority</h2>
          <div className="space-y-3">
            {high.map((blocker) => <BlockerCard key={blocker.id} blocker={blocker} />)}
          </div>
        </section>
      )}
      {medium.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-3">Medium Priority</h2>
          <div className="space-y-3">
            {medium.map((blocker) => <BlockerCard key={blocker.id} blocker={blocker} />)}
          </div>
        </section>
      )}
      {low.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">Low Priority</h2>
          <div className="space-y-3">
            {low.map((blocker) => <BlockerCard key={blocker.id} blocker={blocker} />)}
          </div>
        </section>
      )}
    </div>
  );
}
