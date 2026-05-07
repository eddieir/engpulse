import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CopyButton } from "@/components/shared/CopyButton";
import { ExternalLink as Linkedin, Calendar, Users, Lightbulb } from "lucide-react";

const posts = [
  {
    id: 1,
    theme: "Founder story",
    title: "Why I built a dashboard for non-technical engineering visibility",
    hook: "I work around QA, engineering delivery, and automation — and one problem keeps repeating itself.",
    body: `Technical teams produce a lot of activity. GitHub is full of pull requests, issues, commits, and releases.

But leadership still struggles to understand what actually shipped, what is blocked, and what needs attention.

The problem isn't that engineers don't communicate. It's that the tools we use were built for engineers — not for the people running the business.

So I built EngPulse.

It connects to GitHub and generates a plain-English weekly report that tells you:
→ What shipped this week
→ What slowed the team down
→ What's blocking delivery
→ What leadership should ask engineering next

No jargon. No dashboards full of DORA metrics. Just clear answers to the questions every CTO, VP Engineering, and CEO actually needs.

If you're leading an engineering team and spending hours on manual reporting — I'd love your feedback.

Link in comments.`,
    cta: "Follow for more on engineering leadership and startup operations →",
    firstComment: "Demo link: [your demo URL] — would love to hear what metrics matter most to you",
    imageIdea: "Screenshot of the CEO Summary card with a clean mock dashboard",
    audience: "CTOs, VPs of Engineering, startup founders, engineering managers",
    timing: "Tuesday or Wednesday, 8–10am your local time",
  },
  {
    id: 2,
    theme: "Pain-point post",
    title: "Most CEOs don't need more engineering metrics. They need better engineering answers.",
    hook: "Every CTO I've spoken to has the same problem:\n\nThey have too much data. They have no answers.",
    body: `GitHub gives you PR counts. Jira gives you ticket numbers. Engineering managers give you status updates that require a translator.

But what a CEO actually needs to know is:
→ Are we moving fast enough?
→ Are we at risk of missing our delivery date?
→ What is blocking the team?
→ What should I ask in the next meeting?

These are simple questions. But engineering tools are designed for engineers, not for the people running the business.

The result: engineering progress becomes a black box. Leaders make decisions without visibility. Teams feel unseen.

This is why we're building EngPulse.

It turns GitHub activity into plain-English answers for leadership. One report, every week. No engineering background required.

What metrics do you currently use to track engineering progress?`,
    cta: "Comment your biggest challenge with engineering visibility →",
    firstComment: "We're running a beta. DM me if you want early access.",
    imageIdea: "Side-by-side comparison: raw GitHub data vs. plain-English summary",
    audience: "Non-technical CEOs, startup operators, investors, board members",
    timing: "Monday morning, 7–9am",
  },
  {
    id: 3,
    theme: "Product demo post",
    title: "GitHub activity → plain-English leadership report",
    hook: "What if your engineering update wrote itself every week?",
    body: `Here's what EngPulse does in 3 steps:

1. Connect GitHub (read-only, 2 minutes)
2. Select your repositories
3. Receive a weekly plain-English leadership report

The report answers:
→ What shipped this week
→ What slowed the team down
→ Which repositories need attention
→ What to tell the CEO or board

No setup fees. No engineering help needed. No DORA metrics you have to explain.

Instead of:
"Median PR cycle time increased 18%"

You get:
"Work is taking longer to reach production. Code reviews are the main delay."

Instead of:
"Deployment frequency decreased"

You get:
"The team shipped less often this week than usual."

Plain English. Every week. For free.

Link in comments.`,
    cta: "Who would this be useful for on your team? Tag them →",
    firstComment: "Demo: [your demo URL] — No signup required to view",
    imageIdea: "Screen recording or GIF of the dashboard loading and showing the CEO Summary",
    audience: "Engineering managers, CTOs, technical founders, SaaS builders",
    timing: "Thursday, 9–11am",
  },
  {
    id: 4,
    theme: "Market insight post",
    title: "Engineering reporting is broken for small teams",
    hook: "Here's something most people don't talk about:\n\nThe engineering reporting problem is a small-team problem.",
    body: `Enterprise companies have BI teams, engineering operations, and custom dashboards.

But a 20-person startup? The CTO is writing engineering updates manually every Friday.

The VP of Engineering is copying GitHub stats into a spreadsheet before the board call.

The CEO has no idea what the team is actually working on — and is too polite to keep asking.

This is the gap we're building EngPulse for.

Small and mid-size engineering teams (5–50 engineers) who:
→ Can't afford a $50k/year enterprise tool
→ Don't have a data engineering team
→ Still need leadership visibility into engineering progress
→ Want to send a real report to their CEO on Monday morning

The market is huge. The problem is universal. The solution is simpler than people think.

What tools does your team currently use for engineering visibility?`,
    cta: "Share this if your team is doing engineering reporting manually →",
    firstComment: "We're launching soon — join the waitlist at [your URL]",
    imageIdea: "Simple infographic: 'What CTOs do every Friday' with manual steps highlighted",
    audience: "VCs, startup operators, engineering leaders, SaaS founders",
    timing: "Wednesday, 7–9am",
  },
  {
    id: 5,
    theme: "Launch announcement",
    title: "Launching EngPulse: engineering clarity for non-technical leaders",
    hook: "Today I'm launching something I've been building for the past few months.\n\nEngPulse — engineering clarity for non-technical leaders.",
    body: `The problem:

Engineering teams produce enormous amounts of data. Pull requests, commits, deployments, issues, bugs.

But leadership teams — CEOs, founders, board members — can't read this data. They need translations. They need answers. They need someone to tell them what's actually happening.

Every week, CTOs and VPs of Engineering spend hours writing these translations manually.

EngPulse automates this.

Connect GitHub → Select your repositories → Get a weekly plain-English leadership report.

The report tells you:
→ What shipped
→ What slowed the team down
→ What's blocking delivery
→ What leadership should ask next
→ Which repositories need attention

And it gives leadership a single score: an Engineering Health Score from 0 to 100.

No jargon. No dashboards made for engineers. No manual reporting.

We're launching today with a free tier for 1 repository. Starter plans start at €49/month for up to 10 repositories.

Link in comments. Would love your feedback, repost, or just a "this would have saved me so many Fridays."`,
    cta: "Would you use this? Drop a comment or share →",
    firstComment: "Direct link: [your URL] — Free to start, no credit card needed",
    imageIdea: "Clean product screenshot of the full dashboard with a visible Health Score",
    audience: "Your entire network — go broad on launch day",
    timing: "Launch day, 8am sharp",
  },
];

