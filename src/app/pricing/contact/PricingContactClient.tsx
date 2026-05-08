"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/animation";

const PLANS = ["Starter — €49/month", "Team — €149/month", "Custom / Enterprise", "Beta extension"];

const ROLES = [
  "Founder / CEO",
  "CTO",
  "VP Engineering",
  "Engineering Manager",
  "Product Leader",
  "Other",
];

const TEAM_SIZES = ["1–5", "6–15", "16–30", "31–50", "50+"];

type FormState = {
  full_name: string;
  email: string;
  company: string;
  role: string;
  selected_plan: string;
  team_size: string;
  repo_count: string;
  current_reporting_tool: string;
  message: string;
};

export function PricingContactClient({ defaultPlan }: { defaultPlan?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const matchedPlan = PLANS.find((p) =>
    p.toLowerCase().startsWith((defaultPlan || "").toLowerCase())
  );

  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    company: "",
    role: "",
    selected_plan: matchedPlan || PLANS[0],
    team_size: "",
    repo_count: "",
    current_reporting_tool: "",
    message: "",
  });

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      track("pricing_inquiry_submitted", { plan: form.selected_plan });
      const res = await fetch("/api/pricing/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Talk to our pricing team
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Tell us about your team and we&apos;ll find the right plan for you. We respond within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7 shadow-sm"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request received!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Our pricing team will contact you within 24 hours to discuss the{" "}
                  <strong>{form.selected_plan}</strong> plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                  >
                    Explore demo <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField label="Full name" value={form.full_name} onChange={(v) => set("full_name", v)} required />
                  <InputField label="Work email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                </div>
                <InputField label="Company" value={form.company} onChange={(v) => set("company", v)} required />

                <SelectField
                  label="Your role"
                  value={form.role}
                  onChange={(v) => set("role", v)}
                  options={ROLES}
                  required
                />

                <SelectField
                  label="Interested plan"
                  value={form.selected_plan}
                  onChange={(v) => set("selected_plan", v)}
                  options={PLANS}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <SelectField
                    label="Engineering team size"
                    value={form.team_size}
                    onChange={(v) => set("team_size", v)}
                    options={TEAM_SIZES}
                  />
                  <InputField
                    label="Number of repositories"
                    placeholder="e.g. 5"
                    value={form.repo_count}
                    onChange={(v) => set("repo_count", v)}
                  />
                </div>

                <InputField
                  label="Current reporting tool"
                  placeholder="e.g. Notion, spreadsheets, manual updates"
                  value={form.current_reporting_tool}
                  onChange={(v) => set("current_reporting_tool", v)}
                />

                <TextareaField
                  label="Message (optional)"
                  placeholder="Tell us about your use case or any questions…"
                  value={form.message}
                  onChange={(v) => set("message", v)}
                />

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                >
                  {loading ? "Sending…" : "Contact pricing team"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                  We will never spam you or share your information.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
      >
        {!required && <option value="">Select…</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors resize-none"
      />
    </div>
  );
}
