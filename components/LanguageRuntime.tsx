"use client";

import { useEffect } from "react";
import { translations, type LanguageCode } from "@/data/i18n";

export const LANGUAGE_STORAGE_KEY = "empire-language";
export const LANGUAGE_CHANGE_EVENT = "empire-language-change";

function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") return "zh-Hant";
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
  return saved && saved in translations ? saved : "zh-Hant";
}

export function applyLanguage(language: LanguageCode) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key || !dictionary[key]) return;
    element.innerText = dictionary[key];
  });
}

export function LanguageRuntime() {
  useEffect(() => {
    applyLanguage(getSavedLanguage());

    function handleLanguageChange(event: Event) {
      const language = (event as CustomEvent<LanguageCode>).detail;
      applyLanguage(language);
    }

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
  }, []);

  return null;
}
