import { site } from "@/data/site";
import { PageHero } from "@/components/Shared";

export default function NondiscriminationPage() {
  const c = site.compliance;
  return (
    <>
      <PageHero
        eyebrow="Patient rights"
        title="Nondiscrimination notice & how to file a complaint."
        intro={<p>Everyone deserves equal, respectful access to care. Below is our commitment to your rights and who to reach out to if you ever have a concern.</p>}
      />

      <div className="bg-cream">
        <div className="container-royal py-20 lg:py-24">
          <div className="prose-royal max-w-4xl space-y-14">
          <section aria-labelledby="nd-title">
            <h2 id="nd-title" className="h-display text-h3 text-forest">
              Nondiscrimination statement
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">{c.statement}</p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">{c.laws}</p>
          </section>

          <section aria-labelledby="aid-title">
            <h2 id="aid-title" className="h-display text-h3 text-forest">
              Free communication help
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
              If you have a disability or prefer speaking a language other than English, please let us know how we can communicate with you best, such as large-print materials, help filling out forms, or language assistance. Call{" "}
              <a href={site.phoneHref}>{site.phone}</a>. If you are deaf, hard of hearing, or have a speech disability, you can reach us through the California Relay Service by dialing 711.
            </p>
          </section>

          <section aria-labelledby="complaint-title">
            <h2 id="complaint-title" className="h-display text-h3 text-forest">
              How to file a complaint
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
              We want to make things right. Please start by calling our office at <a href={site.phoneHref}>{site.phone}</a> and
              asking for the administrator, or write to us at {site.address.street}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}. You will not be treated differently for filing a complaint. You may also contact:
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-forest/10 bg-white p-6">
                <h3 className="font-serif-display text-2xl font-semibold text-forest">{c.cdph.label}</h3>
                <ul className="mt-4 space-y-1.5 text-charcoal/90">
                  <li>Phone: {c.cdph.phone}</li>
                  <li>Toll-free: {c.cdph.tollFree}</li>
                  <li>Fax: {c.cdph.fax}</li>
                  <li>
                    <a href={c.cdph.href} target="_blank" rel="noopener noreferrer">
                      File a complaint online<span className="sr-only"> with CDPH (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6">
                <h3 className="font-serif-display text-2xl font-semibold text-forest">{c.hhsOcr.label}</h3>
                <p className="mt-2 text-sm text-moss">For complaints about discrimination</p>
                <ul className="mt-4 space-y-1.5 text-charcoal/90">
                  <li>Phone: {c.hhsOcr.phone}</li>
                  <li>TDD: {c.hhsOcr.tdd}</li>
                  <li>
                    <a href={c.hhsOcr.href} target="_blank" rel="noopener noreferrer">
                      OCR Complaint Portal<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6 md:col-span-2">
                <h3 className="font-serif-display text-2xl font-semibold text-forest">Medicare</h3>
                <p className="mt-3 text-charcoal/90">
                  {c.medicareLine.phone}, TTY {c.medicareLine.tty}
                </p>
              </div>
            </div>
          </section>
          </div>
        </div>
      </div>
    </>
  );
}
