import { Link } from "react-router";
import { site } from "@/data/site";
import { servicesIn } from "@/data/services";
import { Icon } from "@/components/Icon";
import { setUserMotionOff, useUserMotionOff } from "@/hooks/useMotion";

const company = [
  { label: "About us", to: "/about" },
  { label: "Service areas", to: "/service-areas" },
  { label: "Referrals", to: "/referrals" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const legal = [
  { label: "Accessibility", to: "/accessibility" },
  { label: "Nondiscrimination & patient rights", to: "/nondiscrimination" },
  { label: "Site map", to: "/sitemap" },
];

export default function Footer() {
  const motionOff = useUserMotionOff();
  return (
    <footer className="on-dark bg-forest-ink pb-28 text-cream md:pb-10">
      <div className="container-royal border-t border-white/10 pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label={`${site.shortName} home`}>
              <span aria-hidden="true" className="font-serif-display text-2xl font-medium">
                {site.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-cream/85">
              Licensed home health care for families across Southern California. {site.tagline}.
            </p>
            <address className="mt-6 space-y-2 not-italic text-cream/90">
              <p>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
                  <Icon name="Phone" className="h-4 w-4 text-gold-light" />
                  {site.phone}
                </a>
              </p>
              <p className="inline-flex items-center gap-2">
                <Icon name="Printer" className="h-4 w-4 text-gold-light" />
                Fax {site.fax}
              </p>
              <p>
                <a href={site.emailHref} className="inline-flex items-center gap-2 break-all underline-offset-4 hover:underline">
                  <Icon name="Mail" className="h-4 w-4 shrink-0 text-gold-light" />
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Skilled nursing services" className="lg:col-span-2">
            <h2 className="eyebrow mb-5 text-gold-light">Skilled nursing</h2>
            <ul className="space-y-1">
              {servicesIn("nursing").map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="inline-block py-1.5 text-cream/90 underline-offset-4 hover:text-white hover:underline">
                    {s.navTitle ?? s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Care programs" className="lg:col-span-3">
            <h2 className="eyebrow mb-5 text-gold-light">Care programs</h2>
            <ul className="space-y-1">
              {servicesIn("programs").map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="inline-block py-1.5 text-cream/90 underline-offset-4 hover:text-white hover:underline">
                    {s.navTitle ?? s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="eyebrow mb-5 text-gold-light">Company</h2>
            <ul className="space-y-1">
              {company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1.5 text-cream/90 underline-offset-4 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-relaxed text-cream/85 lg:grid-cols-12 lg:items-center">
          <p className="lg:col-span-8">
            <strong className="text-cream">In an emergency, call 911.</strong> Office hours: {site.hours.label}. {site.hours.onCall}
            {site.licenseNumber && <> California license #{site.licenseNumber}.</>}
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
            <button
              type="button"
              onClick={() => setUserMotionOff(!motionOff)}
              aria-pressed={motionOff}
              className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-white/25 px-4 font-medium text-cream hover:bg-white/10"
            >
              <Icon name={motionOff ? "Play" : "Pause"} className="h-4 w-4" />
              Reduce motion
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-cream/80 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block py-1.5 underline underline-offset-4 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
