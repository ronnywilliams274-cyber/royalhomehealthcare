import type { Metadata } from "next";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Compliance & Nondiscrimination",
  description: `Nondiscrimination statement and complaint information for ${site.name}.`,
  alternates: { canonical: `${site.domain}/compliance` },
};

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-36">
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-tight text-ink">
          Compliance & nondiscrimination
        </h1>

        <section className="mt-10" aria-labelledby="nondiscrimination">
          <h2 id="nondiscrimination" className="font-display text-2xl font-medium text-ink">
            Nondiscrimination statement
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">{site.compliance.statement}</p>
        </section>

        <section className="mt-12" aria-labelledby="complaints">
          <h2 id="complaints" className="font-display text-2xl font-medium text-ink">
            Filing a complaint
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">
            If you believe you have experienced discrimination, you may contact
            the California Department of Public Health:
          </p>
          <address className="not-italic mt-4 rounded-2xl border border-ink/10 bg-white p-6 text-ink/80">
            {site.compliance.cdph.label}
            <br />
            Phone: {site.compliance.cdph.phone}
            <br />
            Toll-free: {site.compliance.cdph.tollFree}
            <br />
            Fax: {site.compliance.cdph.fax}
            <br />
            <a
              href={`https://${site.compliance.cdph.website}`}
              className="text-gold-700 underline underline-offset-4"
            >
              {site.compliance.cdph.website}
            </a>
          </address>
        </section>
      </main>
      <Footer />
    </>
  );
}
