/**
 * Frequently asked questions, grouped for the FAQ page.
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
        a: "Home health care brings skilled medical support, like registered nursing, physical therapy, and hands-on daily care, right to your front door under a care plan approved by your doctor. It helps you or your loved one recover after a hospital stay, surgery, or illness, or manage an ongoing health condition comfortably at home.",
      },
      {
        q: "How do I know if I qualify?",
        a: "Anyone under a doctor's care who needs skilled medical support at home may qualify. In general, you need part-time or intermittent skilled care, leaving home takes a considerable effort, and your doctor or allowed provider needs to see you and sign off on a home health care plan. Give us a call and one of our registered nurses will gladly talk through your situation with you.",
      },
      {
        q: "Who can refer me to Royal Home Health Care?",
        a: "You can call us directly yourself, or a family member or friend can reach out on your behalf. Your doctor, hospital discharge planner, skilled nursing facility, clinic, or social worker can also send a referral. Once you call, we reach out to your doctor's office to take care of the paperwork and orders.",
        link: { href: "/referrals", label: "How referrals work" },
      },
      {
        q: "What does “homebound” mean?",
        a: "Being homebound does not mean you are stuck in bed all day. It simply means leaving home is not recommended because of your health condition, or you need support like a walker, wheelchair, special transportation, or another person's help to go out, and leaving takes a real physical effort. You can still leave home for doctor visits, religious services, adult day care, and occasional family outings.",
      },
      {
        q: "Do I need a doctor's order?",
        a: "Yes, home health care always requires orders from your physician or another licensed provider. If you do not have orders yet, just call our office. We will coordinate directly with your doctor's team for you.",
      },
      {
        q: "How quickly can care begin?",
        a: "We usually return calls the same business day. We aim to make your first nursing visit within 48 hours of your referral or your return home from the hospital, or on the specific start date your doctor orders.",
      },
    ],
  },
  {
    id: "services",
    title: "Our services",
    items: [
      {
        q: "What services do you provide?",
        a: "Our registered nurses provide wound care, IV therapy, PleurX catheter drainage, urinary catheter care, vitamin B12 injections, and insulin or diabetic injections. We also offer certified home health aides and structured recovery programs for hospital discharge, surgery, stroke, diabetes, heart conditions, fall prevention, and bedbound care. Physical therapy, occupational therapy, speech therapy, medical social services, and medical supplies are provided by arrangement with trusted local partners and coordinated by our team.",
        link: { href: "/services", label: "Browse all services" },
      },
      {
        q: "Can you give IV therapy at home?",
        a: "Yes. Our registered nurses administer doctor-ordered IV medications like antibiotics and hydration fluids right in your living room, and we care for PICC lines, midlines, and ports. We also coordinate deliveries directly with your home infusion pharmacy.",
        link: { href: "/services/iv-therapy", label: "About IV therapy" },
      },
      {
        q: "Do you drain PleurX catheters?",
        a: "Yes. Our nurses perform scheduled pleural and peritoneal catheter drainage at home following your doctor's exact orders, and we patiently teach family caregivers how to help safely.",
        link: { href: "/services/pleurx-drainage", label: "About PleurX drainage" },
      },
      {
        q: "Do you provide 24-hour or live-in care?",
        a: "No. Home health care is built around scheduled, part-time clinical visits. However, you are never on your own after hours. A registered nurse is always on call by phone in the evenings, on weekends, and on holidays.",
      },
      {
        q: "How often will someone visit?",
        a: "Your doctor sets your visit schedule based on what your recovery requires. Many patients start with more frequent visits right after coming home from the hospital, then taper down as they regain their strength.",
      },
      {
        q: "Will you teach my family how to help?",
        a: "Absolutely. Supporting and teaching family caregivers is a core part of every visit, whether we are walking you through new medications, showing you how to protect a dressing, or practicing safe ways to get in and out of bed.",
      },
      {
        q: "What areas do you serve?",
        a: "We care for patients across Los Angeles, Ventura, San Bernardino, and Orange Counties, all coordinated from our office in Van Nuys. Give us a call with your ZIP code and we will confirm we serve your neighborhood.",
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
        a: "Please call 911 right away for any medical emergency, such as chest pain, trouble breathing, signs of a stroke, severe bleeding, or a bad fall. For urgent non-emergency questions about your care plan after office hours, call our main phone number to speak with our on-call registered nurse.",
      },
      {
        q: "Can I choose my home health agency?",
        a: "Yes, the choice is yours. You have the right to choose which home health agency cares for you. Simply let your doctor or hospital discharge planner know that you want Royal Home Health Care.",
      },
      {
        q: "Do you offer help for people with disabilities or language needs?",
        a: "Yes. Just let us know what makes communication easiest for you, such as large-print materials, extra help filling out paperwork, or speaking in your preferred language, and we will arrange it at no cost to you.",
        link: { href: "/accessibility", label: "Our accessibility commitment" },
      },
      {
        q: "How do I file a complaint?",
        a: "If something ever feels off, we want to hear from you first so we can make it right. Call our Van Nuys office and ask to speak with the administrator. You also have the right to contact the California Department of Public Health or the U.S. Department of Health and Human Services Office for Civil Rights at any time.",
        link: { href: "/nondiscrimination", label: "Complaint contacts" },
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);

