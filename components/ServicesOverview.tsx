"use client";

import { useState } from "react";
import { siteContent } from "@/data/content";
import { ServiceIcon } from "@/components/Icons";

export function ServicesOverview() {
  const [active, setActive] = useState(0);
  const services = siteContent.services;

  return (
    <section id="services" className="py-24">
      <div className="section-shell">
        <p data-editable="services.eyebrow" className="eyebrow">{services.eyebrow}</p>
        <h2 data-i18n="services.title" data-editable="services.title" className="section-title">{services.title}</h2>
        <p data-i18n="services.subtitle" data-editable="services.subtitle" className="section-copy">{services.subtitle}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => setActive(index)}
              className="glass-card rounded-lg p-6 text-left hover:-translate-y-1"
              style={{ borderColor: active === index ? "var(--gold)" : "var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full border" style={{ borderColor: "var(--border)", color: "var(--gold)", background: "var(--bg-muted)" }}>
                  <ServiceIcon index={index} />
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--gold)" }}>0{index + 1}</span>
              </div>
              <h3 data-editable={`services.${index}.title`} className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p data-editable={`services.${index}.description`} className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{service.description}</p>
              {active === index ? (
                <ul className="mt-5 grid gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span style={{ color: "var(--gold)" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
