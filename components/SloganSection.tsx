import { siteContent } from "@/data/content";

export function SloganSection() {
  const slogan = siteContent.slogan;

  return (
    <section className="py-10 sm:py-12">
      <div className="section-shell">
        <div className="rounded-lg border px-6 py-9 text-center sm:px-10" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--card) 82%, transparent)" }}>
          <p data-i18n="slogan.caption" data-editable="slogan.caption" className="eyebrow">{slogan.caption}</p>
          <h2
            data-i18n="slogan.text"
            data-editable="slogan.text"
            className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl"
            style={{
              color: "var(--gold)",
              fontFamily: "SimSun, STSong, 'Songti SC', 'Noto Serif CJK SC', serif"
            }}
          >
            {slogan.text}
          </h2>
        </div>
      </div>
    </section>
  );
}
