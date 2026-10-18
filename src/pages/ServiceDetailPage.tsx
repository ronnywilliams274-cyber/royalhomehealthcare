import { Link, useParams } from "react-router";
import { serviceBySlug, categories, type Service } from "@/data/services";
import { site } from "@/data/site";
import { PageHero, ServiceCard, CtaBand, FaqList, CheckList, JsonLd } from "@/components/Shared";
import SmartImage from "@/components/SmartImage";
import { media } from "@/config/media";
import { Icon } from "@/components/Icon";
import NotFoundPage from "@/pages/NotFoundPage";

export default function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const s = serviceBySlug(slug);
  if (!s) return <NotFoundPage />;

  const related = s.related.map(serviceBySlug).filter((r): r is Service => Boolean(r));
  const img = s.image ?? categoryImage[s.category];

  return (
    <>
      <PageHero
        eyebrow={categories[s.category].label}
        title={s.title}
        intro={<p>{s.intro}</p>}
        aside={<QuickFacts s={s} />}
      >
        <a href={site.phoneHref} className="btn btn-gold">
          <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
        </a>
        <Link to="/contact" className="btn btn-outline-light">
          Request care
        </Link>
      </PageHero>

      {/* Overview + what's included */}
      <section aria-labelledby="overview-title" className="bg-cream">
        <div className="container-royal grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-5 text-gold-ink">
              Overview
            </p>
            <h2 id="overview-title" data-reveal className="h-display text-h3 !text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] text-forest">
              About {s.navTitle ?? s.title}
            </h2>
            <div data-reveal className="prose-royal mt-6 space-y-5 text-lg leading-relaxed text-charcoal/90">
              {s.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {s.byArrangement && (
              <p className="mt-6 flex gap-3 rounded-2xl border border-forest/15 bg-white p-5 text-[0.98rem] text-moss">
                <Icon name="Info" className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                Provided by arrangement with trusted, licensed partners and coordinated by Royal Home Health Care as part of
                your plan of care.
              </p>
            )}
            <div data-reveal className="mt-10">
              <SmartImage src={img.src} alt={img.alt} width={1080} height={720} className="aspect-[3/2] rounded-[1.5rem]" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal className="card p-7 sm:p-9">
              <h2 className="font-serif-display text-3xl font-semibold text-forest">What's included</h2>
              <div className="mt-6">
                <CheckList items={s.includes} />
              </div>
            </div>
            <div data-reveal className="mt-6 rounded-2xl bg-linen p-7 sm:p-9">
              <h2 className="font-serif-display text-3xl font-semibold text-forest">Who it helps</h2>
              <ul className="mt-5 space-y-3">
                {s.whoFor.map((w) => (
                  <li key={w} className="flex gap-3 leading-relaxed text-charcoal/90">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-ink" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      {s.visit && (
        <section aria-labelledby="visit-title" className="on-dark bg-forest-deep text-cream">
          <div className="container-royal py-20 lg:py-24">
            <p data-reveal className="eyebrow mb-5 text-gold-light">
              What to expect
            </p>
            <h2 id="visit-title" data-reveal className="h-display text-h2 max-w-3xl">
              {s.visit.length === 3 ? "Three simple steps." : "Your care, step by step."}
            </h2>
            <ol data-reveal className={`mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 ${s.visit.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {s.visit.map((v, i) => (
                <li key={v.title} className="bg-forest-deep p-7 lg:p-9">
                  <span aria-hidden="true" className="font-serif-display text-2xl text-gold-light">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-serif-display text-2xl font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream/90">{v.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Safety */}
      {(s.watchFor || s.callout) && (
        <section aria-labelledby="safety-title" className="bg-cream">
          <div className="container-royal grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5 text-gold-ink">Staying safe</p>
              <h2 id="safety-title" className="h-display text-h2 text-forest">
                {s.callout ? s.callout.title : "When to call us or your doctor"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-moss">
                Our office is open {site.hours.label}. {site.hours.onCall}
              </p>
            </div>
            <div className="space-y-6 lg:col-span-6 lg:col-start-7">
              {s.callout && (
                <ul className="card divide-y divide-forest/10 p-2">
                  {s.callout.body.map((b) => (
                    <li key={b} className="px-5 py-4 text-lg text-charcoal">
                      <strong className="font-serif-display text-2xl text-forest">{b.slice(0, 1)}</strong>
                      {b.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
              {s.watchFor && (
                <div className="card p-7">
                  <h3 className="font-semibold text-forest">Call us or your physician if you notice:</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.watchFor.map((w) => (
                      <li key={w} className="flex gap-3 leading-relaxed text-charcoal/90">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-ink" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p role="note" className="flex gap-3 rounded-2xl border-2 border-[#b42318] bg-white p-5 font-semibold text-[#8f1c13]">
                <Icon name="TriangleAlert" className="mt-0.5 h-5 w-5 shrink-0" />
                For chest pain, trouble breathing, signs of stroke, severe bleeding or any emergency, call 911.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section aria-labelledby="svc-faq-title" className="bg-linen">
        <div className="container-royal grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-gold-ink">Questions</p>
            <h2 id="svc-faq-title" className="h-display text-h2 text-forest">
              {s.navTitle ?? s.title} FAQs
            </h2>
            <p className="mt-6">
              <Link to="/faq" className="link-arrow">
                All frequently asked questions <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={s.faqs} />
            {s.footnote && <p className="mt-6 text-sm text-moss">{s.footnote}</p>}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-cream">
          <div className="container-royal py-20 lg:py-24">
            <h2 id="related-title" className="h-display text-h2 mb-10 text-forest">
              Related services
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ServiceCard s={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand title={`Ask us about ${s.navTitle ?? s.title.replace("™", "")}.`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: `${s.title} at Home`,
          description: s.metaDescription,
          ...(site.siteUrl ? { url: `${site.siteUrl}/services/${s.slug}` } : {}),
          audience: { "@type": "PeopleAudience", audienceType: "Patients and family caregivers" },
          about: { "@type": "MedicalTherapy", name: s.title },
          provider: { "@type": "MedicalBusiness", name: site.name, telephone: "+1-818-630-5702" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}

const categoryImage: Record<Service["category"], { src: string; alt: string }> = {
  nursing: {
    src: media.nurseVisit,
    alt: "A nurse in teal scrubs checks the blood pressure of a smiling older woman resting in a recliner at home.",
  },
  programs: {
    src: media.connection,
    alt: "A smiling older woman resting in a recliner looks up at a nurse who leans in to talk with her.",
  },
  core: {
    src: media.companionship,
    alt: "A smiling caregiver leans toward a laughing older man as they hold hands in a sunlit living room.",
  },
};

function QuickFacts({ s }: { s: Service }) {
  const facts = [
    { icon: "Stethoscope" as const, label: "Provided by", value: s.byArrangement ? "Licensed partners, coordinated by Royal" : s.category === "core" && s.slug === "home-health-aides" ? "Certified home health aides, supervised by an RN" : "Registered nurses and your Royal care team" },
    { icon: "ClipboardCheck" as const, label: "Ordered by", value: "Your physician or allowed practitioner" },
    { icon: "BadgeCheck" as const, label: "Coverage", value: "Medicare-certified; Medi-Cal and other plans" },
    { icon: "MapPin" as const, label: "Where", value: "In your home, across 4 Southern California counties" },
  ];
  return (
    <dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
      {facts.map((f) => (
        <div key={f.label} className="flex gap-4 bg-forest-deep/90 p-5">
          <Icon name={f.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">{f.label}</dt>
            <dd className="mt-1 text-cream">{f.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
