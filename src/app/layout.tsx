import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { I18nProvider } from "@/i18n/I18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EngPulse — Engineering clarity for non-technical leaders",
  description:
    "EngPulse turns GitHub activity into plain-English weekly reports that CEOs, CTOs, and founders can understand in 30 seconds. Board-ready engineering intelligence.",
  keywords: [
    "engineering metrics",
    "leadership dashboard",
    "CTO tool",
    "GitHub analytics",
    "engineering health score",
    "weekly engineering report",
    "board ready engineering",
    "delivery confidence",
    "PR review bottleneck",
  ],
  openGraph: {
    title: "EngPulse — Turn GitHub activity into board-ready engineering reports",
    description:
      "Plain-English weekly engineering intelligence for CTOs, founders, and CEOs. Health score, blockers, delivery confidence — no jargon.",
    type: "website",
    locale: "en_US",
    siteName: "EngPulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngPulse — Board-ready engineering reports",
    description:
      "Turn GitHub activity into plain-English weekly reports that CTOs, founders, and CEOs can understand in 30 seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
