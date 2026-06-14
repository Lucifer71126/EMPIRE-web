"use client";

import { useState } from "react";
import { siteContent } from "@/data/content";
import { copyWechat, useToast } from "@/components/Toast";

export function FounderSection() {
  const founder = siteContent.founder;
  const { showToast } = useToast();
  const [showImage, setShowImage] = useState(true);

  return (
    <section id="founder" className="py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Founder</p>
            <div className="relative mt-3 inline-block pr-8">
              <span className="absolute -right-4 top-8 select-none font-serif text-5xl italic opacity-35 sm:text-7xl" style={{ color: "var(--gold)" }}>
                {founder.signature}
              </span>
              <h2 data-i18n="founder.name" data-editable="founder.name" className="relative text-5xl font-semibold leading-tight sm:text-6xl">{founder.name}</h2>
            </div>
            <p data-i18n="founder.role" data-editable="founder.role" className="mt-4 text-xl font-semibold" style={{ color: "var(--gold)" }}>{founder.role}</p>
            <p data-i18n="founder.slogan" data-editable="founder.slogan" className="mt-8 text-3xl font-semibold leading-snug">{founder.slogan}</p>
            <div className="mt-7 space-y-5 text-base leading-8" style={{ color: "var(--text-muted)" }}>
              <p data-editable="founder.bio">{founder.bio}</p>
              <p data-editable="founder.secondBio">{founder.secondBio}</p>
            </div>
            <p className="mt-6 rounded-lg border p-5 text-base leading-8" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
              {founder.vision}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="rounded-full px-7 py-4 text-center text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>
                预约咨询
              </a>
              <button
                type="button"
                onClick={() => copyWechat(siteContent.contact.wechat, showToast)}
                className="rounded-full border px-7 py-4 text-sm font-semibold"
                style={{ borderColor: "var(--border)" }}
              >
                复制微信号
              </button>
            </div>
          </div>

          <aside className="glass-card overflow-hidden rounded-lg p-6">
            <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-md border" style={{ borderColor: "var(--border)", background: "linear-gradient(145deg, var(--bg-muted), var(--card))" }}>
              {showImage ? (
                <img data-image-slot="founder" src={founder.image} alt={founder.displayName} className="absolute inset-0 h-full w-full object-cover" onError={() => setShowImage(false)} />
              ) : (
                <div className="text-center">
                  <p className="eyebrow">Founder Portrait</p>
                  <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>将照片命名为 founder-lawrence.jpg 放入 public/images 即可替换</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founder.highlights.map((item) => (
            <article key={item.title} className="rounded-lg border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {founder.accounts.map((account) => {
            const content = (
              <span className="rounded-full border px-5 py-3 text-sm" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
                {account.platform} · <strong>{account.name}</strong>
              </span>
            );
            return account.url ? (
              <a key={account.name} href={account.url} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <span key={account.name}>{content}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
