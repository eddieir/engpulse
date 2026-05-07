"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { en } from "./dictionaries/en";
import { it } from "./dictionaries/it";
import { es } from "./dictionaries/es";
import { zh } from "./dictionaries/zh";
import type { Dictionary } from "./dictionaries/en";

export type Locale = "en" | "it" | "es" | "zh";

const STORAGE_KEY = "engpulse_locale";
const VALID: Locale[] = ["en", "it", "es", "zh"];
const dictionaries: Record<Locale, Dictionary> = { en, it, es, zh };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

function getSaved(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v && VALID.includes(v as Locale)) return v as Locale;
  } catch {}
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(getSaved());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
