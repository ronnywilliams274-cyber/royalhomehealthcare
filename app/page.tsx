import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { StatusBadge } from "@/components/StatusBadge";
import { ReferralForm } from "@/components/ReferralForm";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Home Health Care in Van Nuys, CA | ${site.name}`,
  description:
    "Skilled nursing, home health aides, and coordinated therapy at home for patients under a physician's care. Serving Los Angeles, Ventura, San Bernardino, and Orange Counties.",
  alternates: { canonical: "/" },
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <li className="inline-flex items-center rounded-full border border-ink/15 bg-white px-4 py-2 text-base text-ink/80">
    {children}
  </li>
);

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="dusk-dawn px-5 pb-24 pt-44 text-ivory"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl">
          <StatusBadge />
          <h1
            id="hero-heading"
            className="mt-6 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-tight"
          >
            Care comes home.
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ivory/85">
            Skilled nursing, rehabilitation, and support at home for people
            under a physician&apos;s care. {site.tagline}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center rounded-full bg-gold-500 px-8 font-medium text-ink transition-colors hover:bg-gold-300"
            >
              Call {site.contact.phoneDisplay}
            </a>
            <a
              href="#referral"
              className="inline-flex min-h-12 items-center rounded-full border border-ivory/30 px-8 text-ivory transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              Request a referral
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY HOME CARE ── */}
      <section className="bg-ivory px-5 py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="why-heading"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-ink"
            >
              Why many families choose care at home
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.whyHomeCare.map((reason, i) => (
              <Reveal key={reason} delay={i * 80}>
                <li className="rounded-3xl border border-ink/10 bg-white p-6 text-ink/80 leading-relaxed">
                  {reason}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-ink/60">
              {site.whoQualifies}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="bg-dusk px-5 py-24 text-ivory"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="services-heading"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium"
            >
              Skilled home health services
            </h2>
            <p className="mt-3 max-w-2xl text-ivory/70">
              {site.serviceNote}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Direct services */}
            <Reveal>
              <div className="rounded-3xl border border-gold-300/20 bg-ink/60 p-8">
                <h3 className="font-display text-xl font-medium text-gold-300">
                  Provided directly by Royal
                </h3>
                <ul className="mt-6 space-y-4">
                  {site.services.direct.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-4 text-ivory/85 hover:text-gold-300 transition-colors"
                      >
                        <ServiceIcon name={s.slug} className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
                        <div>
                          <span className="font-medium">{s.title}</span>
                          <p className="mt-0.5 text-sm text-ivory/55 group-hover:text-ivory/70">
                            {s.short}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Coordinated services */}
            <Reveal delay={100}>
              <div className="rounded-3xl border border-ivory/10 bg-ink/40 p-8">
                <h3 className="font-display text-xl font-medium text-gold-300">
                  Coordinated by arrangement
                </h3>
                <ul className="mt-6 space-y-3">
                  {site.services.coordinated.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-ivory/75 hover:text-gold-300 transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Specialty programs */}
          <Reveal delay={150}>
            <div className="mt-8">
              <h3 className="font-display text-xl font-medium text-gold-300">
                Specialty nursing
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {site.services.specialNursing.map((s) => (
                  <Chip key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-ink/80 hover:text-gold-700">
                      {s.title}
                    </Link>
                  </Chip>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="font-display text-xl font-medium text-gold-300">
                Specialty therapy
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {site.services.specialTherapy.map((s) => (
                  <Chip key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-ink/80 hover:text-gold-700">
                      {s.title}
                    </Link>
                  </Chip>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CARE JOURNEY ── */}
      <section
        id="journey-heading"
        className="bg-ivory px-5 py-24"
        aria-labelledby="journey-heading-label"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="journey-heading-label"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-ink"
            >
              How care begins
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.journey.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <li className="rounded-3xl border border-ink/10 bg-white p-6">
                  <span
                    className="font-display text-5xl font-medium text-gold-500"
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-ink/70 leading-relaxed">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COVERAGE / WHO QUALIFIES ── */}
      <section className="bg-dusk px-5 py-24 text-ivory" aria-labelledby="coverage-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="coverage-heading"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium"
            >
              Medicare &amp; Medi-Cal home health
            </h2>
            <p className="mt-3 max-w-2xl text-ivory/70">{site.coverageNote}</p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.coverage.map((c) => (
              <li
                key={c}
                className="rounded-full border border-gold-300/30 bg-ink/40 px-5 py-2 text-ivory/85"
              >
                {c}
              </li>
            ))}
          </ul>
          <Reveal delay={100}>
            <p className="mt-8 max-w-2xl text-ivory/55">{site.whoQualifies}</p>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section
        id="area-heading"
        className="bg-ivory px-5 py-24"
        aria-labelledby="area-heading-label"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2
              id="area-heading-label"
              className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-ink"
            >
              Home health care across four counties
            </h2>
            <p className="mt-3 max-w-2xl text-ink/65">
              From our Van Nuys office, we coordinate skilled care throughout
              Los Angeles, Ventura, San Bernardino, and Orange Counties.
            </p>
          </Reveal>
          <ServiceAreaMap />
        </div>
      </section>

      {/* ── WHO CAN REFER ── */}
      <section className="bg-dusk px-5 py-24 text-ivory" aria-labelledby="refer-heading">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <h2
                id="refer-heading"
                className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium"
              >
                Who can refer?
              </h2>
              <ul className="mt-6 space-y-3">
                {site.whoCanRefer.map((r) => (
                  <li key={r} className="flex items-center gap-3 text-ivory/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shrink-0" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href="/for-physicians"
                className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ivory/30 px-6 text-ivory/85 transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                Information for referring physicians →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium">
                About Royal
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/75">
                {site.name} provides high-quality, safe, and cost-effective
                nursing, rehabilitation, and supportive services to homebound
                individuals — coordinated with your physician and delivered with
                compassion.
              </p>
              <p className="mt-4 text-ivory/55">
                {site.hours.onCallNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REFERRAL CTA ── */}
      <section
        id="referral"
        className="dusk-dawn px-5 py-24 text-ivory"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col justify-center gap-6">
              <h2
                id="cta-heading"
                className="font-display text-[clamp(2rem,5vw,3.8rem)] font-medium"
              >
                Let&apos;s bring care home.
              </h2>
              <p className="text-lg text-ivory/80">
                Call us, or send a request and we&apos;ll call you back.
              </p>
              <a
                href={site.contact.phoneHref}
                className="inline-flex min-h-12 w-fit items-center rounded-full bg-gold-500 px-8 font-medium text-ink transition-colors hover:bg-gold-300"
              >
                Call {site.contact.phoneDisplay}
              </a>
              <p className="text-ivory/50 text-sm">{site.hours.onCallNote}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ReferralForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
