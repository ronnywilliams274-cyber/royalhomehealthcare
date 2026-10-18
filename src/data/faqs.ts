/**
 * Frequently asked questions, grouped for the FAQ page.
 * Medicare facts are based on Medicare.gov ("Home health services") — re-check yearly.
 */
export interface Faq {
  q: string;
  a: string;
  /** Optional internal link shown under the answer. */
  link?: { href: string; label: string };
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "What is home health care?",
        a: "Home health care is skilled medical care — such as nursing, therapy and related services — delivered in your home under a plan of care from your physician. It helps people recover from an illness, injury, surgery or hospital stay, or manage a chronic condition, without leaving home.",
      },
      {
        q: "How do I know if I qualify?",
        a: "Anyone under a physician's care who would benefit from care at home may qualify. For Medicare coverage, you must need part-time or intermittent skilled care, be homebound, and have a physician or allowed practitioner see you and order home health care. Call us and a registered nurse will help determine your eligibility.",
        link: { href: "/medicare-certified", label: "See Medicare eligibility" },
      },
      {
        q: "Who can refer me to Royal Home Health Care?",
        a: "You can call us yourself. A family member, friend, your physician, a hospital, a skilled nursing facility, a clinic or a social service agency can also refer you. We contact your physician's office to obtain the orders we need.",
        link: { href: "/referrals", label: "How referrals work" },
      },
      {
        q: "Do I need a doctor's order?",
        a: "Yes. Home health care is provided under orders from your physician or another allowed practitioner. If you don't have orders yet, call us — we'll work with your doctor's office.",
      },
      {
        q: "How quickly can care begin?",
        a: "We usually return calls the same business day. Medicare rules call for the first visit within 48 hours of the referral or your return home, or on the start date your physician orders.",
      },
    ],
  },
  {
    id: "medicare-payment",
    title: "Medicare, insurance & cost",
    items: [
      {
        q: "Is Royal Home Health Care Medicare-certified?",
        a: "Yes. Royal Home Health Care, Inc. is a Medicare-certified home health agency, which means we meet federal health and safety standards and are approved to provide home health care to people with Medicare.",
        link: { href: "/medicare-certified", label: "What Medicare certification means" },
      },
      {
        q: "What will I pay with Medicare?",
        a: "If you're eligible, you pay nothing for covered home health services. For durable medical equipment such as a walker or hospital bed, you typically pay 20% of the Medicare-approved amount after you meet the Part B deductible.",
      },
      {
        q: "What does “homebound” mean?",
        a: "You're homebound if leaving home isn't recommended because of your condition, or you need help — such as a cane, walker, wheelchair, special transportation or another person — to leave, and leaving home takes a considerable and taxing effort. You can still leave home for medical care, religious services, adult day care and short, infrequent outings.",
      },
      {
        q: "Do you accept Medi-Cal or private insurance?",
        a: "We work with Medicare, Medi-Cal, some private insurance plans, workers' compensation, regional centers and private pay. Coverage depends on your eligibility and plan, so call us and we'll verify your benefits before care begins.",
      },
      {
        q: "I have a Medicare Advantage plan. Can you still help?",
        a: "Medicare Advantage plans have their own rules and networks for home health care. Call us with your plan information and we'll check whether we can provide your care.",
      },
      {
        q: "What doesn't Medicare cover?",
        a: "Medicare doesn't cover 24-hour care at home, meal delivery, homemaker services such as shopping and cleaning that aren't related to your care plan, or personal care when it's the only care you need.",
      },
    ],
  },
  {
    id: "services",
    title: "Our services",
    items: [
      {
        q: "What services do you provide?",
        a: "Skilled nursing (including wound care, IV therapy, PleurX catheter drainage, catheter care, vitamin B12 and diabetic injections), home health aides, and recovery programs for hospital discharge, surgery, stroke, diabetes, heart conditions, fall risk and homebound or bedbound patients. Physical, occupational and speech therapy, medical social services and medical supplies are provided by arrangement and coordinated by Royal.",
        link: { href: "/services", label: "Browse all services" },
      },
      {
        q: "Can you give IV therapy at home?",
        a: "Yes. Our nurses give physician-ordered IV therapy, such as antibiotics and hydration, and care for PICC lines, midlines and ports. We coordinate the medication with your home infusion pharmacy.",
        link: { href: "/services/iv-therapy", label: "About IV therapy" },
      },
      {
        q: "Do you drain PleurX catheters?",
        a: "Yes. Our nurses perform scheduled pleural and peritoneal catheter drainage at home following your physician's orders, and teach family members to help.",
        link: { href: "/services/pleurx-drainage", label: "About PleurX drainage" },
      },
      {
        q: "Do you provide 24-hour or live-in care?",
        a: "No. Home health care is provided in scheduled, part-time visits. A registered nurse is on call by phone after office hours, on weekends and on holidays.",
      },
      {
        q: "How often will someone visit?",
        a: "Your physician's orders decide how often each member of your team visits. Visit frequency usually changes over time as you get stronger.",
      },
      {
        q: "Will you teach my family how to help?",
        a: "Yes. Teaching patients and family caregivers is part of every plan of care, from medications and wound care to safe transfers and warning signs.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve patients in Los Angeles, Ventura, San Bernardino and Orange Counties from our office in Van Nuys. Call us to confirm coverage for your address.",
        link: { href: "/service-areas", label: "See service areas" },
      },
    ],
  },
  {
    id: "safety-rights",
    title: "Safety, rights & accessibility",
    items: [
      {
        q: "What should I do in an emergency?",
        a: "Call 911 for any emergency, such as chest pain, trouble breathing, signs of a stroke, severe bleeding or a serious fall. For urgent questions about your care after hours, call our main number to reach the on-call nurse.",
      },
      {
        q: "Can I choose my home health agency?",
        a: "Yes. If you have Medicare, you have the right to choose which Medicare-certified home health agency provides your care. Tell your physician or hospital discharge planner that you'd like Royal Home Health Care.",
      },
      {
        q: "Do you offer help for people with disabilities or language needs?",
        a: "Yes. Let us know how we can communicate with you best — for example, large print, help completing forms, or language assistance — and we'll work with you to meet your needs at no cost to you.",
        link: { href: "/accessibility", label: "Our accessibility commitment" },
      },
      {
        q: "How do I file a complaint?",
        a: "We want to hear from you first — call our office and ask for the administrator. You can also contact the California Department of Public Health or, for discrimination concerns, the U.S. Department of Health and Human Services Office for Civil Rights.",
        link: { href: "/nondiscrimination", label: "Complaint contacts" },
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
