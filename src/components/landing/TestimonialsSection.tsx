"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animation";

const testimonials = [
  {
    quote:
      "I used to spend 90 minutes every Friday turning GitHub activity into a status update for our CEO. EngPulse does it in seconds. That's time I now spend on actual engineering.",
    name: "Marcus Hernandez",
    role: "CTO",
    company: "Routifi",
    companySize: "22 engineers",
    initials: "MH",
    color: "bg-blue-600",
  },
  {
    quote:
      "We evaluated QA dashboards, DORA metric tools, and dev productivity trackers. None of them answered the question my board actually asks: 'Is engineering on track this week?' EngPulse does.",
    name: "Sarah Kim",
    role: "VP Engineering",
    company: "Wavelength",
    companySize: "Series A · 38 engineers",
    initials: "SK",
    color: "bg-violet-600",
  },
  {
    quote:
      "Every board meeting I get asked 'how is engineering going?' I used to dread that question. Now I just open EngPulse and read the board answers section out loud. It's that good.",
    name: "Daniel Osei",
    role: "Co-founder & CTO",
    company: "Parcelify",
    companySize: "Pre-seed · 9 engineers",
    initials: "DO",
    color: "bg-emerald-600",
  },
  {
    quote:
      "The delivery confidence metric alone is worth it. I can see a delivery risk forming four days before it actually hits — and act on it before anyone else even notices.",
    name: "Camille Dubois",
    role: "VP Engineering",
    company: "Stratex",
    companySize: "60 engineers",
    initials: "CD",
    color: "bg-amber-600",
  },
  {
    quote:
      "I manage QA for three product squads. EngPulse's release readiness gates give me one clear answer every sprint: are we actually ready to ship? No spreadsheets, no Slack pings — just a go or hold signal I can stand behind.",
    name: "Priya Nair",
    role: "Engineering Manager, QA",
    company: "Fenix Labs",
    companySize: "Series B · 55 engineers",
    initials: "PN",
    color: "bg-rose-600",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            What engineering leaders say
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Stop writing updates. Start leading.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5"
            >
              {/* Quote */}
              <p className="text-slate-300 leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role} · {t.company}
                  </p>
                  <p className="text-xs text-slate-600">{t.companySize}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
