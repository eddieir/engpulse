"use client";

import { TrendChart } from "@/components/dashboard/TrendChart";
import { mockWeeklyMetrics } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function TrendsPage() {
  const latest = mockWeeklyMetrics[mockWeeklyMetrics.length - 1];
  const prev = mockWeeklyMetrics[mockWeeklyMetrics.length - 2];

  const trends = [
    {
      label: "Shipping",
      current: latest.shippedUpdates,
      previous: prev.shippedUpdates,
      unit: "updates",
      description: "Work completed and merged this week",
      positive: true,
    },
    {
      label: "Review bottlenecks",
      current: latest.reviewBottlenecks,
      previous: prev.reviewBottlenecks,
      unit: "stuck PRs",
      description: "Pull requests waiting more than 48 hours",
      positive: false,
    },
    {
      label: "Bug pressure",
      current: latest.openBugs,
      previous: prev.openBugs,
      unit: "open bugs",
      description: "Total open bug reports across all repositories",
      positive: false,
    },
    {
      label: "Active blockers",
      current: latest.blockers,
      previous: prev.blockers,
      unit: "blockers",
      description: "Issues requiring leadership action",
      positive: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Trends</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          4-week engineering activity overview
        </p>
      </div>

      {/* Trend summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trends.map((trend) => {
          const delta = trend.current - trend.previous;
          const improved = trend.positive ? delta > 0 : delta < 0;
          const worsened = trend.positive ? delta < 0 : delta > 0;

          return (
            <div key={trend.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{trend.label}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{trend.current}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{trend.unit}</p>
              <div className={`flex items-center gap-1 text-xs font-medium ${improved ? "text-emerald-600 dark:text-emerald-400" : worsened ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}>
                {delta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : delta < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                {delta > 0 ? "+" : ""}{delta} from last week
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{trend.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main chart */}
      <TrendChart />

      {/* Historical data table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">Weekly breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                {["Week", "Health Score", "Shipped", "Stuck PRs", "Open Bugs", "Blockers"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {mockWeeklyMetrics.map((metric, i) => (
                <tr key={metric.week} className={i === mockWeeklyMetrics.length - 1 ? "bg-blue-50/50 dark:bg-blue-950/10" : "hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors"}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                    {metric.week}
                    {i === mockWeeklyMetrics.length - 1 && <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">Current</span>}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">{metric.healthScore}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{metric.shippedUpdates}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{metric.stuckPRs}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{metric.openBugs}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{metric.blockers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
