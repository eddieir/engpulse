"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GitBranch as Github,
  Shield,
  Zap,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";

const mockRepos = [
  { id: "r1", name: "web-app", private: false },
  { id: "r2", name: "api-service", private: false },
  { id: "r3", name: "mobile-app", private: false },
  { id: "r4", name: "payment-service", private: true },
  { id: "r5", name: "infrastructure", private: true },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const { t } = useI18n();
  const o = t.onboarding;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [role, setRole] = useState("");
  const [githubConnected, setGithubConnected] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState<string[]>(["r1", "r2"]);
  const [reportConfig, setReportConfig] = useState({
    email: "",
    day: "Monday",
    tone: "",
  });

  const totalSteps = o.steps.length;

  function goNext() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleRepo(id: string) {
    setSelectedRepos((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">EngPulse</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSelector compact />
            <ThemeToggle />
            <Link href="/demo" className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Skip to demo →
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            {o.steps.map((label: string, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
                    i < step
                      ? "bg-blue-600 border-blue-600 text-white"
                      : i === step
                        ? "border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-950/50"
                        : "border-slate-200 dark:border-slate-700 text-slate-400"
                  )}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn("text-xs hidden sm:block", i === step ? "text-blue-600 dark:text-blue-400 font-medium" : "text-slate-400")}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step === 0 && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{o.step1.headline}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-7">{o.step1.subtitle}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {o.step1.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => setRole(opt)}
                        className={cn(
                          "text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all",
                          role === opt
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={!role}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {o.next} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{o.step2.headline}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-7">{o.step2.subtitle}</p>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">GitHub</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {githubConnected ? "Connected ✓" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {!githubConnected ? (
                      <button
                        onClick={() => setGithubConnected(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        {o.step2.connectBtn}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Connected successfully</span>
                      </div>
                    )}
                    <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-center">{o.step2.simulated}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4 mb-7">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Permissions</span>
                    </div>
                    <ul className="space-y-1.5">
                      {o.step2.permissions.map((perm: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          {perm}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> {o.back}
                    </button>
                    <button
                      onClick={goNext}
                      disabled={!githubConnected}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {o.next} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{o.step3.headline}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-7">{o.step3.subtitle}</p>
                  <div className="space-y-2 mb-8">
                    {mockRepos.map((repo) => (
                      <button
                        key={repo.id}
                        onClick={() => toggleRepo(repo.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all",
                          selectedRepos.includes(repo.id)
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Github className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{repo.name}</span>
                          {repo.private && <span className="text-xs text-slate-400 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">private</span>}
                        </div>
                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all", selectedRepos.includes(repo.id) ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600")}>
                          {selectedRepos.includes(repo.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> {o.back}
                    </button>
                    <button
                      onClick={goNext}
                      disabled={selectedRepos.length === 0}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {o.next} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{o.step4.headline}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-7">{o.step4.subtitle}</p>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-7 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{o.step4.emailLabel}</label>
                      <input
                        type="email"
                        value={reportConfig.email}
                        onChange={(e) => setReportConfig((c) => ({ ...c, email: e.target.value }))}
                        placeholder="ceo@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{o.step4.dayLabel}</label>
                        <select
                          value={reportConfig.day}
                          onChange={(e) => setReportConfig((c) => ({ ...c, day: e.target.value }))}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
                        >
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{o.step4.toneLabel}</label>
                        <select
                          value={reportConfig.tone}
                          onChange={(e) => setReportConfig((c) => ({ ...c, tone: e.target.value }))}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
                        >
                          <option value="">Select tone…</option>
                          {o.step4.tones.map((tone: string) => (
                            <option key={tone} value={tone}>{tone}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> {o.back}
                    </button>
                    <button
                      onClick={goNext}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                    >
                      {o.next} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{o.step5.headline}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-7">{o.step5.subtitle}</p>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 mb-7">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Weekly Engineering Leadership Report</h3>
                      <span className="text-xs text-slate-400">Apr 28 – May 4, 2026</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3.5 border border-amber-200 dark:border-amber-800">
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">Health Score</p>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">76</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-300 dark:border-amber-700">Watch</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3.5">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">CEO Summary</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Engineering is mostly healthy this week. The team shipped 12 meaningful updates, but review delays in api-service may slow next week.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> {o.back}
                    </button>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                    >
                      {o.step5.openDashboard} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
