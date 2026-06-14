import { siteContent } from "@/data/content";
import { TrustIcon } from "@/components/Icons";

export function WhyEmpire() {
  const why = siteContent.whyEmpire;

  return (
    <section id="why" className="py-24">
      <div className="section-shell">
        <p data-editable="why.eyebrow" className="eyebrow">{why.eyebrow}</p>
        <h2 data-i18n="why.title" data-editable="why.title" className="section-title">{why.title}</h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {why.pillars.map((pillar, index) => (
            <article key={pillar.title} className="glass-card rounded-lg p-7">
              <span className="grid h-14 w-14 place-items-center rounded-full border" style={{ borderColor: "var(--border)", color: "var(--gold)", background: "var(--bg-muted)" }}>
                <TrustIcon index={index} />
              </span>
              <h3 data-editable={`why.pillars.${index}.title`} className="mt-6 text-2xl font-semibold">{pillar.title}</h3>
              <p data-editable={`why.pillars.${index}.description`} className="mt-4 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{pillar.description}</p>
              <ul className="mt-6 grid gap-3 text-sm">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span style={{ color: "var(--gold)" }}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {why.metrics.map((metric, index) => (
            <div key={metric.label} className="rounded-lg border p-6" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
              <div className="flex items-center justify-between gap-3">
                <div className="text-3xl font-semibold" style={{ color: "var(--gold)" }}>{metric.value}</div>
                <span style={{ color: "var(--gold)" }}>
                  <TrustIcon index={index} className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
