import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — EngPulse",
  description:
    "Learn how EngPulse handles beta requests, pricing inquiries, GitHub-related data, email verification, and engineering reporting data.",
};

const LAST_UPDATED = "8 May 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">

            <Section title="1. What is EngPulse">
              <p>
                EngPulse is an early-stage SaaS product that transforms GitHub activity into
                plain-English engineering leadership reports for CTOs, founders, and engineering
                managers. EngPulse is currently in public beta.
              </p>
              <p>
                This Privacy Policy explains what data we collect, how we use it, and what rights
                you have. If you have questions, contact us at{" "}
                <a href="mailto:privacy@engpulse.io" className="text-blue-600 dark:text-blue-400 underline">
                  privacy@engpulse.io
                </a>
                .
              </p>
            </Section>

            <Section title="2. Data we collect">
              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.1 Beta request data</h3>
              <p>When you submit a beta access request, we collect:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Full name</li>
                <li>Work email address</li>
                <li>Company name</li>
                <li>Role (e.g. CTO, VP Engineering)</li>
                <li>Engineering team size</li>
                <li>Current reporting method (optional)</li>
                <li>Biggest reporting pain point (optional)</li>
                <li>Whether you would send a report to your CEO or board (optional)</li>
                <li>Preferred language</li>
                <li>Selected plan</li>
              </ul>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.2 Email verification data</h3>
              <p>
                When you verify your email, we store a one-way SHA-256 hash of the verification
                token. We do not store the raw token. We record the time of verification and
                generate an access session.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.3 Pricing inquiry data</h3>
              <p>When you submit a pricing inquiry, we collect:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Full name and work email</li>
                <li>Company name and role</li>
                <li>Interested plan</li>
                <li>Engineering team size (optional)</li>
                <li>Number of repositories (optional)</li>
                <li>Current reporting tool (optional)</li>
                <li>Message (optional)</li>
              </ul>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.4 GitHub-related data</h3>
              <p>
                When you connect GitHub (either real OAuth or simulated demo mode), we may store:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>GitHub username and numeric user ID</li>
                <li>GitHub organization (if provided)</li>
                <li>OAuth scopes granted</li>
                <li>Connection timestamp</li>
                <li>Selected repository names (not code or contents)</li>
              </ul>
              <p className="mt-2">
                <strong>We do not store raw OAuth access tokens.</strong> We never read, store, or
                transmit source code, secrets, credentials, commit diffs, or file contents.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.5 Audit events</h3>
              <p>
                We log internal audit events (form submissions, email verifications, GitHub
                connections) for operational integrity. These logs do not contain secrets or tokens.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mt-4 mb-2">2.6 Analytics</h3>
              <p>
                We may use a privacy-respecting analytics tool (e.g. PostHog or Plausible) to track
                page views and button interactions in aggregate. No individual developer activity is
                tracked.
              </p>
            </Section>

            <Section title="3. How we use your data">
              <ul className="list-disc list-inside space-y-2">
                <li>To verify your email and grant beta access</li>
                <li>To send your verification email and access confirmation</li>
                <li>To respond to pricing inquiries</li>
                <li>To generate engineering leadership reports from GitHub activity</li>
                <li>To improve EngPulse during the beta period</li>
                <li>To communicate product updates (you can opt out at any time)</li>
              </ul>
            </Section>

            <Section title="4. How data is stored">
              <p>
                All data is stored in a Supabase (PostgreSQL) database hosted on EU infrastructure.
                Access to this database is protected by a server-side service role key that is never
                exposed to the browser. Row-level security is supplemented by API-level access
                control.
              </p>
              <p>
                Session tokens are stored as httpOnly, Secure cookies in your browser and verified
                server-side. We store only the SHA-256 hash of tokens — not the raw values.
              </p>
            </Section>

            <Section title="5. Third-party processors">
              <p>We use the following sub-processors to operate EngPulse:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Netlify</strong> — Hosting, serverless functions, and edge delivery.
                  Data may transit Netlify infrastructure.
                </li>
                <li>
                  <strong>Supabase</strong> — Database and authentication infrastructure.
                  Your form data and session data are stored here.
                </li>
                <li>
                  <strong>Resend</strong> — Transactional email delivery. Your email address and
                  name are passed to Resend to send verification and confirmation emails.
                </li>
                <li>
                  <strong>GitHub (when OAuth is used)</strong> — When you authorize GitHub,
                  GitHub OAuth processes your login and returns your profile to EngPulse.
                  We do not store your GitHub access token.
                </li>
              </ul>
            </Section>

            <Section title="6. Data retention">
              <p>
                Beta request and access session data is retained for the duration of the beta
                programme and for up to 12 months after your last interaction.
              </p>
              <p>
                You may request deletion of your data at any time by contacting{" "}
                <a href="mailto:privacy@engpulse.io" className="text-blue-600 dark:text-blue-400 underline">
                  privacy@engpulse.io
                </a>
                . We will action deletion requests within 30 days.
              </p>
            </Section>

            <Section title="7. Your rights">
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to certain processing</li>
                <li>Data portability (where applicable)</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact{" "}
                <a href="mailto:privacy@engpulse.io" className="text-blue-600 dark:text-blue-400 underline">
                  privacy@engpulse.io
                </a>
                .
              </p>
            </Section>

            <Section title="8. What we never do">
              <ul className="list-disc list-inside space-y-1">
                <li>We never sell personal data to third parties.</li>
                <li>We never track individual developer performance.</li>
                <li>We never read, store, or transmit source code.</li>
                <li>We never access repository secrets or credentials.</li>
                <li>We never modify code or open pull requests.</li>
                <li>We never expose your GitHub OAuth token — we do not store it.</li>
              </ul>
            </Section>

            <Section title="9. Contact">
              <p>
                EngPulse is operated as an early-stage SaaS product. For privacy questions or data
                requests, email{" "}
                <a href="mailto:privacy@engpulse.io" className="text-blue-600 dark:text-blue-400 underline">
                  privacy@engpulse.io
                </a>
                .
              </p>
              <p className="mt-2">
                See also:{" "}
                <Link href="/terms" className="text-blue-600 dark:text-blue-400 underline">
                  Terms of Service
                </Link>
                {" · "}
                <Link href="/security" className="text-blue-600 dark:text-blue-400 underline">
                  Security
                </Link>
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
