import Hero from "@/sections/Hero";
import TrustBar from "@/sections/TrustBar";
import Stats from "@/sections/Stats";
import About from "@/sections/About";
import Services from "@/sections/Services";
import MedicareBand from "@/sections/MedicareBand";
import Process from "@/sections/Process";
import WhyHome from "@/sections/WhyHome";
import Areas from "@/sections/Areas";
import FaqPreview from "@/sections/FaqPreview";
import Contact from "@/sections/Contact";
import { JsonLd } from "@/components/Shared";
import { site } from "@/data/site";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Stats />
      <Services />
      <MedicareBand />
      <Process />
      <WhyHome />
      <Areas />
      <FaqPreview />
      <Contact />
      <JsonLd data={organizationSchema()} />
    </>
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    name: site.name,
    ...(site.siteUrl ? { url: site.siteUrl, image: `${site.siteUrl}/media/hero-poster-desktop.jpg` } : {}),
    telephone: "+1-818-630-5702",
    faxNumber: "+1-818-235-0155",
    email: site.email,
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
    ],
    areaServed: site.counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c.name}, California` })),
    paymentAccepted: site.coverage.map((c) => c.name).join(", "),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home health services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      })),
    },
  };
}
