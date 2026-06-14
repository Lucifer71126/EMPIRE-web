import { siteContent } from "@/data/content";
import { ServiceIcon } from "@/components/Icons";

export function IdentityJourney() {
  const journey = siteContent.identityJourney;

  return (
    <section id="identity" className="py-24">
      <div className="section-shell">
        <p data-editable="identity.eyebrow" className="eyebrow">{journey.eyebrow}</p>
        <h2 data-i18n="identity.title" data-editable="identity.title" className="section-title">{journey.title}</h2>
        <p data-i18n="identity.description" data-editable="identity.description" className="section-copy">{journey.description}</p>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {journey.steps.map((step, index) => (
            <div key={step.title} className="relative rounded-lg border p-5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <span className="grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: "var(--border)", color: "var(--gold)", background: "var(--bg-muted)" }}>
                <ServiceIcon index={index} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{step.description}</p>
              {index < journey.steps.length - 1 ? (
                <span className="absolute -right-3 top-10 hidden h-px w-6 lg:block" style={{ background: "var(--gold)" }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
