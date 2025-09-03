"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, Locale } from "./dictionaries";

type I18nCtx = {
  locale: Locale;
  t: typeof dictionaries["cs"];
  setLocale: (loc: Locale) => void;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start from 'cs' on both server and client to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("cs");

  // After mount, sync with persisted preference (if any)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("locale");
      if (saved === "en" || saved === "cs") setLocaleState(saved as Locale);
    } catch {}
  }, []);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    try { window.localStorage.setItem("locale", loc); } catch {}
  }, []);

  useEffect(() => {
    // reflect into <html lang>
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = useMemo(() => dictionaries[locale], [locale]);

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}
