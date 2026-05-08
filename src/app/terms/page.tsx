import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Legal Terms — EngPulse",
  description:
    "Read the terms for using EngPulse, including beta access, demo data, GitHub connection, pricing inquiries, and service limitations.",
};

const LAST_UPDATED = "8 May 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">

            <Section title="1. Use of service">
              <p>
                By accessing or using EngPulse (&quot;the Service&quot;), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, do not use the Service.
              </p>
              <p>
                EngPulse is a web-based engineering reporting tool. You may use the Service only
                for lawful purposes and in accordance with these Terms.
              </p>
            </Section>

            <Section title="2. Beta and demo nature of the product">
              <p>
                EngPulse is currently in public beta. The Service is provided &quot;as-is&quot; for
                evaluation and validation purposes. Features, data, and availability may change
                without notice during the beta period.
              </p>
              <p>
                The demo dashboard uses realistic mock data representing a fictional company
                (&quot;Acme Cloud&quot;). This data does not represent any real organization and is
                provided for illustration only.
              </p>
              <p>
                Beta access is valid for 7 days from email verification. We do not guarantee
                continuous availability of the Service during the beta period.
              </p>
            </Section>

            <Section title="3. No guarantee of availability">
              <p>
                EngPulse does not guarantee that the Service will be available at any particular
                time or without interruption. The Service may be modified, suspended, or
                discontinued at any time with or without notice.
              </p>
            </Section>

            <Section title="4. GitHub connection">
              <p>
                When you connect GitHub via OAuth, you grant EngPulse read-only access to the
                repositories and organizations you authorize. You are responsible for ensuring you
                have the necessary permissions to connect your organization&apos;s GitHub account.
              </p>
              <p>
                EngPulse uses read-only GitHub access. We cannot modify code, open pull requests,
                write issues, or take any write action on your repositories.
              </p>
              <p>
                You may disconnect GitHub at any time from the settings page. Upon disconnection,
                we will cease processing your GitHub activity data.
              </p>
            </Section>

            <Section title="5. Paid plan inquiries">
              <p>
                Submitting a pricing inquiry does not constitute a purchase, subscription, or
                binding agreement. It is a request for our team to contact you. Pricing and
                availability of paid plans may change before general availability.
              </p>
            </Section>

            <Section title="6. User responsibilities">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Submit false or misleading information in any form</li>
                <li>Use automated tools to scrape or abuse the Service</li>
                <li>Interfere with the security or integrity of the Service</li>
              </ul>
            </Section>

            <Section title="7. Intellectual property">
              <p>
                All content, designs, trademarks, and software comprising EngPulse are the
                intellectual property of EngPulse and its licensors. You may not copy, reproduce,
                distribute, or create derivative works from any part of the Service without express
                written permission.
              </p>
            </Section>

            <Section title="8. Limitation of liability">
              <p>
                To the fullest extent permitted by applicable law, EngPulse and its operators
                shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or related to your use of the Service, including
                but not limited to loss of data, loss of revenue, or loss of business opportunity.
              </p>
              <p>
                The Service is provided during a beta period without any warranty of any kind,
                express or implied. Use of the Service is at your own risk.
              </p>
            </Section>

            <Section title="9. Access expiry and termination">
              <p>
                Beta access expires 7 days after email verification. After expiry, access to the
                dashboard and onboarding flows will be restricted.
              </p>
              <p>
                We reserve the right to terminate or suspend access to the Service at any time,
                for any reason, with or without notice, including for violations of these Terms.
              </p>
            </Section>

            <Section title="10. Changes to these terms">
              <p>
                We may update these Terms at any time. Continued use of the Service after changes
                are posted constitutes acceptance of the updated Terms. We will update the
                &quot;Last updated&quot; date at the top of this page when changes are made.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                If you have questions about these Terms, contact us at{" "}
                <a href="mailto:legal@engpulse.io" className="text-blue-600 dark:text-blue-400 underline">
                  legal@engpulse.io
                </a>
                .
              </p>
              <p className="mt-2">
                See also:{" "}
                <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">
                  Privacy Policy
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
