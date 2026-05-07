import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
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
    "EngPulse turns GitHub activity into plain-English weekly reports that CEOs, CTOs, and founders can understand in 30 seconds.",
  keywords: [
    "engineering metrics",
    "leadership dashboard",
    "CTO tool",
    "GitHub analytics",
    "engineering health",
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
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
