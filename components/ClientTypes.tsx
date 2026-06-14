import { siteContent } from "@/data/content";
import { TrustIcon } from "@/components/Icons";

export function ClientTypes() {
  const clients = siteContent.clientTypes;

  return (
    <section className="py-24">
      <div className="section-shell">
        <p data-editable="clients.eyebrow" className="eyebrow">{clients.eyebrow}</p>
        <h2 data-i18n="clients.title" data-editable="clients.title" className="section-title">{clients.title}</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.items.map((item, index) => (
            <div key={item} className="rounded-lg border p-6 text-base font-semibold leading-7" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: "var(--border)", color: "var(--gold)", background: "var(--bg-muted)" }}>
                <TrustIcon index={index} className="h-5 w-5" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
