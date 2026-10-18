import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllServices } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/for-physicians", "/contact", "/compliance"];
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.domain}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getAllServices().map((s) => ({
      url: `${site.domain}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...site.counties.map((c) => ({
      url: `${site.domain}/areas/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
