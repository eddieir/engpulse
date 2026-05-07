import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import {
  ArrowRight,
  GitFork as Github,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
  BarChart3,
  FileText,
  Users,
  Clock,
  Star,
} from "lucide-react";

const integrations = [
  { name: "GitHub", status: "live", description: "Pull requests, issues, commits" },
  { name: "Slack", status: "soon", description: "Team notifications & updates" },
  { name: "Jira", status: "soon", description: "Issue tracking & sprints" },
  { name: "Linear", status: "soon", description: "Project & issue management" },
  { name: "Notion", status: "soon", description: "Documentation & wikis" },
  { name: "GitLab", status: "soon", description: "CI/CD & repository data" },
  { name: "Bitbucket", status: "soon", description: "Code hosting & pipelines" },
  { name: "Azure DevOps", status: "soon", description: "Boards, repos & pipelines" },
];

const problems = [
  { icon: BarChart3, text: "Too many raw metrics — not enough answers" },
  { icon: Clock, text: "Weekly updates take hours to write manually" },
  { icon: Github, text: "GitHub is hard to read for non-technical leaders" },
  { icon: FileText, text: "Board reports take too long to prepare" },
  { icon: AlertTriangle, text: "Bottlenecks are discovered too late" },
];

const solutions = [
  { icon: FileText, text: "A weekly plain-English engineering summary" },
  { icon: Shield, text: "A single engineering health score (0–100)" },
  { icon: AlertTriangle, text: "Automatic bottleneck detection" },
  { icon: BarChart3, text: "Repository-level health indicators" },
  { icon: Star, text: "Board-ready answers to leadership questions" },
  { icon: TrendingUp, text: "GitHub-based insight with zero manual work" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/20" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            GitHub-powered engineering intelligence
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            Engineering clarity for
            <br />
            <span className="text-blue-600 dark:text-blue-400">non-technical leaders</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            EngPulse turns GitHub activity into plain-English weekly reports that CEOs, CTOs, and founders can understand in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg"
            >
              View live dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl transition-colors"
            >
              Join the waitlist
            </Link>
          </div>

          {/* Hero dashboard preview */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 mx-4 px-3 py-1 bg-white dark:bg-slate-700 rounded text-xs text-slate-500 dark:text-slate-400 text-left">
                  app.engpulse.io/dashboard
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Health Score", value: "82", sub: "Healthy", color: "text-emerald-600 dark:text-emerald-400" },
                    { label: "Shipped This Week", value: "12", sub: "+18% vs last week", color: "text-blue-600 dark:text-blue-400" },
                    { label: "PRs Waiting", value: "7", sub: "Need attention", color: "text-amber-600 dark:text-amber-400" },
                    { label: "Delivery Confidence", value: "78%", sub: "Slightly down", color: "text-slate-700 dark:text-slate-300" },
                  ].map((card) => (
                    <div key={card.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-left">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{card.label}</p>
                      <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">CEO Summary</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Engineering is <strong className="text-slate-900 dark:text-white">mostly healthy</strong> this week. The team shipped 12 meaningful updates, but review delays in api-service may slow next week. Leadership should focus on unblocking code review ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Read-only GitHub access</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Setup in under 5 minutes</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Engineering teams are busy.<br />
              <span className="text-slate-500 dark:text-slate-400">Leadership still has no clear answer.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Most engineering tools are built for engineers. Dashboards are full of jargon, raw metrics, and charts that don&apos;t answer leadership questions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem) => (
              <div key={problem.text} className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="product" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              The EngPulse difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Leadership intelligence, not raw metrics
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              EngPulse translates GitHub activity into plain-English answers that every leader can understand.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((solution) => (
              <div key={solution.text} className="flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                  <solution.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{solution.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Up and running in 3 steps</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">No complex setup. No engineering help needed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect GitHub", description: "Authorize read-only access to your GitHub organization. EngPulse never modifies your code." },
              { step: "02", title: "Select repositories", description: "Choose which repositories you want to monitor. Start with one or track your entire organization." },
              { step: "03", title: "Get your weekly report", description: "Every Monday, receive a plain-English engineering report you can share with your CEO or board." },
            ].map((item) => (
              <div key={item.step} className="relative bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-200 dark:border-slate-700">
                <div className="text-5xl font-bold text-slate-100 dark:text-slate-700 mb-4 leading-none">{item.step}</div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                  Available now
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Slack, Jira, Linear, Notion, GitLab and more integrations coming soon.
          </p>
        </div>
      </section>

      {/* Board answers */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Board-ready answers, automatically</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Stop spending Friday afternoon writing engineering updates. EngPulse answers the questions leadership actually asks.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: "Are we moving fast enough?", a: "Yes, but review delays are beginning to reduce momentum.", status: "green" },
              { q: "What slowed the team down this week?", a: "Pull requests waiting more than two days for review in api-service.", status: "yellow" },
              { q: "Are bugs increasing?", a: "Bug pressure is stable, but mobile-app has three new high-priority issues.", status: "yellow" },
              { q: "What should I tell the CEO this week?", a: "The team shipped 12 updates. Review ownership in api-service needs attention.", status: "green" },
            ].map((item) => (
              <div key={item.q} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${item.status === "green" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{item.q}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              See the full dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Start with GitHub. More coming soon.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">EngPulse is building the complete engineering intelligence platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((integration) => (
              <div key={integration.name} className={`bg-white dark:bg-slate-800 rounded-xl p-5 border transition-colors ${integration.status === "live" ? "border-emerald-200 dark:border-emerald-800" : "border-slate-200 dark:border-slate-700"}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{integration.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${integration.status === "live" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" : "bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600"}`}>
                    {integration.status === "live" ? "Live" : "Soon"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Start free. Upgrade when your team grows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "€0", description: "Try with one repository", features: ["1 GitHub repository", "Basic weekly summary", "Demo data", "Manual report preview"], cta: "Get started free", highlight: false },
              { name: "Starter", price: "€49", description: "For growing teams", features: ["Up to 10 repositories", "Weekly automated reports", "Shareable leadership link", "Repository health", "Email delivery", "GitHub integration"], cta: "Start 14-day trial", highlight: true },
              { name: "Team", price: "€149", description: "For larger organizations", features: ["Up to 50 repositories", "Multiple teams", "Advanced customization", "Priority support", "Slack (coming soon)", "Custom report tone"], cta: "Contact us", highlight: false },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-7 border ${plan.highlight ? "bg-blue-600 border-blue-600 text-white shadow-xl" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
                <h3 className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-slate-900 dark:text-white"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>/month</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}>{plan.description}</p>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-blue-200" : "text-emerald-500"}`} />
                      <span className={`text-sm ${plan.highlight ? "text-blue-50" : "text-slate-700 dark:text-slate-300"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/onboarding" className={`block text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Built for engineering leadership</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { role: "CTOs", detail: "Get a clear weekly picture of engineering health without reading every PR." },
              { role: "VPs of Engineering", detail: "Spot bottlenecks early and support your team before problems escalate." },
              { role: "Technical Founders", detail: "Stay connected to engineering reality while focusing on the business." },
              { role: "Engineering Managers", detail: "Generate leadership-ready reports without spending your Friday on it." },
              { role: "Non-technical CEOs", detail: "Understand engineering progress in plain English, every week." },
              { role: "Product Leaders", detail: "Know what engineering is focused on and what might affect delivery timelines." },
            ].map((item) => (
              <div key={item.role} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{item.role}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Start with GitHub.<br />Get your first report in minutes.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
            Join engineering leaders who use EngPulse to stay informed without getting lost in the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg">
              Try demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors">
              Join waitlist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
