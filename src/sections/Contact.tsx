import { site, fullAddress } from "@/data/site";
import { media, webpSrcSet } from "@/config/media";
import ContactForm from "@/components/ContactForm";
import { Icon } from "@/components/Icon";

/** Contact band used on the home page. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark relative overflow-hidden bg-forest-ink text-cream">
      {/* Decorative texture: desktop only (on phones it is barely visible, so it isn't downloaded) */}
      <picture>
        <source type="image/webp" srcSet={webpSrcSet(media.cta)} sizes="100vw" />
        <img src={media.cta} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 hidden h-full w-full object-cover opacity-30 md:block" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--forest-ink-rgb)/0.86)_0%,rgb(var(--forest-deep-rgb)/0.92)_100%)]" />

      <div className="container-royal section relative grid gap-12 sm:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow mb-5 text-gold-light">
            Get in touch
          </p>
          <h2 id="contact-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2">
            We're here whenever you're ready.
          </h2>
          <p data-reveal data-reveal-delay="0.12" className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
            Whether you have a quick question about our services, want to send a referral, or just need to talk through what is going on with a loved one, give us a call. A real person answers our phone, and we usually get back to messages the same business day.
          </p>
          <ContactDetails />
        </div>
        <div data-reveal data-reveal-delay="0.15" className="rounded-3xl border border-white/15 bg-forest-ink/60 p-5 sm:p-10 lg:col-span-6 lg:col-start-7">
          <ContactForm tone="dark" />
        </div>
      </div>
    </section>
  );
}

export function ContactDetails({ dark = true }: { dark?: boolean }) {
  const row = `flex gap-4 border-b py-5 ${dark ? "border-white/10" : "border-forest/10"}`;
  const dt = `w-20 shrink-0 pt-1 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-cream/80" : "text-moss"}`;
  const val = dark ? "text-cream" : "text-charcoal";
  return (
    <dl className="mt-10">
      <div className={row}>
        <dt className={dt}>Phone</dt>
        <dd>
          <a href={site.phoneHref} className={`font-serif-display text-3xl font-medium underline-offset-4 hover:underline ${val}`}>
            {site.phone}
          </a>
        </dd>
      </div>
      <div className={row}>
        <dt className={dt}>Fax</dt>
        <dd className={`text-lg ${val}`}>{site.fax}</dd>
      </div>
      <div className={row}>
        <dt className={dt}>Email</dt>
        <dd>
          <a href={site.emailHref} className={`text-lg underline underline-offset-4 [overflow-wrap:anywhere] ${val}`}>
            {site.email.split("@")[0]}
            <wbr />@{site.email.split("@")[1]}
          </a>
        </dd>
      </div>
      <div className={row}>
        <dt className={dt}>Office</dt>
        <dd className={`text-lg leading-relaxed ${val}`}>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-flex items-center gap-1 text-[0.95rem] underline underline-offset-4 ${dark ? "text-gold-light" : "text-forest"}`}>
            Get directions<span className="sr-only"> to {fullAddress} (opens in a new tab)</span>
            <Icon name="ExternalLink" className="h-3.5 w-3.5" />
          </a>
        </dd>
      </div>
      <div className={row}>
        <dt className={dt}>Hours</dt>
        <dd className={`text-lg leading-relaxed ${val}`}>
          {site.hours.label}
          <span className={`mt-1 block text-[0.95rem] ${dark ? "text-cream/85" : "text-moss"}`}>{site.hours.onCall}</span>
        </dd>
      </div>
    </dl>
  );
}
