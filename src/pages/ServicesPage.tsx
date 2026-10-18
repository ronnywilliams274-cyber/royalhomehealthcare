import { categories, servicesIn, type ServiceCategory } from "@/data/services";
import { PageHero, ServiceCard, CtaBand, MedicareBadge } from "@/components/Shared";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

const order: ServiceCategory[] = ["nursing", "programs", "core"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Skilled care at home, coordinated around you."
        intro={
          <p>
            Every service below is provided under a personalized care plan signed by your doctor. Not sure where to start? Give us a call and one of our registered nurses will help you sort everything out.
          </p>
        }
        aside={
          <div className="space-y-4">
            <MedicareBadge dark />
            <nav aria-label="Jump to a service group" className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="mb-3 text-sm font-semibold text-cream">On this page</p>
              <ul className="space-y-1.5">
                {order.map((c) => (
                  <li key={c}>
                    <a href={`#${c}`} className="inline-flex items-center gap-2 text-cream/90 underline decoration-cream/30 underline-offset-4 hover:decoration-cream">
                      <Icon name="ArrowRight" className="h-4 w-4 text-gold-light" />
                      {categories[c].label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        }
      >
        <a href={site.phoneHref} className="btn btn-gold">
          <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
        </a>
      </PageHero>

      {order.map((c, idx) => (
        <section key={c} id={c} aria-labelledby={`${c}-title`} className={idx % 2 ? "bg-linen" : "bg-cream"}>
          <div className="container-royal py-20 lg:py-24">
            <div className="mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-4 text-gold-ink">{categories[c].eyebrow}</p>
                <h2 id={`${c}-title`} className="h-display text-h2 text-forest">
                  {categories[c].label}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-moss lg:col-span-5">{categories[c].blurb}</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesIn(c).map((s, i) => (
                <li key={s.slug} data-reveal data-reveal-delay={String((i % 3) * 0.05)}>
                  <ServiceCard s={s} headingLevel={3} />
                </li>
              ))}
            </ul>
            {c === "core" && (
              <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-moss">
                Therapy, medical social services and medical supplies are provided by arrangement with trusted partners and
                coordinated by Royal Home Health Care with your physician.
              </p>
            )}
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
