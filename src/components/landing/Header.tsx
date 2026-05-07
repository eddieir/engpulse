"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { useI18n } from "@/i18n/I18nProvider";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "/#how-it-works", label: t.nav.product },
    { href: "/demo", label: t.nav.demo },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/security", label: t.nav.security },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm shadow-slate-900/5 dark:shadow-slate-900/20 border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            EngPulse
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector compact />
          <ThemeToggle />
          <Link
            href="/demo"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t.nav.viewDemo}
          </Link>
          <Link
            href="/beta"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-sm"
          >
            {t.nav.joinBeta}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector compact />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-center border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t.nav.viewDemo}
              </Link>
              <Link
                href="/beta"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-semibold text-center text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
              >
                {t.nav.joinBeta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
