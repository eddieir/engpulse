import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle2, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "/month",
    description: "Try EngPulse with one repository",
    highlight: false,
    badge: null,
    features: [
      "1 GitHub repository",
      "Basic weekly summary",
      "Demo data access",
      "Manual report preview",
      "Community support",
    ],
    cta: "Get started free",
    href: "/onboarding",
  },
  {
    name: "Starter",
    price: "€49",
    period: "/month",
    description: "For CTOs and engineering managers at growing teams",
    highlight: true,
    badge: "Most popular",
    features: [
      "Up to 10 repositories",
      "Weekly automated reports",
      "Shareable leadership link",
      "Repository health tracking",
      "Email delivery",
      "GitHub integration",
      "CEO & board-ready summaries",
      "Active blockers tracking",
      "4-week trend charts",
      "Email support",
    ],
    cta: "Start 14-day free trial",
    href: "/onboarding",
  },
  {
    name: "Team",
    price: "€149",
    period: "/month",
    description: "For VPs and heads of engineering with larger organizations",
    highlight: false,
    badge: null,
    features: [
      "Up to 50 repositories",
      "Multiple teams & workspaces",
      "Slack integration (coming soon)",
      "Advanced report customization",
      "Custom report tone",
      "Priority email support",
      "Early access to new features",
    ],
    cta: "Start 14-day free trial",
    href: "/onboarding",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced security and compliance needs",
    highlight: false,
    badge: null,
    features: [
      "Unlimited repositories",
      "Custom integrations",
      "SSO / SAML authentication",
      "Advanced security controls",
      "Custom onboarding",
      "Dedicated account manager",
      "SLA guarantees",
      "Custom billing & invoicing",
    ],
    cta: "Contact us",
    href: "mailto:hello@engpulse.io",
  },
];

const faqs = [
  {
    q: "What data does EngPulse read from GitHub?",
    a: "EngPulse reads repository metadata, pull requests, issues, commits, and release activity. It never modifies your code and only requires read-only access.",
  },
  {
    q: "Can I try EngPulse before committing?",
    a: "Yes. The Free plan lets you connect one repository and see a basic summary. Starter and Team plans include a 14-day free trial with no credit card required.",
  },
  {
    q: "When will Slack, Jira, and Linear integrations be available?",
    a: "These integrations are in active development. Slack is expected first, followed by Jira and Linear. All subscribers will be notified when they launch.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately. Downgrades apply at the end of your billing period.",
  },
  {
    q: "Is there a discount for startups or non-profits?",
    a: "We offer discounts for early-stage startups and non-profit organizations. Contact us at hello@engpulse.io to discuss your situation.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start free. Upgrade when your team needs more. No hidden fees. No enterprise complexity.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border overflow-hidden ${
                plan.highlight
                  ? "border-blue-600 shadow-2xl shadow-blue-600/20 ring-2 ring-blue-600"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.badge && (
                <div className="bg-blue-600 text-white text-center text-xs font-semibold py-1.5 flex items-center justify-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}
              <div className={`p-6 ${plan.highlight ? "bg-white dark:bg-slate-800" : "bg-white dark:bg-slate-800"}`}>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 dark:text-slate-400 text-sm">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{plan.description}</p>
                <Link
                  href={plan.href}
                  className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors mb-6 ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : plan.name === "Enterprise"
                        ? "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison note */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include read-only GitHub access, plain-English reporting, and zero engineering setup required.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-2">Not sure which plan is right for you?</h2>
          <p className="text-blue-100 mb-6">Try the demo first or join the waitlist. No commitment required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/demo" className="px-6 py-3 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-colors">
              View demo
            </Link>
            <Link href="/onboarding" className="px-6 py-3 text-sm font-semibold text-white border border-blue-400 hover:border-white rounded-xl transition-colors">
              Join waitlist
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
