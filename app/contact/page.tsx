import type { Metadata } from "next";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReferralForm } from "@/components/ReferralForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}. ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}. Phone ${site.contact.phoneDisplay}, fax ${site.contact.fax}. ${site.hours.label}. On-call RN after hours.`,
  alternates: { canonical: `${site.domain}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-4xl px-5 pb-24 pt-36">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-tight text-ink">
          Contact us
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">
          One call is all it takes to start. {site.taglineAlt}.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <address className="not-italic rounded-3xl bg-ink p-8 text-ivory">
            <h2 className="text-sm uppercase tracking-[0.2em] text-gold-300">Office</h2>
            <p className="mt-4 text-ivory/85">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p className="mt-4">
              <a href={site.contact.phoneHref} className="text-lg font-medium text-gold-300 underline-offset-4 hover:underline">
                {site.contact.phoneDisplay}
              </a>
              <br />
              <span className="text-ivory/70">Fax: {site.contact.fax}</span>
              <br />
              <a href={`mailto:${site.contact.email}`} className="text-ivory/85 underline-offset-4 hover:text-gold-300 hover:underline">
                {site.contact.email}
              </a>
            </p>
            <h3 className="mt-8 text-sm uppercase tracking-[0.2em] text-gold-300">Hours</h3>
            <p className="mt-3 text-ivory/85">{site.hours.label}</p>
            <p className="mt-2 text-ivory/65">{site.hours.onCallNote}</p>
          </address>

          <ReferralForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
