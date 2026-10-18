import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getService } from "@/lib/services";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} at Home | Van Nuys & Los Angeles`,
    description: service.short,
    alternates: { canonical: `${site.domain}/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-36">
        <p className="text-sm uppercase tracking-[0.25em] text-gold-700">{service.group}</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight text-ink">
          {service.title} at home
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">{service.body}</p>

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

        <p className="mt-10 rounded-2xl border border-ink/10 bg-white p-5 text-ink/65">
          Serving {site.counties.map((c) => c.name).join(", ")}.{" "}
          {site.coverageNote}
        </p>

        <p className="mt-8">
          <Link href="/#services" className="font-medium text-gold-700 underline underline-offset-4">
            ← Back to all services
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
