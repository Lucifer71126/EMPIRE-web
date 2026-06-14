"use client";

import { useEffect, useState } from "react";
import { LanguageIcon } from "@/components/Icons";
import { LANGUAGE_CHANGE_EVENT, LANGUAGE_STORAGE_KEY } from "@/components/LanguageRuntime";
import { useToast } from "@/components/Toast";
import { languageLabels, type LanguageCode } from "@/data/i18n";

const languages: Array<{ code: LanguageCode; label: string; short: string }> = Object.entries(languageLabels).map(([code, value]) => ({
  code: code as LanguageCode,
  ...value
}));

export function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("zh-Hant");
  const { showToast } = useToast();

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
    if (saved) {
      setLanguage(saved);
      document.documentElement.lang = saved;
      return;
    }

    document.documentElement.lang = "zh-Hant";

    const systemLanguage = navigator.language.toLowerCase();
    if (systemLanguage.startsWith("en") || systemLanguage.includes("hans")) {
      showToast("目前預設為繁體中文。你可點擊右上角語言圖標，選擇是否跟隨常用語言。");
    }
  }, [showToast]);

  function chooseLanguage(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: nextLanguage }));
    setOpen(false);

    if (nextLanguage === "zh-Hant") showToast("已切換為繁體中文。");
    if (nextLanguage === "zh-Hans") showToast("已切换为简体中文。");
    if (nextLanguage === "en") showToast("English mode is selected. Full English copy can be added in data/content.ts.");
  }

  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold"
        style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
        aria-label="語言選擇"
        title="語言選擇"
      >
        <LanguageIcon />
        <span>{current.short}</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-[80] w-40 overflow-hidden rounded-md border shadow-gold" style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => chooseLanguage(item.code)}
              className="block w-full px-4 py-3 text-left text-sm"
              style={{ color: item.code === language ? "var(--gold)" : "var(--text)" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
