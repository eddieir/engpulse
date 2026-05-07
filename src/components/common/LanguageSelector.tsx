"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useI18n, type Locale } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "es", label: "Español", short: "ES" },
  { code: "zh", label: "中文", short: "中" },
];

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSelector({ compact = false, className }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-1.5 rounded-lg border transition-colors",
          "border-slate-200 dark:border-slate-700",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
          compact ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"
        )}
      >
        <Globe className={cn(compact ? "w-3.5 h-3.5" : "w-4 h-4")} />
        <span className="font-medium">{compact ? current.short : current.label}</span>
        <ChevronDown className={cn("transition-transform", compact ? "w-3 h-3" : "w-3.5 h-3.5", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language options"
          className={cn(
            "absolute z-50 mt-1.5 w-36 rounded-xl",
            "bg-white dark:bg-slate-900",
            "border border-slate-200 dark:border-slate-700",
            "shadow-lg shadow-slate-900/10 dark:shadow-slate-900/40",
            "py-1 overflow-hidden",
            "right-0"
          )}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                l.code === locale
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 font-medium"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <span>{l.label}</span>
              {l.code === locale && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
