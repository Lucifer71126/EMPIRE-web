import { siteContent } from "@/data/content";

export function GroupCredentials() {
  const credentials = siteContent.credentials;

  return (
    <section id="credentials" className="py-24">
      <div className="section-shell">
        <p data-editable="credentials.eyebrow" className="eyebrow">{credentials.eyebrow}</p>
        <h2 data-i18n="credentials.title" data-editable="credentials.title" className="section-title">{credentials.title}</h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {credentials.companies.map((company) => (
            <div key={company} className="glass-card rounded-lg p-6">
              {company.includes("｜") ? (
                <p className="text-lg font-semibold leading-7">
                  <span className="block">{company.split("｜")[0]}</span>
                  <span className="mt-2 block text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                    {company.split("｜")[1]}
                  </span>
                </p>
              ) : (
                <p className="text-lg font-semibold leading-7">{company}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {credentials.licenses.map((license) => (
            <span key={license.title} className="rounded-full border px-5 py-3 text-sm" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
              {license.title}
              {license.number ? ` · ${license.number}` : ""}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
