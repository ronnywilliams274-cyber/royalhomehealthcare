import { Link } from "react-router";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";

export default function Areas() {
  return (
    <section id="service-areas" aria-labelledby="areas-title" className="bg-cream">
      <div className="container-royal section grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow mb-5 text-gold-ink">
            Where we serve
          </p>
          <h2 id="areas-title" data-reveal data-reveal-delay="0.06" className="h-display text-h2 text-forest">
            Four counties, one caring team.
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-6 max-w-md text-lg leading-relaxed text-moss">
            Care is coordinated from our office at {site.address.street}, {site.address.city}. Call us to confirm
            we serve your address.
          </p>
          <p data-reveal className="mt-8">
            <Link to="/service-areas" className="link-arrow">
              See our service areas <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </p>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {site.counties.map((c, i) => (
            <li
              key={c.slug}
              data-reveal
              data-reveal-delay={String(i * 0.06)}
              className="group flex items-baseline justify-between gap-4 border-b border-forest/15 py-6 first:border-t"
            >
              <span className="font-serif-display text-3xl font-medium text-forest transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                {c.name}
              </span>
              <span aria-hidden="true" className="text-sm tracking-[0.2em] text-moss">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
