"use client";

import { CopyButton } from "@/components/shared/CopyButton";
import { HealthBadge } from "@/components/shared/StatusBadge";
import { BoardAnswerCard } from "@/components/dashboard/BoardAnswerCard";
import { RepositoryHealthTable } from "@/components/dashboard/RepositoryHealthTable";
import { mockWeeklyReport } from "@/lib/mock-data";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Lightbulb,
  Share2,
  Download,
  Mail,
  Printer,
} from "lucide-react";

const shareUrl = "https://app.engpulse.io/r/acme-cloud-may-5-2026";

export default function ReportPage() {
  const report = mockWeeklyReport;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Weekly Leadership Report</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{report.dateRange} · Generated {report.generatedAt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={shareUrl} label="Copy share link" />
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            Send by email
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>

      {/* Report card — styled to look shareable */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden print:shadow-none">
        {/* Report header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Acme Cloud · Engineering Leadership</p>
              <h2 className="text-2xl font-bold mb-1">Weekly Engineering Report</h2>
              <p className="text-blue-200 text-sm">{report.dateRange}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs mb-1">Health Score</p>
              <p className="text-4xl font-bold">{report.healthScore}</p>
              <p className="text-blue-200 text-xs">/100</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Executive Summary */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-slate-900 dark:text-white">Executive Summary</h3>
              <HealthBadge status={report.healthStatus} />
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{report.summary}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-400">
              Delivery confidence: <strong className="text-slate-900 dark:text-white ml-1">{report.deliveryConfidence}%</strong>
            </div>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* What shipped */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">What shipped this week</h3>
            </div>
            <ul className="space-y-2">
              {report.shipped.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* What slowed down */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">What slowed the team down</h3>
            </div>
            <ul className="space-y-2">
              {report.slowedDown.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Current risks */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">Current risks</h3>
            </div>
            <ul className="space-y-2">
              {report.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  {risk}
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Board-ready questions */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">Leadership questions & answers</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {report.boardAnswers.map((answer) => (
                <BoardAnswerCard key={answer.id} answer={answer} />
              ))}
            </div>
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Repository health */}
          <section>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Repository health</h3>
            <RepositoryHealthTable repositories={report.repositoryHealth} />
          </section>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Recommended actions */}
          <section>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Recommended actions for this week</h3>
            <ol className="space-y-2">
              {report.recommendedActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {action}
                </li>
              ))}
            </ol>
          </section>

          {/* Footer */}
          <div className="border-t border-slate-100 dark:border-slate-700 pt-6 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Generated by <strong>EngPulse</strong> · Engineering clarity for non-technical leaders · engpulse.io
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
