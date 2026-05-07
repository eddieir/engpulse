import { AlertTriangle, Clock, User } from "lucide-react";
import { SeverityBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import type { Blocker } from "@/types";

interface BlockerCardProps {
  blocker: Blocker;
}

export function BlockerCard({ blocker }: BlockerCardProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-xl border p-5 transition-colors",
      blocker.severity === "high" ? "border-red-200 dark:border-red-900" :
      blocker.severity === "medium" ? "border-amber-200 dark:border-amber-900" :
      "border-slate-200 dark:border-slate-700"
    )}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <AlertTriangle className={cn(
            "w-4 h-4 flex-shrink-0 mt-0.5",
            blocker.severity === "high" ? "text-red-500" :
            blocker.severity === "medium" ? "text-amber-500" : "text-blue-500"
          )} />
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{blocker.title}</h3>
        </div>
        <SeverityBadge severity={blocker.severity} />
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{blocker.repository}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blocker.ageDays} {blocker.ageDays === 1 ? "day" : "days"} old</span>
        {blocker.owner && <span className="flex items-center gap-1"><User className="w-3 h-3" />{blocker.owner}</span>}
      </div>
      <div className="space-y-2">
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-amber-800 dark:text-amber-300 mb-0.5">Impact</p>
          <p className="text-xs text-amber-700 dark:text-amber-400">{blocker.impact}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-0.5">Recommended action</p>
          <p className="text-xs text-blue-700 dark:text-blue-400">{blocker.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}
