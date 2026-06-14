"use client";

import { siteContent } from "@/data/content";
import { copyWechat, useToast } from "@/components/Toast";

export function ContactCTA() {
  const cta = siteContent.contactCta;
  const { showToast } = useToast();

  return (
    <section className="py-20">
      <div className="section-shell">
        <div className="glass-card rounded-lg p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 data-i18n="contactCta.title" data-editable="contactCta.title" className="text-3xl font-semibold leading-tight sm:text-4xl">{cta.title}</h2>
              <p data-i18n="contactCta.subtitle" data-editable="contactCta.subtitle" className="mt-4 text-lg" style={{ color: "var(--text-muted)" }}>{cta.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#contact" className="rounded-full px-7 py-4 text-center text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>{cta.primary}</a>
              <a href={siteContent.contact.emailHref} className="rounded-full border px-7 py-4 text-center text-sm font-semibold" style={{ borderColor: "var(--border)" }}>{cta.email}</a>
              <button type="button" onClick={() => copyWechat(siteContent.contact.wechat, showToast)} className="rounded-full border px-7 py-4 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
                {cta.wechat}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
