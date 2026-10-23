import { Link, useLocation } from "react-router";
import type { ReactNode } from "react";
import { getBreadcrumbs } from "@/routes";
import { site } from "@/data/site";
import type { Service } from "@/data/services";
import { Icon } from "@/components/Icon";

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs (WCAG 2.4.8 location; ARIA breadcrumb pattern)          */
/* ------------------------------------------------------------------ */
export function Breadcrumbs() {
  const { pathname } = useLocation();
  const trail = getBreadcrumbs(pathname);
  if (trail.length < 2) return null;
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cream/85">
          {trail.map((r, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={r.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-cream">
                    {r.name}
                  </span>
                ) : (
                  <>
                    <Link to={r.path} className="underline decoration-cream/40 underline-offset-4 hover:decoration-cream">
                      {r.name}
                    </Link>
                    <span aria-hidden="true" className="text-cream/60">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {site.siteUrl && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: r.name,
              item: `${site.siteUrl}${r.path === "/" ? "" : r.path}`,
            })),
          }}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Inner page hero                                                     */
/* ------------------------------------------------------------------ */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-forest-deep text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_0%,rgb(var(--gold-rgb)/0.24)_0%,transparent_55%),radial-gradient(70%_70%_at_0%_100%,rgb(var(--forest-rgb)/0.9)_0%,transparent_60%)]"
      />
      <div className="container-royal relative pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        <Breadcrumbs />
        <div className={`mt-8 grid gap-10 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow && <p className="eyebrow mb-5 text-gold-light">{eyebrow}</p>}
            <h1 className="h-display text-h1 text-cream">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 sm:text-xl">{intro}</div>}
            {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark = false,
  align = "split",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  align?: "split" | "stack";
}) {
  return (
    <div className={`mb-12 grid gap-5 lg:mb-16 ${align === "split" ? "lg:grid-cols-12 lg:gap-8" : "max-w-3xl"}`}>
      <p data-reveal className={`eyebrow ${dark ? "text-gold-light" : "text-gold-ink"} ${align === "split" ? "lg:col-span-3 lg:pt-4" : ""}`}>
        {eyebrow}
      </p>
      <div className={align === "split" ? "lg:col-span-9" : ""}>
        <h2 id={id} data-reveal data-reveal-delay="0.06" className={`h-display text-h2 ${dark ? "text-cream" : "text-forest"}`}>
          {title}
        </h2>
        {intro && (
          <div data-reveal data-reveal-delay="0.12" className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-cream/90" : "text-moss"}`}>
            {intro}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Service card - the whole card is one link with a clear name         */
/* ------------------------------------------------------------------ */
export function ServiceCard({
  s,
  headingLevel = 3,
  compact = false,
  mobileCompact = false,
}: {
  s: Service;
  headingLevel?: 2 | 3 | 4;
  compact?: boolean;
  /** On phones, show a slim one-line row (icon, name, arrow) instead of the full card. */
  mobileCompact?: boolean;
}) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const row = mobileCompact;
  return (
    <article
      className={`card group relative flex h-full overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-28px_rgb(var(--forest-ink-rgb)/0.38)] active:scale-[0.985] active:border-gold/50 ${
        row ? "flex-row items-center gap-4 p-4 sm:flex-col sm:items-stretch sm:gap-0 sm:p-7" : "flex-col p-6 sm:p-7"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,rgb(var(--gold-rgb)/0.16)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block"
      />
      <span
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-forest/[0.08] text-forest ring-1 ring-forest/10 transition-colors duration-300 group-hover:bg-forest group-hover:text-cream group-active:bg-forest group-active:text-cream ${
          row ? "h-11 w-11 sm:mb-5 sm:h-12 sm:w-12" : "mb-5 h-12 w-12"
        }`}
      >
        <Icon name={s.icon} className="h-6 w-6" />
      </span>
      <div className={row ? "min-w-0 flex-1 sm:flex sm:flex-1 sm:flex-col" : "flex flex-1 flex-col"}>
        <H className={`font-serif-display font-semibold leading-tight text-forest ${row ? "text-[1.35rem] sm:text-[1.6rem]" : "text-[1.6rem]"}`}>
          <Link
            to={`/services/${s.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-[3px] focus-visible:after:outline-[var(--ring-color)]"
          >
            {s.title}
          </Link>
        </H>
        {!compact && (
          <p className={`mt-3 flex-1 text-[0.98rem] leading-relaxed text-moss ${row ? "hidden sm:block" : ""}`}>{s.summary}</p>
        )}
        <span aria-hidden="true" className={`mt-5 items-center gap-1.5 text-sm font-semibold text-forest ${row ? "hidden sm:inline-flex" : "inline-flex"}`}>
          Learn more <Icon name="ArrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
        {s.byArrangement && (
          <span className={`mt-4 w-fit rounded-full border border-forest/20 bg-linen/60 px-3 py-1 text-xs font-medium text-moss ${row ? "hidden sm:inline-flex" : "inline-flex"}`}>
            Coordinated by arrangement
          </span>
        )}
      </div>
      {row && <Icon name="ArrowRight" className="h-5 w-5 shrink-0 text-gold-ink transition-transform group-active:translate-x-1 sm:hidden" />}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Call-to-action band                                                 */
/* ------------------------------------------------------------------ */
export function CtaBand({
  title = "Let's talk about care at home.",
  body = "Call us with questions, to make a referral, or to check whether you qualify. A real person answers during office hours, and a registered nurse is on call after hours.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-forest text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_0%,rgb(var(--gold-light-rgb)/0.25),transparent_60%)]" />
      <div className="container-royal relative grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-7">
          <h2 id="cta-title" data-reveal className="h-display text-h2">
            {title}
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
            {body}
          </p>
        </div>
        <div data-reveal data-reveal-delay="0.12" className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <a href={site.phoneHref} className="btn btn-gold">
            <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
          </a>
          <Link to="/contact" className="btn btn-outline-light">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ list - native <details>, keyboard and screen-reader friendly    */
/* ------------------------------------------------------------------ */
export function FaqList({ items }: { items: readonly { q: string; a: string; link?: { href: string; label: string } }[] }) {
  return (
    <div className="divide-y divide-forest/15 border-y border-forest/15">
      {items.map((f) => (
        <details key={f.q} className="faq group">
          <summary className="flex min-h-[3.5rem] items-center justify-between gap-6 py-5 text-left">
            <span className="font-serif-display text-xl font-semibold leading-snug text-forest sm:text-2xl">{f.q}</span>
            <span
              aria-hidden="true"
              className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest transition-transform duration-300 group-open:bg-forest group-open:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="prose-royal max-w-3xl pb-6 pr-12 text-[1.02rem] leading-relaxed text-charcoal/90">
            <p>{f.a}</p>
            {f.link && (
              <p className="mt-3">
                <Link to={f.link.href} className="font-semibold text-forest">
                  {f.link.label}
                </Link>
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Check list                                                          */
/* ------------------------------------------------------------------ */
export function CheckList({ items, dark = false, cols = 1 }: { items: readonly string[]; dark?: boolean; cols?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3.5 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed">
          <span
            aria-hidden="true"
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dark ? "bg-gold-light/20 text-gold-light" : "bg-forest text-cream"}`}
          >
            <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-cream/95" : "text-charcoal/90"}>{t}</span>
        </li>
      ))}
    </ul>
  );
}
