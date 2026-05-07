# EngPulse

**Turn GitHub activity into a board-ready engineering report.**

EngPulse is a leadership intelligence layer that translates raw GitHub signals into plain-English weekly reports — giving CTOs, founders, CEOs, and VPs Engineering the visibility they need in 30 seconds, without reading a line of code.

---

## The Problem

Most engineering tools are built for engineers. Leadership is left asking:

- Are we moving fast enough?
- What is blocking delivery right now?
- Are bugs increasing or decreasing?
- What do I tell the board this week?
- Is shipping confidence improving?

EngPulse solves this by translating GitHub activity into **plain-English leadership insight**.

---

## Target Users

| Role | Pain |
|------|------|
| CTO (startup, 5–50 engineers) | Needs to brief the CEO weekly without spending hours on it |
| VP Engineering | Wants a single health score to anchor team conversations |
| Technical Founder | Juggles product and engineering — needs quick situational awareness |
| Non-technical CEO | Needs engineering visibility without technical translation |
| Board-prep operator | Prepares weekly/monthly engineering updates for investors |

---

## Features

- **Animated landing page** — Premium investor-demo-ready design with dark/light mode
- **Interactive demo** — Fully populated dashboard with realistic mock data
- **5-step onboarding flow** — Role → GitHub → Repos → Config → Preview
- **Engineering dashboard** — Health score (76/Watch), KPI cards, blockers, repo table
- **CEO Summary** — Plain-English status with action recommendations
- **Board-ready Q&A** — 6 leadership questions pre-answered from GitHub data
- **Weekly leadership report** — Shareable, print-ready, tone-selectable
- **/security page** — Full transparency on what we read, what we never do
- **Beta waitlist form** — Role, team size, current method, pain capture
- **4 languages** — EN, IT, ES, ZH via context-based i18n
- **Dark / light theme** — Persisted via next-themes
- **Fully responsive** — Mobile, tablet, desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.5 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, no config file) |
| Animation | Framer Motion 12 |
| Icons | Lucide React 1.14 |
| Charts | Recharts |
| Themes | next-themes (attribute="class") |
| i18n | Context-based dictionary system (no external library) |
| Data | Mock data layer (ready for GitHub OAuth) |

> **Node.js requirement:** Next.js 16 requires Node.js ≥ 20.9.0. Run `node -v` before starting.

---

## Routes

| Route | Description | Visibility |
|-------|-------------|-----------|
| `/` | Landing page | Public |
| `/demo` | Interactive dashboard demo | Public |
| `/pricing` | Pricing plans with FAQ | Public |
| `/security` | Security & privacy details | Public |
| `/beta` | Beta waitlist form | Public |
| `/onboarding` | 5-step onboarding flow | Public |
| `/dashboard` | Full engineering dashboard | Public (mock) |
| `/dashboard/repositories` | Repo health table | Public (mock) |
| `/dashboard/report` | Weekly leadership report | Public (mock) |
| `/dashboard/blockers` | Active blockers list | Public (mock) |
| `/dashboard/trends` | Historical trend charts | Public (mock) |
| `/dashboard/settings` | Workspace settings | Public (mock) |
| `/internal/launch-kit` | LinkedIn launch kit (internal) | **Not publicly linked** |
| `/launch-kit` | Redirects → /internal/launch-kit | Redirect |

---

## Project Structure

