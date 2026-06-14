import { siteContent } from "@/data/content";

export function ServiceNetwork() {
  const network = siteContent.network;

  return (
    <section id="network" className="py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p data-editable="network.eyebrow" className="eyebrow">{network.eyebrow}</p>
          <h2 data-i18n="network.title" data-editable="network.title" className="section-title">{network.title}</h2>
          <div className="mt-10 grid gap-5">
            {network.offices.map((office, index) => (
              <article key={office.city} className="rounded-lg border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <h3 data-editable={`network.offices.${index}.city`} className="text-2xl font-semibold">{office.city}</h3>
                <p data-editable={`network.offices.${index}.address`} className="mt-3 text-base leading-7">{office.address}</p>
                <p data-editable={`network.offices.${index}.description`} className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{office.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-card overflow-hidden rounded-lg p-4">
          <div className="relative min-h-[430px] overflow-hidden rounded-md border" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
            <img data-image-slot="network" src={siteContent.assets.network} alt="EMPIRE 服务网络" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--bg) 82%, transparent) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="eyebrow">Hong Kong · Shenzhen</p>
              <p className="mt-3 text-2xl font-semibold">香港中港城</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
