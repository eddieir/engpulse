"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is EngPulse?",
    a: "EngPulse is an engineering intelligence platform that turns GitHub pull requests, issues, blockers, and shipping activity into plain-English weekly leadership reports for CTOs, founders, CEOs, and VPs of Engineering.",
  },
  {
    q: "Who is EngPulse for?",
    a: "EngPulse is designed for CTOs, VPs of Engineering, technical founders, and engineering managers who need to communicate engineering progress to non-technical leadership — without writing Friday update emails by hand.",
  },
  {
    q: "Does EngPulse replace GitHub?",
    a: "No. EngPulse reads from GitHub and translates what it finds into leadership language. Engineers keep using GitHub as normal. EngPulse adds the leadership reporting layer.",
  },
  {
    q: "Is EngPulse a developer productivity tracker?",
    a: "No. EngPulse measures team-level delivery flow, not individual developer performance. It is designed to help teams remove blockers, not rank, monitor, or evaluate individual engineers.",
  },
  {
    q: "Does EngPulse modify code?",
    a: "Never. EngPulse uses read-only GitHub access. It cannot write, push, open pull requests, or modify anything in your repositories.",
  },
  {
    q: "What data does EngPulse read?",
    a: "EngPulse reads pull request titles and status, issue titles and labels, commit counts, release activity, and repository metadata. It never reads source code content, secrets, or credentials.",
  },
  {
    q: "How does the 7-day beta access work?",
    a: "Submit the beta form with your work email, verify your email with the link we send, and get 7 days of free access. Connect GitHub read-only and explore the leadership dashboard. No credit card required.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-slate-900 dark:text-white text-sm pr-6">{q}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function HomepageFaqSection() {
  return (
    <section className="py-16 px-4 sm:px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10"
        >
          Frequently asked questions
        </h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-6">
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
