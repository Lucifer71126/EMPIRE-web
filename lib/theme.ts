import type { ThemeMode, ThemeName } from "@/data/content";

export type ThemePreference = {
  mode: ThemeMode;
  theme?: ThemeName;
};

export const THEME_STORAGE_KEY = "empire-theme-preference";

export function getSystemTheme(): ThemeName {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getEastEightTimeTheme(config: {
  timeZone: string;
  dayStartHour: number;
  nightStartHour: number;
}): ThemeName {
  if (typeof window === "undefined") return "light";

  const hourText = new Intl.DateTimeFormat("en-US", {
    timeZone: config.timeZone,
    hour: "2-digit",
    hour12: false
  }).format(new Date());

  const hour = Number(hourText);
  return hour >= config.dayStartHour && hour < config.nightStartHour ? "light" : "dark";
}

export function getSavedThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value ? (JSON.parse(value) as ThemePreference) : null;
  } catch {
    return null;
  }
}

export function setSavedThemePreference(preference: ThemePreference) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
}

export function resolveTheme(
  preference: ThemePreference,
  config: { timeZone: string; dayStartHour: number; nightStartHour: number }
): ThemeName {
  // system 模式：跟随用户电脑或手机系统的深色 / 浅色设置。
  if (preference.mode === "system") return getSystemTheme();

  // time 模式：按东八区时间切换，07:00 - 18:59 为白金，19:00 - 06:59 为黑金。
  if (preference.mode === "time") return getEastEightTimeTheme(config);

  // manual 模式：用户手动选择白金或黑金，并保存到 localStorage。
  return preference.theme ?? getSystemTheme();
}

export function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("empire-dark", theme === "dark");
  document.documentElement.classList.toggle("empire-light", theme === "light");
  document.documentElement.classList.add("theme-transition");
}
