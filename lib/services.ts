import { site } from "@/content/site";

const ALL = [
  ...site.services.direct,
  ...site.services.coordinated,
  ...site.services.specialNursing,
  ...site.services.specialTherapy,
].map((s) => {
  const isDirect = site.services.direct.some((d) => d.slug === s.slug);
  const isCoordinated = site.services.coordinated.some((c) => c.slug === s.slug);
  const group = isDirect
    ? "Provided directly by Royal"
    : isCoordinated
      ? "Coordinated by arrangement"
      : "Specialty program";
  const base =
    site.services.direct.find((d) => d.slug === s.slug) ??
    site.services.coordinated.find((c) => c.slug === s.slug);
  return {
    slug: s.slug,
    title: s.title,
    group,
    short: "short" in s ? s.short : s.title,
    body: "body" in s ? s.body : `${s.title}, delivered as part of your physician-directed plan of care at home. Contact us to learn whether this service fits your needs.`,
  };
});

export function getService(slug: string) {
  return ALL.find((s) => s.slug === slug) ?? null;
}

export function getAllServices() {
  return ALL;
}