```
engpulse/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Landing page (composes all sections)
│   │   ├── layout.tsx                    # Root layout — ThemeProvider + I18nProvider
│   │   ├── globals.css                   # Tailwind v4 imports + @theme + base styles
│   │   ├── demo/page.tsx                 # Interactive demo dashboard
│   │   ├── onboarding/page.tsx           # 5-step onboarding (AnimatePresence)
│   │   ├── pricing/page.tsx              # Pricing + FAQ accordion
│   │   ├── security/page.tsx             # Security transparency page
│   │   ├── beta/page.tsx                 # Beta waitlist form
│   │   ├── launch-kit/page.tsx           # Redirects to /internal/launch-kit
│   │   ├── internal/launch-kit/page.tsx  # LinkedIn launch kit (not publicly linked)
│   │   └── dashboard/
│   │       ├── layout.tsx                # Sidebar + TopNav layout
│   │       ├── page.tsx                  # Dashboard overview
│   │       ├── repositories/page.tsx
│   │       ├── report/page.tsx
│   │       ├── blockers/page.tsx
│   │       ├── trends/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   └── LanguageSelector.tsx      # EN/IT/ES/ZH dropdown (compact + full)
│   │   ├── layout/
│   │   │   ├── ThemeProvider.tsx         # next-themes wrapper
│   │   │   ├── ThemeToggle.tsx           # Sun/Moon icon button
│   │   │   ├── Sidebar.tsx               # Dashboard sidebar nav
│   │   │   └── TopNav.tsx                # Dashboard top nav with language selector
│   │   ├── landing/
│   │   │   ├── Header.tsx                # Scroll-aware frosted glass header
│   │   │   ├── HeroSection.tsx           # Hero + floating cards + mock dashboard
│   │   │   ├── PainSection.tsx           # 6 pain point cards
│   │   │   ├── TransformationSection.tsx # Raw signals → EngPulse → Insights
│   │   │   ├── BoardAnswersSection.tsx   # 6 board-ready Q&A cards
│   │   │   ├── HowItWorksSection.tsx     # 3-step process
│   │   │   ├── IntegrationGrid.tsx       # 8 integration tiles
│   │   │   ├── SecurityPreviewSection.tsx# Dark security card with CTA
│   │   │   ├── PricingSection.tsx        # 3-plan pricing (Free / Starter / Team)
│   │   │   ├── CtaSection.tsx            # Final CTA banner
│   │   │   └── Footer.tsx                # 4-column footer with badges
│   │   ├── dashboard/                    # HealthScoreCard, KpiCard, BlockerCard, etc.
│   │   └── shared/                       # StatusBadge, CopyButton, EmptyState
│   ├── i18n/
│   │   ├── I18nProvider.tsx              # createContext + useState locale
│   │   └── dictionaries/
│   │       ├── en.ts                     # English (default) — exports Dictionary type
│   │       ├── it.ts                     # Italian
│   │       ├── es.ts                     # Spanish
│   │       └── zh.ts                     # Chinese (Simplified)
│   ├── lib/
│   │   ├── mock-data/index.ts            # Realistic mock data (health: 76, 2026 dates)
│   │   ├── services/                     # githubClient, metricsService, insightGenerator
│   │   └── utils/index.ts
│   ├── store/useAppStore.ts              # Zustand state
│   └── types/index.ts                    # TypeScript types
└── README.md
```

---

## Running Locally

```bash
# Requires Node.js >= 20.9.0
node -v

git clone https://github.com/your-username/engpulse.git
cd engpulse
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Type-check only (works on Node 18+):
```bash
npx tsc --noEmit
```

---

## Deploy to Netlify

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build
netlify deploy --prod
```

