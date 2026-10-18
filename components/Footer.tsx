import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-dusk pb-28 text-ivory md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-xl font-medium text-gold-300">{site.name}</h2>
          <p className="mt-3 text-ivory/75">{site.tagline}.</p>
          <p className="mt-1 text-ivory/75">{site.taglineAlt}.</p>
        </div>

        <address className="not-italic">
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold-300">Contact</h3>
          <p className="mt-3 text-ivory/85">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p className="mt-3">
            <a href={site.contact.phoneHref} className="text-ivory underline-offset-4 hover:text-gold-300 hover:underline">
              {site.contact.phoneDisplay}
            </a>
            <br />
            <span className="text-ivory/70">Fax: {site.contact.fax}</span>
            <br />
            <a href={`mailto:${site.contact.email}`} className="text-ivory underline-offset-4 hover:text-gold-300 hover:underline">
              {site.contact.email}
            </a>
          </p>
        </address>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold-300">Hours</h3>
          <p className="mt-3 text-ivory/85">{site.hours.label}</p>
          <p className="mt-2 text-ivory/65">{site.hours.onCallNote}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold-300">Explore</h3>
          <ul className="mt-3 space-y-2">
            {[
              ["Services", "/#services"],
              ["Care Journey", "/#journey-heading"],
              ["For Physicians", "/for-physicians"],
              ["Service Areas", "/#area-heading"],
              ["Contact", "/contact"],
              ["Compliance", "/compliance"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-ivory/85 underline-offset-4 hover:text-gold-300 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ivory/60">
          <p>{site.compliance.statement}</p>
          <p className="mt-4">
            {site.compliance.cdph.label}: {site.compliance.cdph.phone} (toll-free{" "}
            {site.compliance.cdph.tollFree}, fax {site.compliance.cdph.fax}) ·{" "}
            <a
              href={`https://${site.compliance.cdph.website}`}
              className="underline underline-offset-4 hover:text-gold-300"
            >
              {site.compliance.cdph.website}
            </a>
            .
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
