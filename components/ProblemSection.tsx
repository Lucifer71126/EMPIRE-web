import { siteContent } from "@/data/content";

export function ProblemSection() {
  const problem = siteContent.problem;

  return (
    <section className="py-24">
      <div className="section-shell">
        <p data-editable="problem.eyebrow" className="eyebrow">{problem.eyebrow}</p>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 data-i18n="problem.title" data-editable="problem.title" className="section-title">{problem.title}</h2>
            <p data-i18n="problem.intro" data-editable="problem.intro" className="section-copy">{problem.intro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {problem.items.map((item, index) => (
              <div key={item} className="glass-card rounded-lg p-6">
                <span className="text-sm font-semibold" style={{ color: "var(--gold)" }}>0{index + 1}</span>
                <p className="mt-5 text-lg font-semibold leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 rounded-lg border p-7 text-lg leading-9" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
          <span data-editable="problem.summary">{problem.summary}</span>
        </div>
      </div>
    </section>
  );
}
