"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent, type ThemeName } from "@/data/content";
import {
  applyTheme,
  getSavedThemePreference,
  getSystemTheme,
  resolveTheme,
  setSavedThemePreference,
  type ThemePreference
} from "@/lib/theme";

const config = siteContent.theme;

export function useTheme() {
  const initialPreference = useMemo<ThemePreference>(() => ({ mode: config.defaultMode }), []);
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    const saved = getSavedThemePreference();
    const nextPreference = saved ?? { mode: config.defaultMode };
    const nextTheme = resolveTheme(nextPreference, config);
    setPreference(nextPreference);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  useEffect(() => {
    if (preference.mode !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const nextTheme = getSystemTheme();
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [preference.mode]);

  function chooseAuto() {
    const nextPreference: ThemePreference = { mode: "system" };
    const nextTheme = resolveTheme(nextPreference, config);
    setPreference(nextPreference);
    setTheme(nextTheme);
    setSavedThemePreference(nextPreference);
    applyTheme(nextTheme);
  }

  function chooseManual(nextTheme: ThemeName) {
    const nextPreference: ThemePreference = { mode: "manual", theme: nextTheme };
    setPreference(nextPreference);
    setTheme(nextTheme);
    setSavedThemePreference(nextPreference);
    applyTheme(nextTheme);
  }

  return {
    theme,
    mode: preference.mode,
    chooseAuto,
    chooseLight: () => chooseManual("light"),
    chooseDark: () => chooseManual("dark")
  };
}
