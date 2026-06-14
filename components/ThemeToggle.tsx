"use client";

import { useTheme } from "@/hooks/useTheme";
import { AutoIcon, MoonIcon, SunIcon } from "@/components/Icons";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, mode, chooseAuto, chooseLight, chooseDark } = useTheme();

  const items = [
    { label: "跟随系统", shortLabel: "自动", active: mode === "system", action: chooseAuto, icon: AutoIcon },
    { label: "白天白金", shortLabel: "白金", active: mode === "manual" && theme === "light", action: chooseLight, icon: SunIcon },
    { label: "晚上黑金", shortLabel: "黑金", active: mode === "manual" && theme === "dark", action: chooseDark, icon: MoonIcon }
  ];

  return (
    <div className={`inline-flex rounded-full border p-1 ${compact ? "text-xs" : "text-sm"}`} style={{ borderColor: "var(--border)", background: "var(--card)" }} aria-label="主题切换">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.action}
          className={`grid h-9 w-9 place-items-center rounded-full font-medium ${item.active ? "text-white" : ""}`}
          style={item.active ? { background: "var(--gold)" } : { color: "var(--text-muted)" }}
          title={item.label}
          aria-label={item.label}
        >
          <item.icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
          <span className="sr-only">{item.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
