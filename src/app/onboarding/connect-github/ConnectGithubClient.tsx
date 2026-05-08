"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Shield,
  GitBranch,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const mockRepos = [
  { name: "web-app", full_name: "acme/web-app", private: false },
  { name: "api-service", full_name: "acme/api-service", private: false },
  { name: "mobile-app", full_name: "acme/mobile-app", private: false },
  { name: "payment-service", full_name: "acme/payment-service", private: true },
];

const PERMISSIONS = [
  "Reads repository metadata — never modifies code",
  "Reads pull requests and issues",
  "Reads commits and releases",
  "Never accesses secrets or credentials",
  "Disconnect at any time from settings",
];

export function ConnectGithubClient({ error }: { error?: string }) {
  // If returning from real GitHub OAuth with success, skip straight to repo selection
  const [step, setStep] = useState<"connect" | "repos" | "done">(
    error === "connected" ? "repos" : "connect"
  );
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState<string[]>(["acme/web-app", "acme/api-service"]);
  const [saving, setSaving] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  async function handleConnect() {
    setConnecting(true);
    setConnectError(null);
    track("github_connect_clicked");

    try {
      // Check if real OAuth is configured before simulating
      const res = await fetch("/api/github/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "probe" }),
      });
      const data = await res.json();

      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      // Simulate a brief connecting animation, then move to repo selection
      setConnected(true);
      track("github_simulated");
      setTimeout(() => setStep("repos"), 800);
    } catch (e) {
      setConnectError(e instanceof Error ? e.message : "Connection failed. Please try again.");
    } finally {
      setConnecting(false);
    }
  }

  async function handleSaveRepos() {
    setSaving(true);
    const repos = selectedRepos.map((full_name) => ({
      name: full_name.split("/")[1],
      full_name,
    }));

    try {
      // Single DB write: create the connection record with repos together
      await fetch("/api/github/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "simulated", repos }),
      });
    } catch {
      // non-blocking — user still proceeds to dashboard
    } finally {
      setSaving(false);
      setStep("done");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">EngPulse</span>
          </Link>
          <Link href="/demo" className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            Skip to demo →
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {error && error !== "connected" && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {error === "oauth_not_configured"
                ? "GitHub OAuth is not fully configured yet. Using demo mode."
                : "GitHub connection failed. Using demo mode below."}
            </p>
          </div>
        )}
        {error === "connected" && (
          <div className="mb-6 flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              GitHub connected successfully. Now select your repositories.
            </p>
          </div>
        )}

        {step === "connect" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-7 h-7 text-slate-700 dark:text-slate-300" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Connect your GitHub</h1>
              <p className="text-slate-600 dark:text-slate-400">
                EngPulse uses read-only access to turn your GitHub activity into leadership reports.
              </p>
            </div>

            {/* Security promise */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Read-only by design</span>
              </div>
              <ul className="space-y-2">
                {PERMISSIONS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo mode notice */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl px-4 py-3 mb-6">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                <strong>Demo mode active</strong> — GitHub OAuth will be connected when live credentials are configured.
                The connection below is simulated for your beta access.
              </p>
            </div>

            {connectError && (
              <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                {connectError}
              </div>
            )}

            {!connected ? (
              <button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-base font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl transition-all disabled:opacity-60"
              >
                {connecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900 rounded-full animate-spin" />
                    Connecting…
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4" />
                    Connect GitHub (demo)
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Connected — selecting repositories…</span>
              </div>
            )}
          </motion.div>
        )}

        {step === "repos" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Select repositories</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Choose which repositories to include in your weekly engineering report. Free beta: 1 repository in live mode.
            </p>
            <div className="space-y-2 mb-6">
              {mockRepos.map((repo) => (
                <button
                  key={repo.full_name}
                  onClick={() =>
                    setSelectedRepos((prev) =>
                      prev.includes(repo.full_name)
                        ? prev.filter((r) => r !== repo.full_name)
                        : [...prev, repo.full_name]
                    )
                  }
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all",
                    selectedRepos.includes(repo.full_name)
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{repo.name}</span>
                    {repo.private && (
                      <span className="text-xs text-slate-400 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">
                        private
                      </span>
                    )}
                  </div>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all", selectedRepos.includes(repo.full_name) ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600")}>
                    {selectedRepos.includes(repo.full_name) && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleSaveRepos}
              disabled={saving || selectedRepos.length === 0}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Continue to dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">You&apos;re all set!</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              GitHub connected. Your 7-day demo access is active. Open the dashboard to explore your engineering report.
            </p>
            <Link
              href="/dashboard"
              onClick={() => track("dashboard_opened")}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-md shadow-blue-600/20"
            >
              Open dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
