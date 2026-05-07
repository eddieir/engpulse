"use client";

import { useState } from "react";
import { GitBranch as Github, CheckCircle2 } from "lucide-react";
import { mockWorkspace } from "@/lib/mock-data";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-5">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 items-start py-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0 first:pt-0">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Configure your workspace and report preferences</p>
      </div>

      {/* Workspace */}
      <SectionCard title="Workspace">
        <Field label="Company name" description="Your organization name">
          <input className={inputCls} defaultValue="Acme Cloud" />
        </Field>
        <Field label="Team name" description="Your engineering team name">
          <input className={inputCls} defaultValue="Engineering Leadership" />
        </Field>
        <Field label="Timezone">
          <select className={inputCls}>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>America/Los_Angeles</option>
            <option>Europe/London</option>
            <option>Europe/Paris</option>
            <option>Asia/Tokyo</option>
          </select>
        </Field>
      </SectionCard>

      {/* Report settings */}
      <SectionCard title="Report settings">
        <Field label="Report frequency" description="How often to generate a leadership report">
          <select className={inputCls}>
            <option>Weekly</option>
            <option>Bi-weekly</option>
            <option>Monthly</option>
          </select>
        </Field>
        <Field label="Report day" description="Which day to send the weekly report">
          <select className={inputCls} defaultValue="Monday">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Report recipients" description="Email addresses to receive the report">
          <textarea
            className={inputCls}
            rows={3}
            defaultValue={mockWorkspace.reportRecipients.join("\n")}
          />
        </Field>
        <Field label="Report tone" description="Language style for the generated report">
          <select className={inputCls}>
            <option value="executive">Executive summary</option>
            <option value="founder">Founder-friendly</option>
            <option value="technical">Technical leadership</option>
            <option value="board_ready">Board-ready</option>
          </select>
        </Field>
      </SectionCard>

      {/* Integrations */}
      <SectionCard title="Integrations">
        <div className="space-y-3">
          {mockWorkspace.connectedIntegrations.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0 first:pt-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${integration.status === "connected" ? "bg-slate-900 dark:bg-slate-100" : "bg-slate-100 dark:bg-slate-700"}`}>
                  {integration.provider === "github" ? (
                    <Github className={`w-4 h-4 ${integration.status === "connected" ? "text-white dark:text-slate-900" : "text-slate-400"}`} />
                  ) : (
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{integration.name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{integration.name}</p>
                  {integration.connectedAt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">Connected {integration.connectedAt}</p>
                  )}
                </div>
              </div>
              {integration.status === "connected" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Billing */}
      <SectionCard title="Plan & Billing">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Starter Plan</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">€49/month · Renews June 5, 2026</p>
            <ul className="mt-3 space-y-1.5">
              {["Up to 10 repositories", "Weekly automated reports", "Email delivery", "Shareable leadership link"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Upgrade to Team
          </button>
        </div>
      </SectionCard>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${saved ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {saved ? "Saved!" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
