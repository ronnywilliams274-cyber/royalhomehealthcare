import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Home Health Care in Van Nuys, CA`,
    template: `%s | ${site.name}`,
  },
  description:
    "Skilled nursing, home health aides, and coordinated therapy at home for patients under a physician's care. Serving Los Angeles, Ventura, San Bernardino, and Orange Counties.",
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.domain,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#171410" };

const ld = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness"],
  name: site.name,
  url: site.domain,
  telephone: site.contact.phoneHref,
  faxNumber: site.contact.fax,
  email: site.contact.email,
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
  areaServed: site.counties.map((c) => ({
    "@type": "AdministrativeArea",
    name: `${c.name}`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home health services",
    itemListElement: [
      ...site.services.direct,
      ...site.services.specialNursing,
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  );
}
