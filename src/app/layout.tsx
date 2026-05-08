import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { I18nProvider } from "@/i18n/I18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://engplus.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EngPulse — Board-Ready Engineering Reports from GitHub Activity",
    template: "%s — EngPulse",
  },
  description:
    "EngPulse turns GitHub pull requests, issues, blockers, and shipping activity into plain-English weekly engineering reports for CTOs, founders, CEOs, and engineering leaders.",
  keywords: [
    "engineering leadership report",
    "GitHub engineering dashboard",
    "engineering metrics for CTOs",
    "engineering reporting tool",
    "GitHub metrics dashboard",
    "board-ready engineering report",
    "engineering health dashboard",
    "CTO weekly report",
    "software delivery reporting",
    "engineering intelligence",
  ],
  authors: [{ name: "EngPulse" }],
  creator: "EngPulse",
  publisher: "EngPulse",
  openGraph: {
    title: "EngPulse — Board-Ready Engineering Reports from GitHub Activity",
    description:
      "Turn GitHub pull requests, issues, and shipping activity into plain-English weekly reports that CEOs, CTOs, and founders understand in 30 seconds.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["it_IT", "es_ES", "zh_CN"],
    siteName: "EngPulse",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "EngPulse — Engineering leadership reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EngPulse — Board-Ready Engineering Reports",
    description:
      "Turn GitHub activity into plain-English engineering reports that CTOs, founders, and CEOs can understand in 30 seconds.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": `${SITE_URL}`,
      "it": `${SITE_URL}/it`,
      "es": `${SITE_URL}/es`,
      "zh": `${SITE_URL}/zh`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-token",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "EngPulse",
      url: SITE_URL,
      description:
        "EngPulse turns GitHub activity into board-ready engineering reports for CTOs, founders, and engineering leaders.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "EngPulse",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "EngPulse",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "EngPulse translates GitHub pull requests, issues, blockers, and shipping activity into plain-English weekly engineering reports for CTOs, founders, CEOs, and engineering leaders.",
      offers: [
        {
          "@type": "Offer",
          name: "Free Beta",
          price: "0",
          priceCurrency: "EUR",
          description: "7-day free beta access. Demo dashboard, 1 repository.",
        },
        {
          "@type": "Offer",
          name: "Starter",
          price: "49",
          priceCurrency: "EUR",
          billingIncrement: "P1M",
          description: "Up to 10 repositories. Weekly leadership report. Email delivery.",
        },
        {
          "@type": "Offer",
          name: "Team",
          price: "149",
          priceCurrency: "EUR",
          billingIncrement: "P1M",
          description: "Up to 50 repositories. Multiple teams. Advanced health dashboard.",
        },
      ],
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
