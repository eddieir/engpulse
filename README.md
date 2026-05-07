# EngPulse

**Engineering clarity for non-technical leaders.**

EngPulse turns GitHub activity into plain-English weekly reports that CEOs, CTOs, and founders can understand in 30 seconds.

---

## The Problem

Most engineering tools are built for engineers — dashboards full of technical jargon, raw metrics, and charts that don't answer the questions leadership actually asks:

- Are we moving fast enough?
- What is blocking delivery?
- Are bugs increasing?
- What should I tell the CEO or board this week?

EngPulse solves this by translating GitHub activity into **plain-English leadership insight**.

---

## Target Users

- CTOs at startups with 5–50 engineers
- VPs of Engineering, Engineering Managers
- Technical Founders
- Non-technical CEOs who need visibility into engineering progress
- Startup operators preparing weekly updates for boards

---

## Features (MVP)

- **Landing page** — Marketing site with problem/solution/pricing
- **Onboarding flow** — 5-step guided setup with GitHub connection
- **Dashboard** — Full engineering leadership dashboard
  - CEO Summary with plain-English status
  - Engineering Health Score (0–100) with breakdown
  - 4 KPI cards with click-to-explain detail modals
  - Board-ready Q&A section (6 leadership questions answered)
  - Active blockers with impact and recommended action
  - Repository health table
  - 4-week trend charts
- **CEO / Engineering view toggle**
- **Weekly Leadership Report** — Shareable, print-ready
- **Blockers page** — Prioritized by severity
- **Trends page** — Historical charts with weekly breakdown
- **Settings** — Workspace, report, integration, billing settings
- **Pricing page** — Free, Starter (€49/mo), Team (€149/mo), Enterprise
- **LinkedIn Launch Kit** — 5 ready-to-publish posts with strategy
- **Dark / Light theme toggle**
- **Responsive design** — Mobile, tablet, desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Charts | Recharts |
| State | Zustand |
| Themes | next-themes |
| Data | Mock data layer (ready for GitHub API) |

---

## Project Structure

```
engpulse/
├── src/
│   ├── app/                          # Next.js pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── demo/page.tsx             # Interactive demo
│   │   ├── onboarding/page.tsx       # 5-step onboarding
│   │   ├── pricing/page.tsx          # Pricing
│   │   ├── launch-kit/page.tsx       # LinkedIn launch kit
│   │   └── dashboard/
│   │       ├── layout.tsx            # Sidebar + nav layout
│   │       ├── page.tsx              # Overview
│   │       ├── repositories/page.tsx
│   │       ├── report/page.tsx
│   │       ├── blockers/page.tsx
│   │       ├── trends/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── layout/                   # ThemeProvider, Sidebar, TopNav, ThemeToggle
│   │   ├── dashboard/                # HealthScoreCard, KpiCard, BlockerCard, etc.
│   │   ├── landing/                  # Header, Footer
│   │   └── shared/                   # StatusBadge, CopyButton, EmptyState
│   ├── lib/
│   │   ├── mock-data/index.ts        # Realistic mock data
│   │   ├── services/                 # githubClient, metricsService, insightGenerator
│   │   └── utils/index.ts            # Helpers and color utilities
│   ├── store/useAppStore.ts          # Zustand state
│   └── types/index.ts                # TypeScript types
└── README.md
```

---

## Running Locally

```bash
git clone https://github.com/your-username/engpulse.git
cd engpulse
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo in the Vercel dashboard for automatic deployments.

---

## Environment Variables

```bash
# .env.local (not required for MVP — all mock data)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

---

## Adding Real GitHub Data

1. **Implement OAuth** — Add `/api/auth/github` and `/api/auth/callback` routes
2. **Store token securely** — Database or encrypted session
3. **Replace mock returns** in `src/lib/services/githubClient.ts` — each function has a TODO comment showing the real API call
4. **Replace mock imports** in pages — swap `mockRepositories` etc. for async service calls

---

## Integrations Roadmap

| Integration | Status |
|-------------|--------|
| GitHub | ✅ Live (mock, OAuth-ready) |
| Slack | 🔜 Coming soon |
| Jira | 🔜 Coming soon |
| Linear | 🔜 Coming soon |
| Notion | 🔜 Coming soon |
| GitLab | 🔜 Coming soon |
| Bitbucket | 🔜 Coming soon |
| Azure DevOps | 🔜 Coming soon |

---

## Pricing Hypothesis

- **Free** — 1 repo, basic summary, demo data
- **Starter €49/mo** — Up to 10 repos, automated reports, email, shareable link
- **Team €149/mo** — Up to 50 repos, multi-team, Slack (soon), custom tone
- **Enterprise** — Custom integrations, SSO, dedicated support

Validation target: 10 paying Starter customers = €490 MRR


**EngPulse** — Engineering clarity for non-technical leaders.
