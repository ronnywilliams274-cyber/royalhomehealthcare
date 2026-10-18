/**
 * SINGLE SOURCE OF TRUTH for agency facts, contact details and compliance text.
 * Edit facts here only — every page reads from this file.
 *
 * Fields set to `null` or "" are hidden on the site until you fill them in.
 * Never add staff names, statistics, awards or testimonials that are not real.
 */

export const site = {
  name: "Royal Home Health Care, Inc.",
  shortName: "Royal Home Health Care",
  tagline: "Committed to our patients and their families",
  taglineAlt: "Quality care by compassionate hearts",

  /**
   * Your live domain, e.g. "https://www.yourdomain.com" (no trailing slash).
   * Used for canonical URLs, social previews and sitemap.xml. Leave "" until known —
   * the build skips those tags rather than pointing them at the wrong domain.
   * You can also set it at build time:  SITE_URL=https://www.yourdomain.com npm run build
   */
  siteUrl: "",

  phone: "(818) 630-5702",
  phoneHref: "tel:+18186305702",
  fax: "(818) 235-0155",
  email: "royalhomehealthinc@gmail.com",
  emailHref: "mailto:royalhomehealthinc@gmail.com",

  address: {
    street: "14328 Victory Blvd., Suite 203",
    city: "Van Nuys",
    state: "CA",
    zip: "91401",
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=14328+Victory+Blvd+Suite+203+Van+Nuys+CA+91401",

  hours: {
    label: "Monday – Friday, 9:00 AM – 5:30 PM",
    short: "Mon–Fri 9:00–5:30",
    onCall:
      "A registered nurse is on call by phone after office hours, on weekends and on holidays.",
  },

  /** Medicare certification. Add your CMS Certification Number (CCN) to display it. */
  medicare: {
    certified: true,
    ccn: null as string | null,
  },
  /** California license number (shown in the footer and compliance page when set). */
  licenseNumber: null as string | null,

  counties: [
    { slug: "los-angeles", name: "Los Angeles County", note: "Including the San Fernando Valley, where our Van Nuys office is based." },
    { slug: "ventura", name: "Ventura County", note: "Coordinated from our Van Nuys office." },
    { slug: "san-bernardino", name: "San Bernardino County", note: "Coordinated from our Van Nuys office." },
    { slug: "orange", name: "Orange County", note: "Coordinated from our Van Nuys office." },
  ],

  coverage: [
    { name: "Medicare", note: "Covered home health services at $0 to eligible patients" },
    { name: "Medi-Cal", note: "For eligible members" },
    { name: "Private insurance", note: "Some plans — we verify your benefits" },
    { name: "Workers' compensation", note: "With an authorized claim" },
    { name: "Regional centers", note: "For eligible clients" },
    { name: "Private pay", note: "Ask us about options" },
  ],
  coverageNote: "Coverage depends on eligibility and your plan. Call us and we'll verify your benefits before care begins.",

  whoCanRefer: [
    "You or a family member",
    "A friend or neighbor",
    "Your physician or nurse practitioner",
    "A hospital, skilled nursing facility, clinic or social service agency",
  ],

  whyHome: [
    { title: "Familiar surroundings", body: "Care happens among family and the things you love — and your family can take part." },
    { title: "Physician-directed", body: "Every service follows a plan of care developed with, and signed by, your physician." },
    { title: "A safer transition", body: "Home health is a bridge between the hospital and independent living." },
    { title: "Lower costs", body: "Care at home can support earlier hospital discharges and lower overall health care costs." },
  ],

  compliance: {
    /** The agency's own nondiscrimination statement (from its printed materials). Have counsel
     *  review it against the current HHS Section 1557 notice requirements. */
    statement:
      "Royal Home Health Care, Inc. complies with applicable civil rights laws and does not discriminate on the basis of race, color, disability, age, religion, pregnancy, childbirth, national origin, or sexual orientation in the provision of services or employment.",
    laws:
      "This includes obligations under Title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973, and the Age Discrimination Act of 1975.",
    /**
     * State complaint contacts. These numbers come from the agency's printed materials.
     * VERIFY with the California Department of Public Health before launch.
     */
    cdph: {
      label: "California Department of Public Health, Licensing & Certification",
      phone: "(818) 901-4375",
      tollFree: "(800) 228-1019",
      fax: "(562) 409-5096",
      href: "https://www.cdph.ca.gov/Programs/CHCQ/LCP/Pages/FileAComplaint.aspx",
    },
    hhsOcr: {
      label: "U.S. Department of Health and Human Services, Office for Civil Rights",
      phone: "1-800-368-1019",
      tdd: "1-800-537-7697",
      href: "https://ocrportal.hhs.gov/ocr/portal/lobby.jsf",
    },
    medicareLine: {
      phone: "1-800-MEDICARE (1-800-633-4227)",
      tty: "1-877-486-2048",
    },
  },

  formNotice:
    "Please don't include detailed medical information in this form. For referrals and medical records, call or fax us.",

  /** Optional: an HTTPS endpoint (Formspree, Basin, your CRM…) that accepts form POSTs.
   *  Set VITE_FORM_ENDPOINT in a .env file. Without it, the form opens the visitor's email app. */
  formEndpointEnvVar: "VITE_FORM_ENDPOINT",

  /** Date of the most recent accessibility review (shown on the Accessibility page). */
  accessibilityReviewed: "October 2026",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