**Via GitHub integration (recommended):**
1. Push to GitHub
2. Connect repo in [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Enable "Next.js Runtime" plugin

A `netlify.toml` is included in the repo with these settings pre-configured.

---

## Translation System

EngPulse uses a lightweight context-based i18n system — no external library.

### How it works

1. `src/i18n/dictionaries/en.ts` exports the full English dictionary and the `Dictionary` type
2. `it.ts`, `es.ts`, `zh.ts` implement the same `Dictionary` type in their language
3. `I18nProvider.tsx` wraps the app with a `React.createContext` that holds `{ locale, setLocale, t }`
4. `useI18n()` hook returns the current dictionary and locale setter from anywhere

```tsx
// Any component
import { useI18n } from "@/i18n/I18nProvider";

export function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  return <h1>{t.hero.headline}</h1>;
}
```

### How to add a new language

1. Create `src/i18n/dictionaries/fr.ts`:
```ts
import type { Dictionary } from "./en";
export const fr: Dictionary = {
  nav: { product: "Produit", demo: "Démo", ... },
  // ... all keys required by Dictionary type
};
```

2. Add `fr` to `I18nProvider.tsx`:
```tsx
import { fr } from "./dictionaries/fr";
type Locale = "en" | "it" | "es" | "zh" | "fr";
const dictionaries = { en, it, es, zh, fr };
```

3. Add the option to `LanguageSelector.tsx`:
```tsx
const LOCALES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  // ...
];
```

TypeScript will enforce that `fr.ts` is complete — missing keys are compile errors.

---

## Theme System

Dark/light mode is handled by `next-themes` with `attribute="class"`.

- `ThemeProvider` in `src/components/layout/ThemeProvider.tsx` wraps the app
- `ThemeToggle` in `src/components/layout/ThemeToggle.tsx` shows Sun/Moon icon
- Tailwind v4 dark variant uses `@variant dark (&:where(.dark, .dark *))` in `globals.css`
- Classes: `dark:bg-slate-900 dark:text-white` etc.
- Theme persists in `localStorage` automatically

---

## Mock Data

All data lives in `src/lib/mock-data/index.ts`. Key values:

| Field | Value | Notes |
|-------|-------|-------|
| `healthScore` | 76 | Watch status (not passing) |
| `healthStatus` | "watch" | Amber — needs attention |
| `dateRange` | "Apr 28 – May 4, 2026" | Current week |
| `generatedAt` | "May 5, 2026" | Report generation date |
| Trend weeks | "Apr 7", "Apr 14", "Apr 21", "Apr 28" | Absolute dates |

To swap in real data: replace mock returns in `src/lib/services/githubClient.ts` — each function has a TODO comment with the real GitHub API call pattern.

---

## GitHub OAuth Roadmap

When ready to connect real repos:

1. Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to `.env.local`
2. Create `/api/auth/github` route — redirect to GitHub OAuth
3. Create `/api/auth/callback` route — exchange code for token, store in session
4. Replace mock functions in `src/lib/services/githubClient.ts` with real API calls
5. Each service function already has the correct GitHub API endpoint documented in a TODO

```bash
# .env.local
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://your-domain.com/api/auth/callback
```

---

## Integrations Roadmap

| Integration | Status |
|-------------|--------|
| GitHub | Live (mock, OAuth-ready) |
| Slack | Coming soon |
| Jira | Coming soon |
| Linear | Coming soon |
| Notion | Coming soon |
| GitLab | Coming soon |
| Bitbucket | Coming soon |
| Azure DevOps | Coming soon |

---

## Pricing

| Plan | Price | Repos | Notes |
|------|-------|-------|-------|
| Free Beta | €0 | 1 | Demo data, basic summary |
| Starter | €49/mo | 10 | Automated reports, email, shareable link |
| Team | €149/mo | 50 | Multi-team, Slack (soon), custom tone |
| Enterprise | Custom | Unlimited | SSO, custom integrations, dedicated support |

Validation target: 10 Starter customers = €490 MRR

---

## Security Notes

EngPulse requests **read-only** GitHub access only. Specifically:

- `repo` (read) — commit counts, PR status, review lag
- `read:org` (read) — team structure and member visibility
- No code content is ever read or stored
- All analysis is aggregate/metadata only
- Users can revoke access from GitHub settings at any time

Full details: [/security](/security)

---

## Remaining Production Steps

1. **Node.js upgrade** — Ensure hosting environment uses Node ≥ 20.9.0
2. **GitHub OAuth** — Implement real auth flow (see roadmap above)
3. **Database** — Add Postgres/Supabase for user accounts and stored reports
4. **Email** — Wire up weekly report delivery (Resend or Postmark)
5. **Beta form backend** — Connect `/beta` form to a database or Airtable
6. **Analytics** — Add PostHog or Plausible
7. **Error monitoring** — Add Sentry
8. **Rate limiting** — Add to GitHub API calls when live

---

**EngPulse** — Engineering clarity for non-technical leaders.
