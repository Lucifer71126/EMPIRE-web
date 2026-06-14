"use client";

import { FormEvent, useState } from "react";
import { siteContent } from "@/data/content";
import { copyWechat, useToast } from "@/components/Toast";

export function ContactSection() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    showToast(siteContent.form.success);
  }

  return (
    <section id="contact" className="py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 sm:p-8">
            <p data-editable="form.eyebrow" className="eyebrow">Contact</p>
            <h2 data-i18n="form.title" data-editable="form.title" className="section-title">{siteContent.form.title}</h2>
            <p data-editable="form.description" className="section-copy">{siteContent.form.description}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="姓名" name="name" />
              <Field label="联系方式" name="contact" />
              <Field label="所在城市" name="city" />
              <label className="grid gap-2 text-sm font-semibold">
                关注方向
                <select name="interest" className="rounded-md border px-4 py-3 outline-none" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}>
                  {siteContent.form.interests.map((interest) => (
                    <option key={interest}>{interest}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 grid gap-2 text-sm font-semibold">
              留言
              <textarea name="message" rows={5} className="rounded-md border px-4 py-3 outline-none" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }} />
            </label>

            <button type="submit" className="mt-7 rounded-full px-8 py-4 text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>
              提交咨询
            </button>
            {submitted ? <p className="mt-4 text-sm" style={{ color: "var(--gold)" }}>{siteContent.form.success}</p> : null}
          </form>

          <aside className="rounded-lg border p-6 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
            <h3 className="text-2xl font-semibold">直接联系</h3>
            <div className="mt-8 grid gap-6">
              <div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>邮箱</p>
                <a href={siteContent.contact.emailHref} className="mt-2 block text-lg font-semibold">{siteContent.contact.email}</a>
                <a href={siteContent.contact.emailHref} className="mt-4 inline-flex rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
                  发送邮件
                </a>
              </div>
              <div className="h-px" style={{ background: "var(--border)" }} />
              <div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>微信</p>
                <p className="mt-2 text-lg font-semibold">{siteContent.contact.wechat}</p>
                <button type="button" onClick={() => copyWechat(siteContent.contact.wechat, showToast)} className="mt-4 rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)" }}>
                  复制微信号
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input name={name} className="rounded-md border px-4 py-3 outline-none" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }} />
    </label>
  );
}
