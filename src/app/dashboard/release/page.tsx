"use client";

import Link from "next/link";
import { mockReleaseReadiness } from "@/lib/mock-data";
import { CheckCircle2, XCircle, AlertCircle, ArrowLeft, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersona } from "@/contexts/PersonaContext";

const STATUS_CONFIG = {
  go: {
    banner: "bg-emerald-600",
    badge: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    label: "GO — Ready to Release",
    sub: "All critical gates are passing. Engineering recommends proceeding.",
  },
  caution: {
    banner: "bg-amber-500",
    badge: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    label: "CAUTION — Review Before Releasing",
    sub: "Some gates need attention. Review recommended actions before proceeding.",
  },
  hold: {
    banner: "bg-red-600",
    badge: "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300",
    dot: "bg-red-500",
    label: "HOLD — Do Not Release",
    sub: "Critical gates are failing. Address blockers before scheduling the release.",
  },
};

const GATE_STATUS_ICON = {
  pass: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
  fail: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
  warn: <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
};

const REPO_STATUS = {
  ready: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  caution: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  blocked: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
  not_ready: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
};

export default function ReleasePage() {
  const rr = mockReleaseReadiness;
  const status = STATUS_CONFIG[rr.overallStatus as keyof typeof STATUS_CONFIG];
  const { persona } = usePersona();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back nav */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Overview
      </Link>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flag className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Release Readiness</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {rr.version} · Target: {rr.targetDate} · {rr.gatesPassing}/{rr.gatesTotal} gates passing
          </p>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold self-start", status.badge)}>
          <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
          {rr.overallStatus.toUpperCase()}
        </span>
      </div>

      {/* Status banner */}
      <div className={cn("rounded-2xl px-6 py-5 text-white", status.banner)}>
        <p className="font-bold text-lg">{status.label}</p>
        <p className="text-sm opacity-90 mt-1">{status.sub}</p>
        {persona === "leadership" && (
          <p className="text-xs opacity-75 mt-3 border-t border-white/20 pt-3">
            Leadership view: {rr.gatesPassing} of {rr.gatesTotal} release gates are green. Engineering is reviewing the remaining {rr.gatesTotal - rr.gatesPassing} gates before committing to {rr.targetDate}.
          </p>
        )}
      </div>

      {/* Release gates */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Release gates</h2>
        <div className="space-y-3">
          {rr.gates.map((gate) => (
            <div
              key={gate.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border",
                gate.status === "pass"
                  ? "bg-slate-50 dark:bg-slate-700/20 border-slate-100 dark:border-slate-700"
                  : gate.status === "fail"
                  ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/40"
                  : "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40"
              )}
            >
              {GATE_STATUS_ICON[gate.status as keyof typeof GATE_STATUS_ICON]}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{gate.name}</p>
                {gate.detail && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{gate.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-repo readiness */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Repository readiness</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {rr.repoReadiness.map((repo) => (
            <div
              key={repo.repo}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{repo.repo}</p>
                <p className="text-xs text-slate-400 mt-0.5">Coverage: {repo.coverage}% · CI: {repo.ciRate}%</p>
                {(repo.openBugs > 0 || repo.stuckPRs > 0) && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                    {repo.openBugs > 0 ? `${repo.openBugs} bug${repo.openBugs !== 1 ? "s" : ""}` : ""}
                    {repo.openBugs > 0 && repo.stuckPRs > 0 ? " · " : ""}
                    {repo.stuckPRs > 0 ? `${repo.stuckPRs} stuck PR${repo.stuckPRs !== 1 ? "s" : ""}` : ""}
                  </p>
                )}
              </div>
              <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ml-3", REPO_STATUS[repo.status as keyof typeof REPO_STATUS])}>
                {repo.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended actions */}
      {rr.actions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Recommended actions</h2>
          <div className="space-y-3">
            {rr.actions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/20 border border-slate-100 dark:border-slate-700">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white mt-0.5",
                  action.priority === "critical" ? "bg-red-500" : action.priority === "high" ? "bg-amber-500" : "bg-slate-400"
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{action.action}</p>
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded font-medium",
                      action.priority === "critical"
                        ? "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                        : action.priority === "high"
                        ? "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    )}>
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{action.repo}</p>
                  {action.owner && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">Owner: {action.owner}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
