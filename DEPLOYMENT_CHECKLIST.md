# EngPulse — Netlify Production Deployment Checklist

Work through each section in order. Every item must be checked before going live.

---

## 1. Supabase Setup

- [ ] Create a new Supabase project at https://supabase.com
- [ ] Go to **SQL Editor** and run the full migration:
  ```
  supabase/migrations/001_initial.sql
  ```
- [ ] Confirm all 7 tables exist:
  `beta_requests`, `email_verification_tokens`, `access_sessions`,
  `github_connections`, `selected_repositories`, `pricing_inquiries`, `audit_events`
- [ ] Copy **Project URL** → set as `NEXT_PUBLIC_SUPABASE_URL` in Netlify
- [ ] Copy **anon key** → set as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify
- [ ] Copy **service_role key** → set as `SUPABASE_SERVICE_ROLE_KEY` in Netlify (mark secret)

---

## 2. Resend Setup

- [ ] Create account at https://resend.com
- [ ] Add and verify your sending domain (e.g. `engpulse.io`)
- [ ] Create an API key → set as `RESEND_API_KEY` in Netlify (mark secret)
- [ ] Set `EMAIL_FROM` to a verified sender address (e.g. `EngPulse <noreply@engpulse.io>`)
- [ ] Set `PRICING_TEAM_EMAIL` to the inbox that should receive pricing inquiry notifications
- [ ] Send a test email via Resend dashboard to confirm the domain is live

---

## 3. GitHub OAuth App (optional — enables real GitHub connect)

- [ ] Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
- [ ] Set **Homepage URL** to `https://engplus.netlify.app` (or your custom domain)
- [ ] Set **Authorization callback URL** to `https://engplus.netlify.app/api/github/callback`
- [ ] Copy **Client ID** → set as `GITHUB_CLIENT_ID` in Netlify
- [ ] Generate and copy **Client Secret** → set as `GITHUB_CLIENT_SECRET` in Netlify (mark secret)
- [ ] If skipping GitHub OAuth, leave both vars unset — app falls back to simulated demo mode automatically

---

## 4. Netlify Environment Variables

Set the following in **Netlify → Site Settings → Environment Variables** before the first deploy.
Variables marked (secret) should be marked sensitive so they are not logged.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Set to your production URL, e.g. `https://engplus.netlify.app`. No trailing slash. Must be set before build. |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | From Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | From Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (secret) | From Supabase project settings |
| `RESEND_API_KEY` | ✅ (secret) | From Resend dashboard |
| `EMAIL_FROM` | ✅ | Verified sender address |
| `PRICING_TEAM_EMAIL` | ✅ | Pricing inquiry notification inbox |
| `INTERNAL_ADMIN_PASSWORD` | ✅ (secret) | Strong password for `/internal/admin` |
| `GITHUB_CLIENT_ID` | Optional | Only if enabling real GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | Optional (secret) | Only if enabling real GitHub OAuth |

---

## 5. Netlify Build Settings

Confirm in **Netlify → Site Settings → Build & Deploy**:

- [ ] **Build command**: `npm run build`
- [ ] **Publish directory**: `.next`
- [ ] **Node.js version**: `20` (set in `netlify.toml` — no action needed)
- [ ] **Plugin**: `@netlify/plugin-nextjs` installed via `netlify.toml` — no UI install needed

---

## 6. DNS and Custom Domain (optional)

- [ ] Add your custom domain in **Netlify → Domain Management**
- [ ] Update `NEXT_PUBLIC_SITE_URL` to the custom domain and trigger a redeploy
- [ ] Confirm HTTPS is provisioned (Netlify auto-provisions Let's Encrypt)
- [ ] Confirm `www` → apex redirect or apex → `www` redirect is set

---

## 7. Post-Deploy Smoke Tests

Run these manually after the first deploy:

### 7.1 Free Beta Flow
- [ ] Visit `/beta` → form renders correctly
- [ ] Submit the form with a real email address
- [ ] Confirm the verification email arrives (check spam)
- [ ] Click the verification link → redirected to `/onboarding/connect-github`
- [ ] Confirm the 7-day activation email arrives
- [ ] Connect GitHub (demo mode) → select repos → click "Open dashboard"
- [ ] Confirm `/dashboard` loads and is accessible
- [ ] Wait for the cookie to expire or delete `ep_access_token` → confirm redirect to `/access-expired`

### 7.2 Pricing Flow
- [ ] Visit `/pricing` → all 3 plans show correct CTAs
- [ ] Click "Join free beta" → goes to `/beta` ✅
- [ ] Click "Contact pricing team" on Starter → goes to `/pricing/contact?plan=Starter` ✅
- [ ] Submit the pricing contact form → confirm confirmation email arrives
- [ ] Confirm internal pricing notification email arrives at `PRICING_TEAM_EMAIL`

### 7.3 Protected Route Guard
- [ ] Open a private/incognito window
- [ ] Visit `/dashboard` directly → redirected to `/verify-required` ✅
- [ ] Visit `/onboarding/connect-github` directly → redirected to `/verify-required` ✅

### 7.4 SEO
- [ ] Visit `/sitemap.xml` → 7 URLs with correct production domain ✅
- [ ] Visit `/robots.txt` → confirms `/api/` and `/internal/` are disallowed ✅
- [ ] Check page source on `/` → JSON-LD `<script type="application/ld+json">` present ✅
- [ ] Check `<link rel="canonical">` points to production domain ✅

### 7.5 Admin Panel
- [ ] Visit `/internal/admin` → redirected to `/internal/admin/login`
- [ ] Submit correct password → redirected to `/internal/admin` with cookie set
- [ ] Password no longer visible in URL ✅
- [ ] Beta requests and audit events tables render correctly

### 7.6 Error States
- [ ] Visit `/api/verify-email?token=invalid` → redirected to `/invalid-token` ✅
- [ ] Visit `/invalid-token?reason=expired` → shows "expired" message ✅
- [ ] Visit `/invalid-token?reason=used` → shows "already used" message ✅
- [ ] Try submitting beta form twice with same email → shows "already pending" error ✅

---

## 8. Security Verification

- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` does NOT appear in browser network tab (it's server-only)
- [ ] Confirm `ep_access_token` cookie is `httpOnly` and `Secure` in browser DevTools
- [ ] Confirm `/api/*` routes return errors (not HTML) when called without valid session
- [ ] Confirm `/internal/admin` returns login page without cookie (not DB data)
- [ ] Run a Lighthouse security audit — all security headers present

---

## 9. Monitoring Reminders

These are not blockers but should be set up before you have real users:

- [ ] Enable Netlify usage alerts (functions invocations, bandwidth)
- [ ] Set up Resend email delivery monitoring (webhook or dashboard)
- [ ] Wire up `src/lib/analytics.ts` to PostHog, Plausible, or similar
- [ ] Add Supabase table size alerts if you expect high volume

---

## 10. Known TODOs (post-launch)

These are deferred items that do not block the initial launch:

- **Rate limiting** — `/api/beta/submit` and `/api/pricing/contact` have no rate limit. Add Upstash Redis rate limiting before public traffic.
- **Cron: expiry reminder email** — Send "your access expires in 24 hours" email. Implement as a Netlify Scheduled Function or Supabase pg_cron job.
- **OG image** — Create `/public/og-image.png` (1200×630) for social sharing previews.
- **Google Search Console** — Add verification token to `layout.tsx` `metadata.verification.google`.
- **i18n URL segments** — Current multilingual is client-side only. Add `/it`, `/es`, `/zh` route segments for full SEO benefit.
- **Admin auth hardening** — Replace `?pw=` cookie auth with a proper server action login.
