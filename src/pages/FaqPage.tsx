import { faqGroups } from "@/data/faqs";
import { site } from "@/data/site";
import { PageHero, FaqList, CtaBand, JsonLd } from "@/components/Shared";
import { Icon } from "@/components/Icon";

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Answers for patients and families."
        intro={<p>Plain-language answers about eligibility, Medicare, our services and your rights. Don't see your question? Call us.</p>}
        aside={
          <nav aria-label="FAQ topics" className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <p className="mb-3 text-sm font-semibold text-cream">Topics</p>
            <ul className="space-y-2">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-flex items-center gap-2 text-cream/90 underline decoration-cream/30 underline-offset-4 hover:decoration-cream">
                    <Icon name="ArrowRight" className="h-4 w-4 text-gold-light" />
                    {g.title}
                    <span className="sr-only">({g.items.length} questions)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <a href={site.phoneHref} className="btn btn-gold">
          <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
        </a>
      </PageHero>

      <div className="bg-cream">
        <div className="container-royal space-y-20 py-20 lg:py-28">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id={`${g.id}-title`} className="h-display text-h3 !text-[clamp(1.9rem,1.5rem+1.4vw,2.75rem)] text-forest lg:sticky lg:top-32">
                  {g.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <FaqList items={g.items} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand title="Still have questions? We're happy to help." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGroups.flatMap((g) =>
            g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
          ),
        }}
      />
    </>
  );
}
