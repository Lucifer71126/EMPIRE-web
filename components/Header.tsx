"use client";

import { useState } from "react";
import { siteContent } from "@/data/content";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoReady, setLogoReady] = useState(true);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 82%, transparent)" }}>
      <div className="section-shell flex h-20 items-center justify-between gap-5">
        <a href="#home" className="flex items-center gap-3" aria-label="EMPIRE Ecosystem 首页">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-sm border" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
            {logoReady ? (
              <img data-image-slot="logo" src={siteContent.assets.logo} alt="EMPIRE Logo" className="h-full w-full object-contain p-1.5" onError={() => setLogoReady(false)} />
            ) : (
              <span className="text-xs font-semibold tracking-[0.14em]">E</span>
            )}
          </span>
          <span>
            <span data-i18n="brand.name" data-editable="brand.name" className="block text-lg font-semibold tracking-[0.08em]">{siteContent.brand.name}</span>
            <span data-i18n="brand.tagline" data-editable="brand.tagline" className="hidden text-xs sm:block" style={{ color: "var(--text-muted)" }}>{siteContent.brand.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm lg:flex" style={{ color: "var(--text-muted)" }}>
          {siteContent.navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[var(--gold)]" data-i18n={`nav.${item.href.replace("#", "") === "home" ? "home" : item.href.replace("#", "") === "services" ? "services" : item.href.replace("#", "") === "identity" ? "identity" : item.href.replace("#", "") === "why" ? "about" : item.href.replace("#", "")}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageToggle />
          <a href="#contact" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-gold" style={{ background: "var(--gold)" }}>
            <span data-i18n="header.contact">聯絡我們</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border px-4 py-2 text-sm lg:hidden"
          style={{ borderColor: "var(--border)" }}
          aria-expanded={open}
        >
          菜单
        </button>
      </div>

      {open ? (
        <div className="border-t lg:hidden" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
          <div className="section-shell grid gap-4 py-5">
            <div className="flex items-center gap-3">
              <ThemeToggle compact />
              <LanguageToggle />
            </div>
            <nav className="grid grid-cols-2 gap-3 text-sm">
              {siteContent.navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md border px-4 py-3" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }} data-i18n={`nav.${item.href.replace("#", "") === "home" ? "home" : item.href.replace("#", "") === "services" ? "services" : item.href.replace("#", "") === "identity" ? "identity" : item.href.replace("#", "") === "why" ? "about" : item.href.replace("#", "")}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
