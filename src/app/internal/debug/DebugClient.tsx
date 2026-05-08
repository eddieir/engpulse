"use client";

import { useState } from "react";

const BETA_SAMPLE = {
  full_name: "Debug User",
  email: "debug@example.com",
  company: "DebugCo",
  role: "CTO",
  team_size: "1–5",
  current_reporting_method: "Slack updates",
  biggest_reporting_pain: "Takes too long",
  would_send_to_ceo: true,
  preferred_language: "en",
  selected_plan: "Free Beta",
};

const PRICING_SAMPLE = {
  full_name: "Debug User",
  email: "debug@example.com",
  company: "DebugCo",
  role: "Founder / CEO",
  selected_plan: "Starter — €49/month",
  team_size: "1–5",
  repo_count: "3",
  current_reporting_tool: "Notion",
  message: "Debug test",
};

type PanelResult = {
  status: number;
  body: unknown;
  durationMs: number;
};

function JsonBlock({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2);
  const ok =
    typeof value === "object" &&
    value !== null &&
    (value as Record<string, unknown>).ok === true;
  return (
    <pre
      className={`mt-2 text-xs rounded-xl p-4 overflow-auto max-h-96 font-mono whitespace-pre-wrap ${
        ok
          ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
          : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100"
      }`}
    >
      {text}
    </pre>
  );
}

function Panel({
  title,
  onRun,
  result,
  loading,
}: {
  title: string;
  onRun: () => void;
  result: PanelResult | null;
  loading: boolean;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <button
          onClick={onRun}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? "Running…" : "Run"}
        </button>
      </div>
      {result && (
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>
              HTTP{" "}
              <strong
                className={
                  result.status < 300
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {result.status}
              </strong>
            </span>
            <span>{result.durationMs}ms</span>
            {typeof result.body === "object" &&
              result.body !== null &&
              typeof (result.body as Record<string, unknown>).requestId === "string" && (
                <span className="font-mono text-blue-600 dark:text-blue-400">
                  {(result.body as Record<string, unknown>).requestId as string}
                </span>
              )}
          </div>
          <JsonBlock value={result.body} />
        </div>
      )}
    </div>
  );
}

export function DebugClient() {
  const [debugKey, setDebugKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [keyError, setKeyError] = useState("");

  const [healthResult, setHealthResult] = useState<PanelResult | null>(null);
  const [betaResult, setBetaResult] = useState<PanelResult | null>(null);
  const [pricingResult, setPricingResult] = useState<PanelResult | null>(null);

  const [healthLoading, setHealthLoading] = useState(false);
  const [betaLoading, setBetaLoading] = useState(false);
  const [pricingLoading, setPricingLoading] = useState(false);

  const functionsBase =
    process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE || "/.netlify/functions";

  async function verifyKey() {
    if (!debugKey.trim()) {
      setKeyError("Enter the ADMIN_DEBUG_KEY from your Netlify environment.");
      return;
    }
    // Verify by calling health-check — 401 means wrong key
    setKeyError("");
    const t0 = Date.now();
    try {
      const res = await fetch(`${functionsBase}/health-check`, {
        headers: { "x-debug-key": debugKey },
      });
      const body = await res.json();
      if (res.status === 401) {
        setKeyError("Invalid debug key. Check ADMIN_DEBUG_KEY in Netlify.");
        return;
      }
      setUnlocked(true);
      setHealthResult({ status: res.status, body, durationMs: Date.now() - t0 });
    } catch (e) {
      setKeyError(
        `Could not reach health-check endpoint: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }

  async function runHealthCheck() {
    setHealthLoading(true);
    const t0 = Date.now();
    try {
      const res = await fetch(`${functionsBase}/health-check`, {
        headers: { "x-debug-key": debugKey },
      });
      setHealthResult({ status: res.status, body: await res.json(), durationMs: Date.now() - t0 });
    } catch (e) {
      setHealthResult({
        status: 0,
        body: { error: e instanceof Error ? e.message : String(e) },
        durationMs: Date.now() - t0,
      });
    } finally {
      setHealthLoading(false);
    }
  }

  async function runBetaTest() {
    setBetaLoading(true);
    const t0 = Date.now();
    try {
      const res = await fetch(`${functionsBase}/beta-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(BETA_SAMPLE),
      });
      setBetaResult({ status: res.status, body: await res.json(), durationMs: Date.now() - t0 });
    } catch (e) {
      setBetaResult({
        status: 0,
        body: { error: e instanceof Error ? e.message : String(e) },
        durationMs: Date.now() - t0,
      });
    } finally {
      setBetaLoading(false);
    }
  }

  async function runPricingTest() {
    setPricingLoading(true);
    const t0 = Date.now();
    try {
      const res = await fetch(`${functionsBase}/pricing-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PRICING_SAMPLE),
      });
      setPricingResult({
        status: res.status,
        body: await res.json(),
        durationMs: Date.now() - t0,
      });
    } catch (e) {
      setPricingResult({
        status: 0,
        body: { error: e instanceof Error ? e.message : String(e) },
        durationMs: Date.now() - t0,
      });
    } finally {
      setPricingLoading(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-700 p-7">
          <h1 className="text-lg font-bold text-white mb-1">EngPulse Debug Panel</h1>
          <p className="text-sm text-slate-400 mb-6">Internal use only. Enter ADMIN_DEBUG_KEY.</p>
          <input
            type="password"
            placeholder="ADMIN_DEBUG_KEY"
            value={debugKey}
            onChange={(e) => setDebugKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifyKey()}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-600 bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 mb-3"
          />
          {keyError && (
            <p className="text-xs text-red-400 mb-3">{keyError}</p>
          )}
          <button
            onClick={verifyKey}
            className="w-full py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">EngPulse Debug Panel</h1>
          <p className="text-sm text-slate-400">
            Endpoint: <span className="font-mono text-blue-400">{functionsBase}</span>
          </p>
        </div>

        <Panel
          title="Health Check — GET /.netlify/functions/health-check"
          onRun={runHealthCheck}
          result={healthResult}
          loading={healthLoading}
        />

        <Panel
          title="Beta Request — POST /.netlify/functions/beta-request"
          onRun={runBetaTest}
          result={betaResult}
          loading={betaLoading}
        />

        <Panel
          title="Pricing Inquiry — POST /.netlify/functions/pricing-inquiry"
          onRun={runPricingTest}
          result={pricingResult}
          loading={pricingLoading}
        />

        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-5 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Sample payloads used for beta/pricing tests:</p>
          <pre className="overflow-auto">{JSON.stringify({ beta: BETA_SAMPLE, pricing: PRICING_SAMPLE }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
