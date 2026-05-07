"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiCard as KpiCardType } from "@/types";

interface KpiCardProps {
  card: KpiCardType;
}

export function KpiCard({ card }: KpiCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all group"
      >
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{card.label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{card.value}</p>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          card.trendPositive ? "text-emerald-600 dark:text-emerald-400" : card.trendDirection === "stable" ? "text-slate-500 dark:text-slate-400" : "text-red-600 dark:text-red-400"
        )}>
          {card.trendDirection === "up" && <TrendingUp className="w-3.5 h-3.5" />}
          {card.trendDirection === "down" && <TrendingDown className="w-3.5 h-3.5" />}
          {card.trendDirection === "stable" && <Minus className="w-3.5 h-3.5" />}
          {card.trend}
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.explanation}</p>
        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
      </button>

      {/* Detail modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">{card.label}</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                <p className={cn("text-sm font-medium mt-1", card.trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>{card.trend}</p>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">What this means</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{card.explanation}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Why it matters</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{card.whyItMatters}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">What changed</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{card.whatChanged}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-100 dark:border-blue-900">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">Leadership question to ask</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed italic">&ldquo;{card.leadershipQuestion}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
