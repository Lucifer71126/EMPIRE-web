"use client";

import { siteContent } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}>
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1fr_1fr]">
        <div>
          <h2 data-i18n="brand.name" data-editable="footer.brandName" className="text-2xl font-semibold">{siteContent.brand.name}</h2>
          <p data-i18n="brand.tagline" data-editable="footer.tagline" className="mt-3" style={{ color: "var(--text-muted)" }}>{siteContent.brand.tagline}</p>
        </div>
        <div className="text-sm leading-8" style={{ color: "var(--text-muted)" }}>
          <p data-i18n="footer.companyCn" data-editable="footer.companyCn" className="text-base font-semibold" style={{ color: "var(--text)" }}>恩博环球控股有限公司</p>
          <p data-i18n="footer.companyEn" data-editable="footer.companyEn">Empire Group Global Limited</p>
        </div>
        <div className="text-sm leading-8" style={{ color: "var(--text-muted)" }}>
          <p>香港总部：{siteContent.contact.addressHK}</p>
          <p>深圳前海家办：{siteContent.contact.addressSZ}</p>
        </div>
      </div>
    </footer>
  );
}
