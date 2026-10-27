import { Link } from "react-router";
import { staticRoutes } from "@/routes";
import { categories, servicesIn, type ServiceCategory } from "@/data/services";
import { PageHero } from "@/components/Shared";

/** HTML site map - a second way to find every page (WCAG 2.4.5 Multiple Ways). */
export default function SitemapPage() {
  const cats: ServiceCategory[] = ["nursing", "programs", "core"];
  return (
    <>
      <PageHero eyebrow="Site map" title="Every page on our website." />
      <div className="bg-cream">
        <div className="container-royal grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
          <section aria-labelledby="sm-main">
            <h2 id="sm-main" className="font-serif-display text-2xl font-semibold text-forest">
              Main pages
            </h2>
            <ul className="mt-4 space-y-1">
              {staticRoutes.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="inline-block py-1 text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {cats.map((c) => (
            <section key={c} aria-labelledby={`sm-${c}`}>
              <h2 id={`sm-${c}`} className="font-serif-display text-2xl font-semibold text-forest">
                {categories[c].label}
              </h2>
              <ul className="mt-4 space-y-1">
                {servicesIn(c).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="inline-block py-1 text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