export default function LaunchKitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn Launch Kit
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ready-to-post LinkedIn content for EngPulse
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            5 fully written LinkedIn posts to announce and promote EngPulse. Copy, customize, and publish.
          </p>
        </div>

        {/* Tips */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Calendar, title: "Best times to post", detail: "Tuesday–Thursday, 7–10am local time" },
            { icon: Users, title: "Best audiences", detail: "CTOs, founders, engineering managers, VPs" },
            { icon: Lightbulb, title: "Pro tip", detail: "Post 1 per week. Add the demo link in the first comment, not the post body." },
          ].map((tip) => (
            <div key={tip.title} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <tip.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{tip.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{tip.detail}</p>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post, i) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Post header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Post {i + 1} · {post.theme}</span>
                    <h3 className="font-semibold text-slate-900 dark:text-white mt-0.5">{post.title}</h3>
                  </div>
                  <CopyButton text={`${post.hook}\n\n${post.body}\n\n${post.cta}`} label="Copy post" />
                </div>
              </div>

              {/* Post body */}
              <div className="p-6 space-y-5">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold mb-3 whitespace-pre-line">{post.hook}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{post.body}</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-3">{post.cta}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">First comment (add separately)</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{post.firstComment}</p>
                    <div className="mt-2">
                      <CopyButton text={post.firstComment} label="Copy" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Best audience</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{post.audience}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Best time to post</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{post.timing}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1">Suggested image / video</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">{post.imageIdea}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Validation plan */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">3-Week Validation Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                week: "Week 1",
                title: "Build awareness",
                tasks: [
                  "Publish LinkedIn founder story (Post 1)",
                  "DM 20 CTOs / engineering managers",
                  "Ask for feedback on dashboard",
                  "Collect waitlist emails",
                ],
              },
              {
                week: "Week 2",
                title: "Validate willingness to pay",
                tasks: [
                  "Show demo to 5 potential customers",
                  "Ask: would you pay €49/month?",
                  "Collect objections and concerns",
                  "Publish pain-point post (Post 2)",
                ],
              },
              {
                week: "Week 3",
                title: "Drive first real usage",
                tasks: [
                  "Add GitHub OAuth",
                  "Generate real reports for 2 beta users",
                  "Ask for testimonials",
                  "Publish launch announcement (Post 5)",
                ],
              },
            ].map((phase) => (
              <div key={phase.week}>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">{phase.week}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0 mt-1.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Validation questions to ask beta users</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Would you send this report to your CEO?",
                "What part is unclear or confusing?",
                "What metric do you not trust?",
                "What would make this worth €49/month?",
                "What tool do you currently use for this?",
                "How do you report engineering progress today?",
              ].map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
