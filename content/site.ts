// Single source of truth for all copy and facts.
// NEVER invent: staff names, license numbers, accreditation, years, stats, testimonials.
// Null fields render NOTHING in production. See README "Needed from client."

export const site = {
  name: "Royal Home Health Care, Inc.",
  tagline: "Committed to our Patients and their Families",
  taglineAlt: "Quality Care by Compassionate Hearts",
  domain: "https://www.royalcarehome.com",

  contact: {
    phoneDisplay: "(818) 630-5702",
    phoneHref: "tel:+18186305702",
    fax: "(818) 235-0155",
    email: "info@royalcareathome.com",
  },

  address: {
    street: "14328 Victory Blvd., Suite 203",
    city: "Van Nuys",
    state: "CA",
    zip: "91401",
  },

  hours: {
    label: "Monday – Friday, 9:00 AM – 5:30 PM",
    timezone: "America/Los_Angeles",
    // 1 = Monday … 5 = Friday. Office open 9:00–17:30 local.
    officeDays: [1, 2, 3, 4, 5],
    openMinutes: 9 * 60,
    closeMinutes: 17 * 60 + 30,
    onCallNote:
      "An on-call registered nurse is available by phone during non-office hours, weekends, and holidays.",
  },

  whoQualifies:
    "Anyone under a physician's care who would benefit from receiving care at home can qualify. Call us and a registered nurse will help determine eligibility.",

  coverage: [
    "Medicare",
    "Medi-Cal",
    "Some private insurance",
    "Workers' compensation",
    "Regional centers",
    "Private pay",
  ],
  coverageNote: "Coverage depends on eligibility. Call us to verify your benefits.",

  whyHomeCare: [
    "Care takes place among family and familiar surroundings — and family can take part.",
    "All services are coordinated with your physician.",
    "Home care is an ideal transition between hospitalization and independent living.",
    "Care at home can mean earlier hospital discharges and lower health care costs.",
    "Many patients find recovery feels easier at home.",
  ],

  whoCanRefer: [
    "You",
    "A family member or friend",
    "Your physician",
    "A hospital, clinic, or social agency",
  ],

  journey: [
    {
      step: "01",
      title: "Referral",
      body: "Call us directly, or ask a physician, hospital, clinic, social agency, family member, or friend to refer you.",
    },
    {
      step: "02",
      title: "RN Assessment",
      body: "A registered nurse schedules an appointment to determine qualification for home care.",
    },
    {
      step: "03",
      title: "Care Plan with Your Physician",
      body: "We work with your physician to develop a plan of care built around your needs.",
    },
    {
      step: "04",
      title: "Care at Home",
      body: "Skilled care comes to you — coordinated, compassionate, and close to the people you love.",
    },
  ],

  services: {
    direct: [
      {
        slug: "skilled-nursing",
        title: "Skilled Nursing",
        short: "Registered nursing care at home, under your physician's plan of care.",
        body: "Our registered nurses provide skilled nursing care in your home, working directly with your physician. Care is planned around your needs and your family's needs, with clear communication at every step.",
      },
      {
        slug: "home-health-aides",
        title: "Home Health Aides",
        short: "Help with daily activities, so you can stay comfortably at home.",
        body: "Home health aides assist with the activities of daily living, supporting your comfort and independence at home under the direction of your care team.",
      },
    ],
    coordinated: [
      {
        slug: "physical-therapy",
        title: "Physical Therapy",
        short: "Coordinated by arrangement. Mobility, strength, and function at home.",
        body: "Provided by arrangement with trusted therapy partners and coordinated with your physician. Goals include safer movement, strength, and independence at home.",
      },
      {
        slug: "occupational-therapy",
        title: "Occupational Therapy",
        short: "Coordinated by arrangement. Relearning everyday tasks with confidence.",
        body: "Provided by arrangement and coordinated with your physician, occupational therapy helps you safely manage everyday activities at home.",
      },
      {
        slug: "speech-therapy",
        title: "Speech / Language Therapy",
        short: "Coordinated by arrangement. Communication and swallowing support.",
        body: "Provided by arrangement, speech and language therapy supports communication and swallowing function, coordinated with your physician.",
      },
      {
        slug: "social-services",
        title: "Social Services",
        short: "Coordinated by arrangement. Guidance for you and your family.",
        body: "Provided by arrangement, social services offer counseling and practical guidance to help you and your family navigate care at home.",
      },
      {
        slug: "medical-supplies",
        title: "Medical Supplies",
        short: "Coordinated by arrangement. The supplies your care plan calls for.",
        body: "Provided by arrangement, we help coordinate the medical supplies your plan of care requires.",
      },
    ],
    specialNursing: [
      { slug: "post-cardiothoracic-nursing", title: "Post-Cardiothoracic Nursing" },
      { slug: "enterostomal-nursing", title: "Enterostomal Nursing" },
      { slug: "wound-care", title: "Wound Care" },
    ],
    specialTherapy: [
      { slug: "muscle-re-education", title: "Muscle Re-education" },
      { slug: "prosthetic-training", title: "Prosthetic Training" },
      { slug: "gait-functional-training", title: "Gait & Functional Training" },
      { slug: "therapeutic-equipment", title: "Therapeutic Equipment Use" },
      { slug: "adaptive-devices", title: "Adaptive & Assistive Devices" },
      { slug: "pain-control-techniques", title: "Pain Control Techniques" },
      { slug: "voice-swallowing", title: "Voice & Swallowing Function" },
    ],
  },

  serviceNote:
    "Therapy, social services, and medical supplies are provided by arrangement with trusted partners and coordinated by Royal with your physician — not in-house.",

  counties: [
    { slug: "los-angeles", name: "Los Angeles County", anchor: "Los Angeles" },
    { slug: "ventura", name: "Ventura County", anchor: "Ventura County" },
    { slug: "san-bernardino", name: "San Bernardino County", anchor: "San Bernardino County" },
    { slug: "orange", name: "Orange County", anchor: "Orange County" },
  ],

  compliance: {
    statement:
      "Royal Home Health Care, Inc. complies with applicable civil rights laws and does not discriminate on the basis of race, color, disability, age, religion, pregnancy, childbirth, national origin, or sexual orientation in the provision of services or employment. This includes obligations under Title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973, and the Age Discrimination Act of 1975.",
    cdph: {
      label: "California Department of Public Health complaint line",
      phone: "(818) 901-4375",
      tollFree: "(800) 228-1019",
      fax: "(562) 409-5096",
      website: "www.cdph.ca.gov",
      verify: true,
    },
  },

  formNotice:
    "Please don't submit sensitive medical details here. Call us for urgent or private information.",

  // Null-guarded fields — render NOTHING when null. Needed from client.
  content: {
    ownerName: null as string | null,
    licenseNumber: null as string | null,
    cmsCertification: null as string | null,
    foundedYear: null as string | null,
    testimonials: null as string | null,
  },
} as const;

export type Site = typeof site;
