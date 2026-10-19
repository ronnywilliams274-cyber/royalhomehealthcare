import { Link } from "react-router";
import { categories, servicesIn } from "@/data/services";
import { ServiceCard } from "@/components/Shared";
import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

/** Home page services overview: skilled nursing procedures + recovery programs, with core disciplines listed. */
export default function Services() {
  const nursing = servicesIn("nursing");
  const programs = servicesIn("programs");
  const core = servicesIn("core");

  return (
    <section id="services" aria-labelledby="services-title" className="bg-linen">
      <div className="container-royal section">
        <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-reveal className="eyebrow mb-5 text-gold-ink">
              What we offer
            </p>
            <h2 id="services-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
              Hospital-level skill, delivered with a neighbor's warmth.
            </h2>
          </div>
          <p data-reveal data-reveal-delay="0.12" className="text-lg leading-relaxed text-moss lg:col-span-4">
            From IV therapy to stroke recovery, every service is ordered by your physician and coordinated by one team.
          </p>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h3 id="cat-nursing" className="font-serif-display text-3xl font-semibold text-forest">
              {categories.nursing.label}
            </h3>
            <p className="max-w-md text-moss">{categories.nursing.blurb}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {nursing.map((s, i) => (
              <li key={s.slug} data-reveal data-reveal-delay={String((i % 3) * 0.06)}>
                <ServiceCard s={s} headingLevel={4} mobileCompact />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h3 id="cat-programs" className="font-serif-display text-3xl font-semibold text-forest">
              {categories.programs.label}
            </h3>
            <p className="max-w-md text-moss">{categories.programs.blurb}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((s, i) => (
              <li key={s.slug} data-reveal data-reveal-delay={String((i % 4) * 0.06)}>
                <ServiceCard s={s} headingLevel={4} mobileCompact />
              </li>
            ))}
            <li data-reveal data-reveal-delay="0.18" className="lg:col-span-2 xl:col-span-1">
              <div className="on-dark flex h-full flex-col justify-between rounded-2xl bg-forest p-6 text-cream sm:p-7">
                <div>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gold-light">
                    <Icon name="Phone" className="h-6 w-6" />
                  </span>
                  <h4 className="font-serif-display text-[1.6rem] font-semibold leading-tight">Not sure which program fits?</h4>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/90">
                    Tell us about the diagnosis or hospital stay. A registered nurse will help you sort out next steps.
                  </p>
                </div>
                <a href={site.phoneHref} className="btn btn-gold mt-6 !min-h-[2.75rem] text-sm">
                  Call {site.phone}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div data-reveal className="mt-14 rounded-3xl sm:mt-20 border border-forest/10 bg-white p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-12">
              <h3 className="font-serif-display text-3xl font-semibold text-forest">{categories.core.label}</h3>
              <p className="mt-2 text-moss">{categories.core.blurb}</p>
            </div>
            <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3 xl:grid-cols-4">
              {core.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group flex min-h-[3rem] items-center gap-3 rounded-xl px-2 font-semibold text-forest transition-colors hover:bg-forest/[0.05]"
                  >
                    <Icon name={s.icon} className="h-5 w-5 shrink-0 text-gold-ink" />
                    <span className="underline decoration-forest/25 underline-offset-4 group-hover:decoration-forest">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-reveal className="mt-12 text-center">
          <Link to="/services" className="btn btn-primary">
            View all services <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
