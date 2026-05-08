"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Mail } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/animation";
import { track } from "@/lib/analytics";

type FormState = {
  full_name: string;
  email: string;
  company: string;
  role: string;
  team_size: string;
  current_reporting_method: string;
  biggest_reporting_pain: string;
  would_send_to_ceo: boolean;
  preferred_language: string;
  selected_plan: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";
type ErrorCode =
  | "ALREADY_ACTIVE"
  | "DUPLICATE_BETA_REQUEST"
  | "VALIDATION_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "SERVER_ERROR"
  | "generic";

export function BetaPageClient() {
  const { t, language } = useI18n();
  const b = t.beta;

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorCode, setErrorCode] = useState<ErrorCode>("generic");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [emailSent, setEmailSent] = useState(true);

  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    company: "",
    role: "",
    team_size: "",
    current_reporting_method: "",
    biggest_reporting_pain: "",
    would_send_to_ceo: false,
    preferred_language: language,
    selected_plan: "Free Beta",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    if (target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [target.name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});
    track("beta_submitted", { plan: form.selected_plan, role: form.role });

    try {
      const base = process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE || "";
      const endpoint = base
        ? `${base}/beta-request`
        : "/api/beta/submit";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.ok) {
        setErrorCode((data.error as ErrorCode) || "generic");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        if (data.fields) setFieldErrors(data.fields);
        setStatus("error");
        return;
      }

      const sent = data.email_sent !== false;
      setEmailSent(sent);
      if (sent) track("verification_email_sent");
      setStatus("success");
    } catch {
      setErrorCode("generic");
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
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
            transition={{ duration: 0.55, ease: EASE }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
              <Zap className="w-3.5 h-3.5" fill="currentColor" />
              {t.footer.betaBadge}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              {b.headline}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {b.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {b.trust.map((badge: string) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-7 shadow-sm"
          >
            {status === "success" ? (
              <div className="text-center py-8">
                {emailSent ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Check your email to activate access.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      We sent a verification link to <strong>{form.email}</strong>.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      Click the link to activate your 7-day EngPulse demo access. The link expires in 24 hours.
                    </p>
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                    >
                      Preview demo while you wait
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Request saved.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      Your beta request for <strong>{form.email}</strong> was saved successfully.
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 mb-6">
                      We could not send the verification email right now. Please contact us at{" "}
                      <a href="mailto:support@engpulse.io" className="underline font-medium">
                        support@engpulse.io
                      </a>{" "}
                      to activate your access.
                    </p>
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                    >
                      Preview demo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label={b.form.name}
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label={b.form.email}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label={b.form.company}
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                  <SelectField
                    label={b.form.role}
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    options={b.form.roles}
                    required
                  />
                </div>
                <SelectField
                  label={b.form.teamSize}
                  name="team_size"
                  value={form.team_size}
                  onChange={handleChange}
                  options={b.form.teamSizes}
                  required
                />
                <TextareaField
                  label={b.form.currentMethod}
                  name="current_reporting_method"
                  value={form.current_reporting_method}
                  onChange={handleChange}
                />
                <TextareaField
                  label={b.form.pain}
                  name="biggest_reporting_pain"
                  value={form.biggest_reporting_pain}
                  onChange={handleChange}
                />
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="would_send_to_ceo"
                    name="would_send_to_ceo"
                    checked={form.would_send_to_ceo}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="would_send_to_ceo"
                    className="text-sm text-slate-700 dark:text-slate-300"
                  >
                    I would send this report to my CEO or board
                  </label>
                </div>

                {/* Selected plan display */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-0.5">Selected plan</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Free Beta — €0/month</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">7-day access · No credit card</p>
                  </div>
                  <Link
                    href="/pricing"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Change plan
                  </Link>
                </div>

                {status === "error" && (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                    {errorMsg}
                    {errorCode === "DUPLICATE_BETA_REQUEST" && (
                      <span className="block mt-1">
                        <Link href="/verify-email" className="underline">Check your email</Link> for the verification link.
                      </span>
                    )}
                    {errorCode === "ALREADY_ACTIVE" && (
                      <span className="block mt-1">
                        <Link href="/onboarding/connect-github" className="underline">Continue to connect GitHub →</Link>
                      </span>
                    )}
                    {Object.keys(fieldErrors).length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-0.5">
                        {Object.values(fieldErrors).map((msg) => (
                          <li key={msg}>{msg}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  onClick={() => track("beta_started")}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      {b.form.submit}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
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

function Field({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
      >
        <option value="">Select…</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors resize-none"
      />
    </div>
  );
}
