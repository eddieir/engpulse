import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Engineering Leadership Resources — EngPulse",
  description:
    "Guides and articles for CTOs, founders, and engineering leaders on reporting, GitHub metrics, and engineering clarity.",
  openGraph: {
    title: "Engineering Leadership Resources — EngPulse",
    description:
      "Guides and articles for CTOs, founders, and engineering leaders on reporting, GitHub metrics, and engineering clarity.",
    type: "website",
  },
};

const articles = [
  {
    slug: "weekly-engineering-report-from-github",
    title: "How to Create a Weekly Engineering Report from GitHub",
    description:
      "A practical guide for engineering leaders on turning GitHub pull requests, issues, and commit activity into a readable weekly engineering report.",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "engineering-metrics-for-ceos",
    title: "Engineering Metrics for Non-Technical CEOs",
    description:
      "What metrics actually matter to a CEO or board — and how to present engineering health without technical jargon.",
    readTime: "5 min read",
    category: "Leadership",
  },
  {
    slug: "github-activity-not-enough-leadership",
    title: "Why GitHub Activity Is Not Enough for Leadership Reporting",
    description:
      "Raw GitHub data shows what happened. Leadership reporting explains what it means. Here's the gap most engineering teams ignore.",
    readTime: "4 min read",
    category: "Strategy",
  },
  {
    slug: "cto-report-engineering-progress",
    title: "How CTOs Can Report Engineering Progress Without Manual Updates",
    description:
      "The Friday engineering update ritual is broken. Here's how forward-looking CTOs are automating the translation from GitHub to leadership narrative.",
    readTime: "7 min read",
    category: "Automation",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main>
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
              Resources
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Engineering leadership resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Practical guides for CTOs, engineering leaders, and founders on reporting, metrics, and team clarity.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {article.description}
                  </p>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Coming soon →
                  </span>
                </article>
              ))}
            </div>

            <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-xl font-bold mb-2">See your real engineering story</h2>
              <p className="text-blue-100 mb-6 text-sm">
                Connect GitHub and get a board-ready engineering report in minutes.
              </p>
              <Link
                href="/beta"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-colors"
              >
                Join free beta →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
