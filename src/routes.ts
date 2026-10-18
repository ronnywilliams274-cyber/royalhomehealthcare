/**
 * Page registry - titles, descriptions and URLs for every page.
 * Used by the app (document titles), the prerender script (static HTML <head>)
 * and sitemap.xml generation.
 */
import { services, categories } from "@/data/services";
import { site } from "@/data/site";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Short name used in breadcrumbs and the HTML sitemap. */
  name: string;
  /** Parent path for breadcrumbs. */
  parent?: string;
  /** Exclude from sitemap.xml (e.g. 404). */
  noindex?: boolean;
}

const brand = site.shortName;

export const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    name: "Home",
    title: `${site.name} | Medicare-Certified Home Health in Van Nuys, CA`,
    description:
      "Medicare-certified home health care in Los Angeles, Ventura, San Bernardino and Orange Counties: skilled nursing, wound care, IV therapy, injections and recovery programs at home.",
  },
  {
    path: "/services",
    name: "Services",
    parent: "/",
    title: `Home Health Services | ${brand}`,
    description: `Explore all home health services from ${site.name}: ${categories.nursing.label.toLowerCase()}, ${categories.programs.label.toLowerCase()} and home health disciplines.`,
  },
  {
    path: "/medicare-certified",
    name: "Medicare-Certified Care",
    parent: "/",
    title: `Medicare-Certified Home Health Care | ${brand}`,
    description:
      "Royal Home Health Care is a Medicare-certified home health agency. Learn who qualifies, what Medicare covers, what you pay ($0 for covered services) and your rights.",
  },
  {
    path: "/faq",
    name: "FAQs",
    parent: "/",
    title: `Frequently Asked Questions | ${brand}`,
    description:
      "Answers about home health eligibility, Medicare coverage, homebound status, our services, visit schedules, emergencies and your rights as a patient.",
  },
  {
    path: "/about",
    name: "About Us",
    parent: "/",
    title: `About Us | ${brand}`,
    description:
      "Royal Home Health Care, Inc. is a licensed, Medicare-certified home health agency in Van Nuys, CA, committed to our patients and their families.",
  },
  {
    path: "/service-areas",
    name: "Service Areas",
    parent: "/",
    title: `Service Areas: Los Angeles, Ventura, San Bernardino & Orange Counties | ${brand}`,
    description:
      "Home health care across Los Angeles, Ventura, San Bernardino and Orange Counties, coordinated from our Van Nuys office. Call to confirm coverage for your address.",
  },
  {
    path: "/referrals",
    name: "Referrals",
    parent: "/",
    title: `Referrals for Physicians, Hospitals & Families | ${brand}`,
    description: `Refer a patient to ${site.name}. Fax orders to ${site.fax} or call ${site.phone}. Physician-directed home health across four Southern California counties.`,
  },
  {
    path: "/contact",
    name: "Contact",
    parent: "/",
    title: `Contact Us | ${brand}`,
    description: `Call ${site.phone}, fax ${site.fax} or send us a message. Office hours ${site.hours.label}; an on-call nurse is available by phone after hours.`,
  },
  {
    path: "/accessibility",
    name: "Accessibility",
    parent: "/",
    title: `Accessibility Statement | ${brand}`,
    description:
      "Our commitment to digital accessibility: this website aims to conform to WCAG 2.1 Level AA. Learn about the features we provide and how to request help.",
  },
  {
    path: "/nondiscrimination",
    name: "Nondiscrimination & Patient Rights",
    parent: "/",
    title: `Nondiscrimination Notice & Complaints | ${brand}`,
    description:
      "Nondiscrimination statement, language and disability assistance, and how to file a complaint with Royal Home Health Care or state and federal agencies.",
  },
  {
    path: "/sitemap",
    name: "Site Map",
    parent: "/",
    title: `Site Map | ${brand}`,
    description: "A list of every page on the Royal Home Health Care website.",
  },
];

export const serviceRoutes: RouteMeta[] = services.map((s) => ({
  path: `/services/${s.slug}`,
  name: s.title,
  parent: "/services",
  title: `${s.title} at Home | ${brand}`,
  description: s.metaDescription,
}));

export const notFoundRoute: RouteMeta = {
  path: "/404",
  name: "Page not found",
  parent: "/",
  title: `Page Not Found | ${brand}`,
  description: "The page you're looking for couldn't be found.",
  noindex: true,
};

export const allRoutes: RouteMeta[] = [...staticRoutes, ...serviceRoutes];

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function getRouteMeta(pathname: string): RouteMeta {
  const p = normalize(pathname);
  return allRoutes.find((r) => r.path === p) ?? notFoundRoute;
}

export function getBreadcrumbs(pathname: string): RouteMeta[] {
  const trail: RouteMeta[] = [];
  let current: RouteMeta | undefined = getRouteMeta(pathname);
  while (current) {
    trail.unshift(current);
    current = current.parent ? allRoutes.find((r) => r.path === current!.parent) : undefined;
  }
  return trail;
}
