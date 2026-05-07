"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockRepositories } from "@/lib/mock-data";
import { HealthBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import {
  Zap,
  GitFork as Github,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Shield,
  GitBranch,
  Mail,
} from "lucide-react";

const TOTAL_STEPS = 5;

const roles = [
  { value: "founder_ceo", label: "Founder / CEO" },
  { value: "cto", label: "CTO" },
  { value: "vp_engineering", label: "VP Engineering" },
  { value: "engineering_manager", label: "Engineering Manager" },
  { value: "product_leader", label: "Product Leader" },
  { value: "other", label: "Other" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [githubStatus, setGithubStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [selectedRepos, setSelectedRepos] = useState<string[]>(["r1", "r2", "r3"]);
  const [reportDay, setReportDay] = useState("Monday");
  const [reportTone, setReportTone] = useState("executive");

  const connectGitHub = () => {
    setGithubStatus("connecting");
    setTimeout(() => setGithubStatus("connected"), 2000);
  };

  const toggleRepo = (id: string) => {
    setSelectedRepos((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const canAdvance = () => {
    if (step === 1) return role !== "";
    if (step === 2) return githubStatus === "connected";
    if (step === 3) return selectedRepos.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-slate-900 dark:text-white">EngPulse</span>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">Step {step} of {TOTAL_STEPS}</p>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">

          {/* Step 1: Role */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {"Let's create your first engineering leadership report."}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">What role best describes you?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={cn(
                      "p-4 rounded-xl border text-left font-medium text-sm transition-all",
                      role === r.value
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    )}
                  >
                    {role === r.value && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />}
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Connect GitHub */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Connect your GitHub</h1>
                <p className="text-slate-500 dark:text-slate-400">EngPulse reads your engineering activity to generate plain-English leadership reports.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                {githubStatus === "idle" && (
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                      <Github className="w-7 h-7 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">GitHub</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Connect your GitHub organization to get started</p>
                    <button
                      onClick={connectGitHub}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Connect GitHub
                    </button>
                  </div>
                )}
                {githubStatus === "connecting" && (
                  <div className="text-center py-4">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Connecting to GitHub...</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Requesting read-only access</p>
                  </div>
                )}
                {githubStatus === "connected" && (
                  <div className="text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">GitHub connected!</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Found 6 repositories in acme-cloud</p>
                  </div>
                )}
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  EngPulse only reads repository metadata, pull requests, issues, commits, and release activity. <strong className="text-slate-700 dark:text-slate-300">It never modifies your code.</strong>
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Select repos */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Select your repositories</h1>
                <p className="text-slate-500 dark:text-slate-400">Choose which repositories you want to monitor. You can change this later.</p>
              </div>
              <div className="space-y-2.5">
                {mockRepositories.map((repo) => {
                  const selected = selectedRepos.includes(repo.id);
                  return (
                    <button
                      key={repo.id}
                      onClick={() => toggleRepo(repo.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all",
                        selected
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-colors", selected ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600")}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <GitBranch className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                              <span className="font-mono font-semibold text-slate-900 dark:text-white text-sm">{repo.name}</span>
                              <span className="text-xs text-slate-400 dark:text-slate-500">{repo.language}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{repo.lastActivity} · {repo.openPRs} PRs · {repo.openBugs} bugs</p>
                          </div>
                        </div>
                        <HealthBadge status={repo.healthStatus} />
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">{selectedRepos.length} of {mockRepositories.length} repositories selected</p>
            </div>
          )}

          {/* Step 4: Report audience */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Who receives your report?</h1>
                <p className="text-slate-500 dark:text-slate-400">Set up your weekly leadership report delivery</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    <Mail className="w-3.5 h-3.5 inline mr-1" />
                    Email recipients
                  </label>
                  <textarea
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    rows={3}
                    placeholder="ceo@company.com&#10;board@company.com"
                    defaultValue="alex@acmecloud.com"
                  />
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">One email per line</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Report day</label>
                    <select
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      value={reportDay}
                      onChange={(e) => setReportDay(e.target.value)}
                    >
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Report tone</label>
                    <select
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      value={reportTone}
                      onChange={(e) => setReportTone(e.target.value)}
                    >
                      <option value="executive">Executive summary</option>
                      <option value="founder">Founder-friendly</option>
                      <option value="technical">Technical leadership</option>
                      <option value="board_ready">Board-ready</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: First report preview */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{"You're all set!"}</h1>
                <p className="text-slate-500 dark:text-slate-400">{"Here's a preview of your first leadership report"}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                  <p className="text-blue-200 text-xs font-semibold mb-1">WEEKLY ENGINEERING REPORT · PREVIEW</p>
                  <h2 className="text-lg font-bold">Acme Cloud · May 5, 2025</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Executive Summary</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Engineering is mostly healthy this week. The team shipped 12 meaningful updates, but review delays in api-service may slow next week. Leadership should focus on unblocking code review ownership.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Health Score</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">82</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Shipped updates</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                    Next report: {reportDay} at 9:00 AM
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                Open dashboard
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {step === 4 ? "Generate first report" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
