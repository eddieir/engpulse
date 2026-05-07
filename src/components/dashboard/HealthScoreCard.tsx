"use client";

import { cn, getScoreColor, getHealthBg, getHealthLabel, getScoreStatus } from "@/lib/utils";

interface HealthScoreCardProps {
  score: number;
  className?: string;
}

const breakdown = [
  { label: "Shipping momentum", value: 88, max: 100 },
  { label: "Review flow", value: 65, max: 100 },
  { label: "Bug pressure", value: 80, max: 100 },
  { label: "Blocked work", value: 75, max: 100 },
  { label: "Repository stability", value: 90, max: 100 },
];

export function HealthScoreCard({ score, className }: HealthScoreCardProps) {
  const status = getScoreStatus(score);
  const circumference = 2 * Math.PI * 52;
  const dashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6", className)}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Engineering Health Score</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Based on GitHub activity this week</p>
        </div>
        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", getHealthBg(status))}>
          {getHealthLabel(status)}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Score ring */}
        <div className="relative flex-shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="52" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-700" />
            <circle
              cx="64"
              cy="64"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              transform="rotate(-90 64 64)"
              className={cn(
                score >= 85 ? "text-emerald-500" :
                score >= 70 ? "text-amber-500" :
                score >= 50 ? "text-orange-500" : "text-red-500"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(score))}>{score}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">/100</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2.5">
          {breakdown.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.value}</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    item.value >= 85 ? "bg-emerald-500" :
                    item.value >= 70 ? "bg-amber-500" :
                    item.value >= 50 ? "bg-orange-500" : "bg-red-500"
                  )}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-700/30 rounded-lg px-3 py-2">
        This score combines shipping activity, PR review speed, bug pressure, and blocked work. Higher is better.
      </p>
    </div>
  );
}
