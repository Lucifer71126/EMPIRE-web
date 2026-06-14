import { siteContent } from "@/data/content";

export function Hero() {
  const hero = siteContent.hero;

  return (
    <section id="home" className="relative min-h-[760px] overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10">
        <div
          data-image-slot="hero"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${siteContent.assets.heroCity}")`
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 32%, color-mix(in srgb, var(--bg) 18%, transparent) 66%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg) 6%, transparent) 0%, transparent 50%, var(--bg) 98%)" }} />
        <div className="absolute left-0 top-0 h-full w-2/3" style={{ background: "radial-gradient(circle at 24% 28%, rgba(200, 155, 60, 0.20), transparent 34rem)" }} />
      </div>

      <div className="section-shell flex min-h-[680px] items-center py-16">
        <div className="max-w-3xl">
          <p data-i18n="hero.subtitle" data-editable="hero.subtitle" className="eyebrow">{hero.subtitle}</p>
          <h1 data-i18n="hero.title" data-editable="hero.title" className="mt-6 text-6xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">{hero.title}</h1>
          <div className="mt-7 h-px w-36" style={{ background: "var(--gold)" }} />
          <p data-i18n="brand.tagline" data-editable="brand.tagline.hero" className="mt-7 text-2xl font-semibold leading-snug sm:text-3xl">
            {siteContent.brand.tagline}
          </p>
          <p data-i18n="hero.description" data-editable="hero.description" className="mt-7 max-w-2xl text-lg leading-9 sm:text-xl" style={{ color: "var(--text-muted)" }}>
            {hero.description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="rounded-full px-7 py-4 text-center text-sm font-semibold text-white shadow-gold" style={{ background: "var(--gold)" }}>
              <span data-i18n="hero.primaryCta" data-editable="hero.primaryCta">{hero.primaryCta}</span>
            </a>
            <a href="#services" className="rounded-full border px-7 py-4 text-center text-sm font-semibold backdrop-blur-xl" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--card) 72%, transparent)" }}>
              <span data-i18n="hero.secondaryCta" data-editable="hero.secondaryCta">{hero.secondaryCta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
