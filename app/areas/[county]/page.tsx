import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return site.counties.map((c) => ({ county: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county } = await params;
  const area = site.counties.find((c) => c.slug === county);
  if (!area) return {};
  return {
    title: `Home Health Care in ${area.name}`,
    description: `Skilled nursing and home health aide services in ${area.name}, coordinated from our Van Nuys office. Medicare and Medi-Cal accepted. Call ${site.contact.phoneDisplay}.`,
    alternates: { canonical: `${site.domain}/areas/${area.slug}` },
  };
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county } = await params;
  const area = site.counties.find((c) => c.slug === county);
  if (!area) notFound();

  const others = site.counties.filter((c) => c.slug !== area.slug);

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-36">
        <p className="text-sm uppercase tracking-[0.25em] text-gold-700">Service area</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight text-ink">
          Home health care in {area.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          {site.name} provides skilled nursing and home health aide services to
          homebound patients in {area.name}, coordinated from our Van Nuys
          office at {site.address.street}. All care is directed by your
          physician and planned with your family.
        </p>

        <ul className="mt-8 list-disc space-y-2 pl-6 text-ink/75">
          <li>Skilled nursing and home health aides, provided directly.</li>
          <li>Physical, occupational, and speech therapy coordinated by arrangement.</li>
          <li>Specialty nursing including wound care and enterostomal care.</li>
          <li>Medicare, Medi-Cal, and other coverage options — call to verify eligibility.</li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.contact.phoneHref}
            className="inline-flex min-h-12 items-center rounded-full bg-gold-500 px-8 font-medium text-ink transition-colors hover:bg-gold-300"
          >
            Call {site.contact.phoneDisplay}
          </a>
          <Link
            href="/#referral"
            className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-8 text-ink transition-colors hover:border-gold-700"
          >
            Request a referral
          </Link>
        </div>

        <p className="mt-10 text-ink/65">
          We also serve{" "}
          {others.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/areas/${c.slug}`} className="text-gold-700 underline underline-offset-4">
                {c.name}
              </Link>
              {i < others.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </main>
      <Footer />
    </>
  );
}
