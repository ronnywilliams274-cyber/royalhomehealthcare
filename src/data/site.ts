/**
 * SINGLE SOURCE OF TRUTH for agency facts, contact details and compliance text.
 * Edit facts here only. Every page reads from this file.
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
   * Used for canonical URLs, social previews and sitemap.xml. Leave "" until known.
   * You can also set it at build time: SITE_URL=https://www.yourdomain.com npm run build
   */
  siteUrl: "",

  phone: "(818) 630-5702",
  phoneHref: "tel:+18186305702",
  fax: "(818) 235-0155",
  email: "info@royalcareathome.com",
  emailHref: "mailto:info@royalcareathome.com",
  formEndpoint: "https://formsubmit.co/ajax/info@royalcareathome.com",
  formAction: "https://formsubmit.co/info@royalcareathome.com",

  address: {
    street: "14328 Victory Blvd., Suite 203",
    city: "Van Nuys",
    state: "CA",
    zip: "91401",
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=14328+Victory+Blvd+Suite+203+Van+Nuys+CA+91401",

  hours: {
    label: "Monday to Friday, 9:00 AM to 5:30 PM",
    short: "Mon to Fri, 9:00 AM to 5:30 PM",
    onCall:
      "A registered nurse is always on call by phone after office hours, on weekends, and on holidays.",
  },

  /** California license number (shown in the footer and compliance page when set). */
  licenseNumber: null as string | null,

  counties: [
    { slug: "los-angeles", name: "Los Angeles County", note: "Including the San Fernando Valley, right where our Van Nuys office is based." },
    { slug: "ventura", name: "Ventura County", note: "Coordinated directly from our Van Nuys office." },
    { slug: "san-bernardino", name: "San Bernardino County", note: "Coordinated directly from our Van Nuys office." },
    { slug: "orange", name: "Orange County", note: "Coordinated directly from our Van Nuys office." },
  ],

  whoCanRefer: [
    "You or a family member",
    "A friend or neighbor",
    "Your doctor or nurse practitioner",
    "A hospital, skilled nursing facility, clinic, or social service agency",
  ],

  whyHome: [
    { title: "Familiar surroundings", body: "You get to heal in your own bed and living room, surrounded by the people and daily routines you love." },
    { title: "Guided by your doctor", body: "Your own physician stays in charge. Every visit follows a care plan built with and signed by your doctor." },
    { title: "A smoother transition home", body: "Coming home from the hospital feels much less stressful when a nurse is right there to review your medications and answer questions." },
    { title: "Fewer trips back to the hospital", body: "Steady check-ins at home help catch small changes early and keep them from turning into bigger problems." },
  ],

  compliance: {
    /** The agency's own nondiscrimination statement (from its printed materials). Have counsel
     *  review it against the current HHS Section 1557 notice requirements. */
    statement:
      "Royal Home Health Care, Inc. complies with applicable federal and state civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability, sex (including pregnancy, childbirth, sexual orientation, and gender identity), or religion in the provision of services or employment.",
    laws:
      "This includes obligations under Title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973, the Age Discrimination Act of 1975, and Section 1557 of the Affordable Care Act (45 CFR Part 92).",
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
  },

  formNotice:
    "For your privacy, please leave out detailed medical history in this form. For referrals and medical records, give us a call or send a fax.",

  /** Optional: an HTTPS endpoint (Formspree, Basin, your CRM) that accepts form POSTs.
   *  Set VITE_FORM_ENDPOINT in a .env file. Without it, the form opens the visitor's email app. */
  formEndpointEnvVar: "VITE_FORM_ENDPOINT",

  /** Date of the most recent accessibility review (shown on the Accessibility page). */
  accessibilityReviewed: "October 2026",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
