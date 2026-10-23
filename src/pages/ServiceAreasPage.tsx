import { site } from "@/data/site";
import { PageHero, CtaBand, CheckList } from "@/components/Shared";
import { Icon } from "@/components/Icon";

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title="Home health care across four Southern California counties."
        intro={
          <p>
            All of our care is coordinated from our Van Nuys office in the San Fernando Valley. Because availability for a specific street address depends on our clinicians' schedules, give us a quick call and we will confirm right away.
          </p>
        }
      >
        <a href={site.phoneHref} className="btn btn-gold">
          <Icon name="Phone" className="h-4 w-4" /> Confirm my address: {site.phone}
        </a>
      </PageHero>

      <section aria-labelledby="counties-title" className="bg-cream">
        <div className="container-royal py-20 lg:py-28">
          <h2 id="counties-title" className="sr-only">
            Counties we serve
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {site.counties.map((c, i) => (
              <li key={c.slug} id={c.slug} data-reveal data-reveal-delay={String((i % 2) * 0.06)} className="card flex flex-col p-8 sm:p-10">
                <span aria-hidden="true" className="font-serif-display text-xl text-gold-ink">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif-display text-4xl font-medium text-forest">{c.name}</h3>
                <p className="mt-3 leading-relaxed text-moss">{c.note}</p>
                <div className="mt-6 border-t border-forest/10 pt-6">
                  <CheckList
                    items={[
                      "Skilled nursing, wound care, IV therapy, and injections",
                      "Personalized recovery programs after hospital stays and surgery",
                      "Certified home health aides, plus therapy coordinated by arrangement",
                      "A registered nurse on call by phone after office hours",
                    ]}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="office-title" className="bg-linen">
        <div className="container-royal grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5 text-gold-ink">Our office</p>
            <h2 id="office-title" className="h-display text-h2 text-forest">
              Based in the San Fernando Valley.
            </h2>
            <address className="mt-6 text-lg not-italic leading-relaxed text-charcoal">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
            <p className="mt-4 text-moss">{site.hours.label}</p>
            <p className="mt-6">
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Get directions <span className="sr-only">(opens Google Maps in a new tab)</span>
                <Icon name="ExternalLink" className="h-4 w-4" />
              </a>
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="card p-8">
              <h3 className="font-serif-display text-2xl font-semibold text-forest">Not sure if we cover your neighborhood?</h3>
              <p className="mt-3 leading-relaxed text-moss">
                Give us a call with your ZIP code and the care you are looking for. We will let you know right away if our nurses serve your neighborhood, and if you are outside our range, we will gladly help point you in the right direction.
              </p>
              <a href={site.phoneHref} className="btn btn-primary mt-6">
                <Icon name="Phone" className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
