"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, X, Zap } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-900 dark:text-white">EngPulse</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: "#product", label: "Product" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#integrations", label: "Integrations" },
            { href: "/pricing", label: "Pricing" },
            { href: "/demo", label: "Demo" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/demo"
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            View demo
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Start free
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {[
              { href: "#product", label: "Product" },
              { href: "#how-it-works", label: "How it works" },
              { href: "#integrations", label: "Integrations" },
              { href: "/pricing", label: "Pricing" },
              { href: "/demo", label: "Demo" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/demo"
                className="px-3 py-2.5 text-sm font-medium text-center border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                View demo
              </Link>
              <Link
                href="/onboarding"
                className="px-3 py-2.5 text-sm font-semibold text-center text-white bg-blue-600 rounded-lg"
              >
                Start free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
