/**
 * Service catalog — every service page, card and menu item is generated from this file.
 * Clinical copy is written in plain language (about an 8th-grade reading level) for
 * health literacy and accessibility. It avoids outcome guarantees on purpose.
 */
import type { IconName } from "@/components/Icon";

export type ServiceCategory = "nursing" | "programs" | "core";

export interface Service {
  slug: string;
  category: ServiceCategory;
  title: string;
  /** Short label for menus when the title is long. */
  navTitle?: string;
  icon: IconName;
  /** One or two sentences for cards. */
  summary: string;
  /** <meta name="description"> — about 150 characters. */
  metaDescription: string;
  intro: string;
  overview: string[];
  includes: string[];
  whoFor: string[];
  visit?: { title: string; body: string }[];
  /** Symptoms to report. Always paired with a "call 911 in an emergency" note on the page. */
  watchFor?: string[];
  /** Optional highlighted callout, e.g. stroke warning signs. */
  callout?: { title: string; body: string[] };
  faqs: { q: string; a: string }[];
  related: string[];
  /** Provided by arrangement with trusted partners and coordinated by Royal. */
  byArrangement?: boolean;
  footnote?: string;
  image?: { src: string; alt: string };
}

export const categories: Record<ServiceCategory, { label: string; eyebrow: string; blurb: string }> = {
  nursing: {
    label: "Skilled Nursing Services",
    eyebrow: "Skilled nursing",
    blurb:
      "Hands-on clinical care from registered nurses, performed in your home under your physician's orders.",
  },
  programs: {
    label: "Recovery & Condition Programs",
    eyebrow: "Care programs",
    blurb:
      "Coordinated nursing, therapy and support built around a diagnosis, a surgery or a hospital stay.",
  },
  core: {
    label: "Home Health Disciplines",
    eyebrow: "Our care team",
    blurb:
      "The professionals who make up your home health team, working together under one plan of care.",
  },
};

const defaultVisit = [
  { title: "Referral & orders", body: "Your physician sends orders, or you call us and we contact your physician's office for you." },
  { title: "Nurse assessment", body: "A registered nurse visits your home, reviews your health and confirms that home health care is right for you." },
  { title: "Your plan of care", body: "We build a plan with your physician — the services, how often we visit, and the goals you're working toward." },
  { title: "Care & coordination", body: "Your team visits on schedule, teaches you and your family, and keeps your physician updated as you improve." },
];

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* SKILLED NURSING SERVICES                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "wound-care",
    category: "nursing",
    title: "Wound Care",
    icon: "Bandage",
    summary:
      "Assessment, cleaning and dressing of surgical, pressure, diabetic and other wounds — with teaching so healing continues between visits.",
    metaDescription:
      "Physician-ordered wound care at home in Los Angeles and nearby counties: surgical incisions, pressure injuries, diabetic ulcers and ostomy care by registered nurses.",
    intro:
      "Wounds heal best when they are cared for consistently and correctly, in a clean and comfortable setting. Our nurses bring physician-ordered wound care to your home, track healing at every visit, and keep your doctor informed.",
    overview: [
      "Whether you are healing from surgery, managing a pressure injury, or caring for a diabetic foot ulcer, a wound that isn't healing as expected can be worrying. Our skilled nurses assess the wound, follow your physician's treatment orders, and watch closely for signs of infection or slow healing.",
      "Because we see the wound regularly, we can notice small changes early and tell your doctor so the treatment plan can be adjusted. We also look at everything around the wound — nutrition, blood sugar, pressure on the skin and how much you're moving — because all of it affects how well you heal.",
    ],
    includes: [
      "Wound assessment and measurement at every visit, with documented progress",
      "Cleaning, irrigation and dressing changes as ordered by your physician",
      "Care of surgical incisions, staples and sutures",
      "Pressure injury (bedsore) treatment and prevention",
      "Diabetic foot ulcer and leg ulcer care",
      "Ostomy and enterostomal care, including skin protection around the stoma",
      "Monitoring for infection and reporting changes to your physician",
      "Teaching you and your family how to protect the wound between visits",
    ],
    whoFor: [
      "People recovering from surgery with an incision to care for",
      "Patients with pressure injuries (bedsores)",
      "People with diabetic foot ulcers or slow-healing leg wounds",
      "Patients with skin tears or wounds from an injury",
      "People living with an ostomy",
    ],
    visit: [
      { title: "Assessment", body: "Your nurse reviews your physician's orders, examines and measures the wound, and checks your overall health." },
      { title: "Treatment", body: "The wound is cleaned and dressed using the supplies and technique your physician ordered." },
      { title: "Teaching", body: "We show you and your caregivers what to watch for and how to keep the dressing clean and dry." },
      { title: "Coordination", body: "Progress is documented and shared with your physician, and the plan is adjusted as you heal." },
    ],
    watchFor: [
      "Redness, warmth or swelling that is spreading around the wound",
      "New drainage, pus or a bad smell",
      "Fever or chills",
      "Wound edges opening, or bleeding that doesn't stop with gentle pressure",
    ],
    faqs: [
      {
        q: "Does Medicare cover wound care at home?",
        a: "Medicare covers skilled nursing for wound care when you meet the home health eligibility requirements, including being homebound and having a physician's order. Medical supplies used for your care are part of the home health benefit. We verify your benefits before care begins.",
      },
      {
        q: "How often will a nurse come to care for my wound?",
        a: "Your physician's orders and the type of wound decide how often we visit. Some patients need several visits a week at first, with fewer visits as the wound heals.",
      },
      {
        q: "Can my family learn to change the dressing?",
        a: "Yes. Teaching is part of every wound care plan. Our nurses demonstrate each step and watch you practice until you feel confident.",
      },
    ],
    related: ["diabetes-management", "post-surgical-recovery", "homebound-bedbound-care"],
    image: {
      src: "/media/nurse-visit.jpg",
      alt: "A nurse in teal scrubs checks the blood pressure of a smiling older woman resting in a recliner at home.",
    },
  },
  {
    slug: "iv-therapy",
    category: "nursing",
    title: "IV Therapy",
    icon: "Droplets",
    summary:
      "Physician-ordered IV antibiotics, hydration and other infusions given safely at home, with line care and close monitoring.",
    metaDescription:
      "Home IV therapy by registered nurses: IV antibiotics, hydration, PICC line and port care in Los Angeles, Ventura, San Bernardino and Orange Counties.",
    intro:
      "If your doctor orders intravenous (IV) medication, you may not need to stay in the hospital or travel to an infusion center to receive it. Our nurses give and monitor IV therapy in your home and care for your IV line between treatments.",
    overview: [
      "Our registered nurses work with your physician and your home infusion pharmacy to provide IV therapy safely at home. We access your IV, give or set up the infusion, watch for reactions, and make sure your line stays clean and working.",
      "Many patients who go home with a PICC line, midline or port need regular flushing and dressing changes to prevent infection and blockages. We take care of that, and teach you and your family how to protect the line during everyday life — including bathing and sleeping.",
    ],
    includes: [
      "IV antibiotic and antifungal therapy",
      "IV hydration (fluid replacement)",
      "Other physician-ordered infusions, coordinated with your home infusion pharmacy",
      "Peripheral IV starts and IV site care",
      "PICC line, midline and implanted port care: flushing, dressing and cap changes",
      "Monitoring for side effects, allergic reactions and infection",
      "Blood draws for lab tests when ordered by your physician",
      "Teaching on line protection and infusion pump use",
    ],
    whoFor: [
      "Patients sent home to finish a course of IV antibiotics",
      "People who need IV fluids for dehydration",
      "Anyone living with a PICC line, midline or implanted port",
      "Patients whose physician has ordered home infusion therapy",
    ],
    visit: [
      { title: "Coordination", body: "We confirm your physician's orders and coordinate medication and supply delivery with your infusion pharmacy." },
      { title: "Line check", body: "Your nurse checks the IV site, makes sure the line is working, and takes your vital signs." },
      { title: "Infusion", body: "The medication is given exactly as prescribed while your nurse watches for any reaction." },
      { title: "Follow-up", body: "We teach you what to watch for, care for the line, and report your progress to your physician." },
    ],
    watchFor: [
      "Redness, swelling, pain or leaking at the IV site",
      "Fever, chills or suddenly feeling unwell",
      "Swelling of the arm, neck or face on the same side as the line",
      "A line that won't flush, or a catheter that is damaged or has moved",
    ],
    faqs: [
      {
        q: "Is IV therapy at home safe?",
        a: "When it is ordered by a physician, prepared by a licensed pharmacy and given by trained nurses, home IV therapy is a common, well-established way to receive treatment. Your nurse monitors you during visits and teaches you exactly what to watch for.",
      },
      {
        q: "Who supplies the IV medication?",
        a: "IV medications are dispensed by a home infusion pharmacy based on your physician's prescription. We coordinate with the pharmacy so the medication and supplies are ready when your nurse arrives.",
      },
      {
        q: "Does Medicare cover IV therapy at home?",
        a: "Medicare home health covers the skilled nursing for IV therapy when you meet eligibility requirements. Coverage for the IV drugs and infusion supplies depends on your plan — for example Part B, Part D or a Medicare Advantage plan. We help you understand your coverage before care begins.",
      },
    ],
    related: ["hospital-discharge-care", "post-surgical-recovery", "skilled-nursing"],
  },
  {
    slug: "pleurx-drainage",
    category: "nursing",
    title: "PleurX™ Catheter Drainage",
    navTitle: "PleurX Drainage",
    icon: "Wind",
    summary:
      "Scheduled drainage of indwelling pleural or abdominal catheters at home to ease breathlessness and abdominal pressure.",
    metaDescription:
      "PleurX catheter drainage at home: registered nurses drain pleural and peritoneal catheters on your physician's schedule and teach family caregivers.",
    intro:
      "A tunneled drainage catheter, such as a PleurX™ catheter, lets fluid that builds up around the lungs or in the abdomen be drained at home instead of in the hospital. Our nurses perform drainage on your physician's schedule and teach your family how to help.",
    overview: [
      "Fluid that collects around the lungs (pleural effusion) or in the abdomen (ascites) can make it hard to breathe, eat or get comfortable. When your doctor places an indwelling catheter, regular drainage at home can ease those symptoms and reduce trips back to the hospital for drainage procedures.",
      "Our nurses follow your physician's orders and the catheter manufacturer's instructions for every drainage. We use sterile technique, keep track of how much fluid is removed and how you feel, and care for the catheter site to help prevent infection.",
    ],
    includes: [
      "Scheduled pleural (chest) or peritoneal (abdominal) catheter drainage, as ordered",
      "Sterile technique using the drainage kits prescribed for your catheter",
      "Recording the amount and appearance of fluid drained",
      "Catheter site assessment and dressing changes",
      "Checking breathing, comfort and vital signs before and after drainage",
      "Coordinating drainage kit supplies with your physician and supplier",
      "Teaching family caregivers to assist with or perform drainage safely",
    ],
    whoFor: [
      "Patients with fluid that keeps returning around the lungs and an indwelling pleural catheter",
      "Patients with recurring abdominal fluid (ascites) and an indwelling peritoneal catheter",
      "People who prefer to manage fluid build-up at home rather than return to the hospital",
      "Families who want to learn to help with drainage",
    ],
    visit: [
      { title: "Check-in", body: "Your nurse asks how your breathing and comfort have been, and checks your vital signs." },
      { title: "Drainage", body: "Using a new sterile kit, fluid is drained exactly as your physician ordered — never faster or more than ordered." },
      { title: "Site care", body: "The catheter site is cleaned, checked and covered with a fresh dressing." },
      { title: "Report", body: "The amount of fluid and any changes are recorded and shared with your physician." },
    ],
    watchFor: [
      "Fever, or redness, swelling, pain or leaking at the catheter site",
      "Fluid that looks cloudy, bloody or smells bad",
      "Shortness of breath that comes back quickly or gets worse",
      "Pain, coughing or chest tightness during drainage — stop and call",
      "A catheter that is damaged, leaking or comes out",
    ],
    faqs: [
      {
        q: "Does draining the catheter hurt?",
        a: "Most people feel little discomfort. Some feel pressure, coughing or tightness as fluid drains. If that happens, your nurse slows or stops the drainage and follows your physician's instructions.",
      },
      {
        q: "How often does the catheter need to be drained?",
        a: "Your physician sets the schedule based on how quickly fluid builds up and how you feel. The schedule may change over time, and we keep your physician updated after every visit.",
      },
      {
        q: "Can my family learn to do the drainage?",
        a: "Yes. Many families learn to assist with or perform drainage. Our nurses teach step by step and watch until you feel confident, and we remain available by phone.",
      },
    ],
    related: ["cardiac-care", "homebound-bedbound-care", "hospital-discharge-care"],
    footnote:
      "PleurX™ is a trademark of its respective owner. We also care for similar tunneled drainage catheters when ordered by your physician.",
  },
  {
    slug: "catheter-care",
    category: "nursing",
    title: "Catheter Care",
    icon: "Droplet",
    summary:
      "Urinary catheter insertion, changes and maintenance — including suprapubic catheters — handled with privacy and dignity at home.",
    metaDescription:
      "Urinary catheter care at home: Foley and suprapubic catheter changes, irrigation, infection prevention and caregiver teaching by registered nurses.",
    intro:
      "Living with a urinary catheter is easier when it's cared for properly. Our nurses insert, change and maintain catheters at home under your physician's orders, help prevent infection, and teach you and your family how to manage day to day.",
    overview: [
      "Catheters need regular attention to work well and stay comfortable. Our nurses change catheters on schedule, solve problems like blockages and leaks, and watch closely for early signs of a urinary tract infection.",
      "Every catheter visit is handled with privacy and respect. We also show you and your caregivers how to clean around the catheter, empty and change drainage bags, and keep everything flowing.",
    ],
    includes: [
      "Indwelling (Foley) catheter insertion and scheduled changes",
      "Suprapubic catheter care and changes, as ordered",
      "Catheter irrigation when ordered by your physician",
      "Solving blockages, leaks and discomfort",
      "Leg bag and night bag care and teaching",
      "Monitoring for urinary tract infection and skin breakdown",
      "Intermittent (straight) catheterization teaching, when ordered",
      "Coordinating catheter supplies",
    ],
    whoFor: [
      "People with urinary retention or incontinence that requires a catheter",
      "Patients going home from the hospital with a new catheter",
      "People with spinal cord injury, multiple sclerosis or other conditions that affect the bladder",
      "Patients with a suprapubic catheter",
    ],
    visit: [
      { title: "Assessment", body: "Your nurse checks the catheter, the skin around it, and the color and amount of urine." },
      { title: "Care or change", body: "The catheter is cleaned, irrigated or changed as your physician ordered, using sterile technique." },
      { title: "Teaching", body: "We show you and your caregivers how to handle bags, keep the system clean, and spot problems early." },
      { title: "Follow-up", body: "Findings are reported to your physician, and supplies are coordinated so you don't run out." },
    ],
    watchFor: [
      "Urine stops draining, or the bag isn't filling",
      "Fever, chills or new confusion",
      "Cloudy, bloody or bad-smelling urine",
      "Pain in the lower belly or back",
      "Leaking around the catheter, or the catheter comes out",
    ],
    faqs: [
      {
        q: "How often does a catheter need to be changed?",
        a: "It depends on the type of catheter, the manufacturer's guidance and your physician's orders. Your nurse follows the schedule your physician sets and changes it sooner if there is a problem.",
      },
      {
        q: "Can you help prevent urinary tract infections?",
        a: "Yes. Careful technique, good catheter hygiene and early detection all lower the risk. We teach you what to watch for and tell your physician right away about any signs of infection.",
      },
      {
        q: "Is catheter care covered by Medicare?",
        a: "Skilled nursing for catheter care can be covered under the Medicare home health benefit when you meet the eligibility requirements. We verify your coverage before care begins.",
      },
    ],
    related: ["homebound-bedbound-care", "wound-care", "stroke-recovery"],
  },
  {
    slug: "b12-injections",
    category: "nursing",
    title: "Vitamin B12 Injections",
    navTitle: "B12 Injections",
    icon: "Syringe",
    summary:
      "Physician-ordered vitamin B12 injections given at home for B12 deficiency and pernicious anemia, with monitoring and education.",
    metaDescription:
      "Vitamin B12 injections at home for pernicious anemia and B12 deficiency, given by registered nurses on your physician's schedule.",
    intro:
      "Some people can't absorb enough vitamin B12 from food or pills and need regular injections instead. When your physician orders B12 injections, our nurses can give them in your home and keep an eye on how you're responding.",
    overview: [
      "Vitamin B12 helps your body make healthy red blood cells and keeps your nerves working properly. Low B12 can cause tiredness, weakness, numbness or tingling, balance problems and memory changes. Conditions such as pernicious anemia, some stomach or bowel surgeries, and certain digestive diseases can make injections necessary.",
      "Your nurse gives the injection on the schedule your physician orders, checks how you're feeling, and lets your doctor know about any changes. If you're receiving home health care for another reason, we fit the injections into your existing visits.",
    ],
    includes: [
      "Intramuscular vitamin B12 injections as ordered by your physician",
      "Following your physician's dosing schedule",
      "Monitoring your symptoms and response to treatment",
      "Coordinating lab work when your physician orders it",
      "Education on B12 deficiency, diet and symptoms to report",
      "Teaching self-injection or caregiver injection when appropriate",
    ],
    whoFor: [
      "People with pernicious anemia",
      "Patients with B12 deficiency who can't absorb oral supplements",
      "People who have had stomach or intestinal surgery that affects absorption",
      "Homebound patients who can't easily travel to a clinic for injections",
    ],
    visit: [
      { title: "Check-in", body: "Your nurse asks how you've been feeling and reviews any new symptoms." },
      { title: "Injection", body: "The B12 injection is given exactly as ordered, with proper technique and site care." },
      { title: "Follow-up", body: "Your response is documented and shared with your physician, who may adjust the schedule." },
    ],
    watchFor: [
      "Numbness, tingling or balance problems that get worse",
      "Unusual tiredness, shortness of breath or a racing heartbeat",
      "Redness, swelling or pain at the injection site that doesn't go away",
    ],
    faqs: [
      {
        q: "Does Medicare cover B12 injections at home?",
        a: "Medicare can cover B12 injections given by a home health nurse for certain medical conditions, such as pernicious anemia, when you meet home health eligibility requirements. Coverage depends on your diagnosis and your physician's orders, and we verify your benefits first.",
      },
      {
        q: "How often will I need injections?",
        a: "Your physician decides. Many treatment plans start with more frequent injections and then move to a maintenance schedule, such as once a month.",
      },
      {
        q: "Can I learn to give my own injections?",
        a: "Often, yes. If your physician agrees, our nurses can teach you or a family member to give the injection safely.",
      },
    ],
    related: ["diabetic-injections", "diabetes-management", "skilled-nursing"],
  },
  {
    slug: "diabetic-injections",
    category: "nursing",
    title: "Insulin & Diabetic (DM) Injections",
    navTitle: "DM Injections",
    icon: "Syringe",
    summary:
      "Insulin and other injectable diabetes medications given or supervised at home, with blood sugar checks and hands-on teaching.",
    metaDescription:
      "Insulin and diabetic (DM) injections at home: registered nurses give or supervise injections, check blood sugar and teach safe self-injection.",
    intro:
      "Managing diabetes medication can feel overwhelming, especially after a hospital stay or a change in treatment. Our nurses give or supervise insulin and other diabetes (DM) injections at home, check your blood sugar, and teach you and your family to manage with confidence.",
    overview: [
      "Injectable diabetes medications work best when they're given at the right dose, at the right time, with the right technique. Our nurses follow your physician's orders exactly, review your blood sugar readings, and watch for highs and lows.",
      "Our goal is your independence. Wherever possible, we teach you or a family member to give injections safely — from using an insulin pen or drawing up insulin, to rotating injection sites and storing medication properly. When someone isn't able to self-inject, we work with your physician on a plan that keeps you safe.",
    ],
    includes: [
      "Insulin injections by pen or vial and syringe, as ordered",
      "Other injectable diabetes medications prescribed by your physician",
      "Blood glucose checks and review of your readings",
      "Recognizing and treating low and high blood sugar",
      "Step-by-step teaching on injection technique and site rotation",
      "Safe medication storage and sharps disposal",
      "Reporting readings and concerns to your physician for dose adjustments",
    ],
    whoFor: [
      "People newly started on insulin or another injectable diabetes medication",
      "Patients whose diabetes medication changed during a hospital stay",
      "People who have trouble seeing, handling or measuring doses",
      "Family caregivers learning to give injections to a loved one",
    ],
    visit: [
      { title: "Review", body: "Your nurse checks your blood sugar log, your supplies and how you've been feeling." },
      { title: "Injection or coaching", body: "The injection is given as ordered, or your nurse watches and coaches while you or a caregiver gives it." },
      { title: "Teaching", body: "We cover one skill at a time — technique, timing, storage and what to do about highs and lows." },
      { title: "Coordination", body: "Readings and concerns go to your physician so your treatment can be adjusted." },
    ],
    watchFor: [
      "Low blood sugar: shaking, sweating, confusion, a fast heartbeat or feeling faint",
      "High blood sugar: extreme thirst, frequent urination or blurry vision",
      "Readings outside the range your physician gave you",
      "Redness, lumps or pain at injection sites",
    ],
    faqs: [
      {
        q: "What does “DM” mean?",
        a: "DM stands for diabetes mellitus, the medical name for diabetes. DM injections are injectable diabetes medicines, such as insulin.",
      },
      {
        q: "Will a nurse come every day to give my insulin?",
        a: "Home health visits are part-time and intermittent, so a nurse usually can't be there for every dose. We focus on teaching you or a caregiver to inject safely, with nurse visits to check technique, review blood sugars and support you. Your physician's orders decide how often we visit.",
      },
      {
        q: "Does Medicare cover diabetic injection teaching?",
        a: "Skilled nursing for diabetes teaching and medication management can be covered under Medicare home health when you meet eligibility requirements. We verify your benefits before care begins.",
      },
    ],
    related: ["diabetes-management", "wound-care", "b12-injections"],
  },

  /* ------------------------------------------------------------------ */
  /* RECOVERY & CONDITION PROGRAMS                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "hospital-discharge-care",
    category: "programs",
    title: "Hospital Discharge Care",
    icon: "Hospital",
    summary:
      "A safe, well-coordinated move from hospital to home — medication review, follow-up and warning signs covered from the first visit.",
    metaDescription:
      "Transitional home health care after a hospital stay: medication review, nurse visits, follow-up coordination and caregiver support in Los Angeles and nearby counties.",
    intro:
      "The first days and weeks after leaving the hospital are when patients need the most support. Our transitional care helps you settle in safely, understand your medications and follow-up plan, and avoid surprises — with the goal of keeping you home.",
    overview: [
      "Going home is good news, but discharge instructions can be confusing and a lot changes at once: new medications, new equipment, new limits on activity. A Royal nurse visits soon after you get home, reviews your discharge orders with you, and makes sure you have what you need.",
      "We work with your hospital team, your physician and your family so nothing falls through the cracks. If physical therapy, a home health aide or medical social services would help, we coordinate those too.",
    ],
    includes: [
      "A start-of-care nursing visit after you get home",
      "Medication review: we compare what's in your home to your discharge orders",
      "Discharge instructions, diet and activity limits explained in plain language",
      "Vital sign and symptom monitoring",
      "A home safety check and equipment needs review",
      "Follow-up appointment coordination and updates to your physician",
      "Teaching on warning signs and exactly when to call",
      "Therapy, aide or social services added when your plan calls for them",
    ],
    whoFor: [
      "Anyone going home after a hospital or skilled nursing facility stay",
      "Patients with new or complicated medication schedules",
      "People with heart failure, COPD, pneumonia or other conditions that often lead to a return to the hospital",
      "Family caregivers who want support during the transition",
    ],
    visit: [
      { title: "Before you leave", body: "Your hospital case manager or physician sends us a referral — or you or your family call us directly." },
      { title: "First visit at home", body: "A registered nurse reviews your medications, instructions and home, and answers your questions." },
      { title: "Your plan", body: "With your physician, we set the services and visit schedule you need for a safe recovery." },
      { title: "Ongoing support", body: "Your team visits, teaches and monitors until you reach your goals and no longer need home health care." },
    ],
    watchFor: [
      "New or worsening shortness of breath, swelling or pain",
      "Fever, chills, or a wound that looks infected",
      "Confusion, dizziness or unusual sleepiness",
      "Questions about any medication — never guess, call us",
    ],
    faqs: [
      {
        q: "How soon after I get home will the first visit happen?",
        a: "Medicare rules call for the first home health visit within 48 hours of the referral or your return home — or on the start date your physician orders. We schedule it with you before or as soon as you're discharged.",
      },
      {
        q: "Can the hospital refer me directly to Royal?",
        a: "Yes. Hospital case managers and discharge planners can send a referral to us. If you have Medicare, you also have the right to choose which home health agency cares for you — just tell your discharge planner you'd like Royal Home Health Care.",
      },
      {
        q: "What if I need help with bathing and daily activities?",
        a: "If you're receiving skilled care, your plan can include a certified home health aide to help with bathing, grooming and other personal care.",
      },
    ],
    related: ["post-surgical-recovery", "cardiac-care", "iv-therapy"],
    image: {
      src: "/media/care-connection.jpg",
      alt: "A smiling older woman resting in a recliner looks up at a nurse who leans in to talk with her.",
    },
  },
  {
    slug: "post-surgical-recovery",
    category: "programs",
    title: "Post-Surgical Recovery",
    icon: "ShieldPlus",
    summary:
      "Nursing and rehab after joint replacement, heart, abdominal and other surgeries — incision care, pain control and getting you moving again.",
    metaDescription:
      "Post-surgical home health care: incision care, pain management, blood thinner teaching and physical therapy after surgery, coordinated with your surgeon.",
    intro:
      "Recovering from surgery at home is more comfortable — but it comes with responsibilities: caring for your incision, managing pain medicine, and getting back on your feet safely. Our team supports each step under your surgeon's and physician's orders.",
    overview: [
      "Our nurses watch your incision for signs of infection, help you manage pain safely, and teach you about new medications such as blood thinners. They look for early warning signs of complications so your surgeon can act quickly if needed.",
      "Movement is medicine after most surgeries. When your physician orders therapy, physical and occupational therapists help you rebuild strength, walk safely and get back to everyday tasks like dressing and bathing — in the home where you'll actually do them.",
    ],
    includes: [
      "Incision and surgical wound care, including staples and sutures",
      "Pain management support and medication teaching",
      "Monitoring for infection, blood clots and other complications",
      "Blood thinner teaching and injections when ordered",
      "Surgical drain care when ordered",
      "Physical and occupational therapy, coordinated by Royal",
      "Safe transfer, walking and fall-prevention training",
      "Updates to your surgeon and primary physician",
    ],
    whoFor: [
      "Hip, knee and shoulder replacement patients",
      "People recovering from spine, abdominal or general surgery",
      "Patients after heart surgery (see Cardiac Care)",
      "People recovering from an amputation, including prosthetic training",
    ],
    visit: defaultVisit,
    watchFor: [
      "Redness, swelling, warmth or drainage at the incision",
      "Fever over the limit your surgeon gave you",
      "Calf pain or swelling in one leg",
      "Pain that isn't controlled by your prescribed medication",
    ],
    faqs: [
      {
        q: "Will I get physical therapy at home after surgery?",
        a: "If your physician orders it, yes. Therapy is provided through trusted therapy partners and coordinated by Royal, so it fits into one plan of care with your nursing visits.",
      },
      {
        q: "How long will home health care last after surgery?",
        a: "It depends on your recovery. Your physician certifies home health care for up to 60 days at a time, and care can continue while you still qualify. Many surgical patients need only a few weeks.",
      },
      {
        q: "Do I have to be homebound to get care after surgery?",
        a: "For Medicare coverage, yes — leaving home must take a considerable effort. After major surgery, many patients meet this requirement for a period of time. We'll help you understand your eligibility.",
      },
    ],
    related: ["wound-care", "fall-risk-mobility", "physical-therapy"],
  },
  {
    slug: "stroke-recovery",
    category: "programs",
    title: "Stroke Recovery",
    icon: "Brain",
    summary:
      "Coordinated nursing and therapy to rebuild strength, speech and independence after a stroke — and to help manage the risk factors for another.",
    metaDescription:
      "Stroke recovery at home: nursing, physical, occupational and speech therapy, blood pressure management and caregiver training in Los Angeles and nearby counties.",
    intro:
      "Recovery after a stroke happens one day and one skill at a time — and much of it happens best at home, where you'll use what you relearn. Our team coordinates nursing and therapy around your goals and your family's needs.",
    overview: [
      "A stroke can affect movement, speech, swallowing, memory and mood. Our nurses manage medications and blood pressure, watch for complications, and help you and your family understand what to expect. Therapists work on the skills that matter most to you, in your own home.",
      "We also focus on prevention. Controlling blood pressure, blood sugar and cholesterol, taking medications as prescribed, and staying active are key ways to help lower the risk of another stroke.",
    ],
    includes: [
      "Nursing assessments, vital signs and blood pressure management",
      "Medication management, including blood thinners",
      "Physical therapy for strength, balance and walking",
      "Occupational therapy for dressing, bathing and daily tasks",
      "Speech-language therapy for communication and swallowing",
      "Home safety and fall-prevention planning",
      "Caregiver training for transfers and daily routines",
      "Education on stroke warning signs and risk factors",
    ],
    whoFor: [
      "People returning home after a stroke hospital or rehab stay",
      "Patients with weakness on one side of the body",
      "People with new trouble speaking, understanding or swallowing",
      "Families learning how to help safely",
    ],
    callout: {
      title: "Know the signs of stroke: BE FAST",
      body: [
        "B — Balance: sudden loss of balance or coordination",
        "E — Eyes: sudden trouble seeing",
        "F — Face: one side of the face droops",
        "A — Arm: one arm is weak or numb",
        "S — Speech: slurred or strange speech",
        "T — Time: call 911 right away",
      ],
    },
    visit: defaultVisit,
    faqs: [
      {
        q: "Can stroke rehabilitation really happen at home?",
        a: "Yes. Therapy at home focuses on the real tasks and spaces you use every day — your stairs, your kitchen, your bathroom. When ordered by your physician, therapists come to you.",
      },
      {
        q: "My loved one has trouble swallowing. Can you help?",
        a: "Speech-language pathologists assess swallowing and teach safer eating techniques and food textures. Let us know right away about coughing or choking while eating.",
      },
      {
        q: "How can our family help with recovery?",
        a: "Families are part of the team. We teach safe transfers, exercises and communication strategies, and help you balance helping with encouraging independence.",
      },
    ],
    related: ["fall-risk-mobility", "speech-therapy", "physical-therapy"],
  },
  {
    slug: "diabetes-management",
    category: "programs",
    title: "Diabetes Management",
    icon: "Gauge",
    summary:
      "Nurse-led diabetes teaching, blood sugar monitoring, foot and skin checks and medication support to help you stay in control at home.",
    metaDescription:
      "Diabetes management at home: blood sugar monitoring, insulin teaching, diabetic foot care and medication management by registered nurses.",
    intro:
      "Diabetes affects nearly every part of daily life — what you eat, how you feel, how your body heals. Our nurses help you understand your numbers, take medications safely, and build habits that protect your health at home.",
    overview: [
      "We start by understanding your routine: your meals, your medications, your blood sugar pattern and what gets in the way. Then we teach practical skills one at a time, and keep your physician updated so treatment can be adjusted when needed.",
      "Diabetes can make wounds slower to heal and can affect the feet, eyes, heart and kidneys. Regular foot and skin checks, and early action on small problems, are a big part of how we help prevent complications.",
    ],
    includes: [
      "Blood glucose monitoring and pattern review",
      "Medication management for oral and injectable diabetes medicines",
      "Insulin and injection teaching",
      "Recognizing and treating low and high blood sugar",
      "Diabetic foot and skin checks; wound prevention and care",
      "Practical guidance on meals and carbohydrates, based on your physician's recommendations",
      "Sick-day planning",
      "Regular updates to your physician for treatment adjustments",
    ],
    whoFor: [
      "People newly diagnosed with diabetes",
      "Patients recently in the hospital for diabetes-related problems",
      "People with diabetic wounds or foot problems",
      "Anyone whose diabetes medicines recently changed",
    ],
    visit: defaultVisit,
    watchFor: [
      "Blood sugar readings outside the range your physician gave you",
      "Signs of low blood sugar: shaking, sweating, confusion",
      "A cut, blister or sore on your foot that isn't healing",
      "Signs of infection: redness, warmth, swelling or fever",
    ],
    faqs: [
      {
        q: "What will I learn in diabetes teaching?",
        a: "How to check and record your blood sugar, take your medications correctly, handle highs and lows, care for your feet, plan meals and know when to call. We go at your pace.",
      },
      {
        q: "Do you check my feet?",
        a: "Yes. Foot checks are part of routine diabetes care, because small problems can become serious quickly. We also teach you or a caregiver how to check your feet every day.",
      },
      {
        q: "Does Medicare cover diabetes management at home?",
        a: "Skilled nursing for diabetes teaching, medication management and wound care can be covered under Medicare home health when you meet eligibility requirements.",
      },
    ],
    related: ["diabetic-injections", "wound-care", "cardiac-care"],
  },
  {
    slug: "homebound-bedbound-care",
    category: "programs",
    title: "Homebound & Bedbound Care",
    icon: "BedDouble",
    summary:
      "Comprehensive skilled care for patients who can't easily leave home — or bed — including skin protection, repositioning and caregiver support.",
    metaDescription:
      "Home health care for homebound and bedbound patients: skilled nursing, pressure injury prevention, aide services and caregiver training at home.",
    intro:
      "When leaving home takes a major effort — or isn't possible at all — health care should come to you. We provide physician-directed nursing, therapy and aide services for homebound and bedbound patients, with special attention to comfort, skin and safety.",
    overview: [
      "Being homebound doesn't mean going without good care. Our nurses monitor chronic conditions, manage medications, and catch problems early, so small issues don't turn into emergency room visits.",
      "For patients who spend most of their time in bed, skin protection is essential. We check the skin at every visit, teach caregivers safe repositioning, and recommend pressure-relieving equipment to your physician when needed.",
    ],
    includes: [
      "Regular skilled nursing assessments and chronic condition monitoring",
      "Pressure injury prevention: skin checks, repositioning schedules and pressure relief",
      "Wound and catheter care when needed",
      "Medication management",
      "Certified home health aide help with bathing and personal care",
      "Therapy for bed mobility, safe transfers and positioning",
      "Help identifying equipment such as hospital beds and pressure-relieving mattresses",
      "Caregiver training, and medical social services for family support",
    ],
    whoFor: [
      "Patients who need help or a device to leave home",
      "Bedbound patients and those who spend most of the day in bed or a chair",
      "People with advanced chronic illness",
      "Family caregivers who need training and support",
    ],
    visit: defaultVisit,
    watchFor: [
      "Red or dark areas on the skin that don't fade after repositioning",
      "Less eating or drinking than usual",
      "New confusion, fever or breathing changes",
      "Pain that keeps your loved one from resting",
    ],
    faqs: [
      {
        q: "What does “homebound” mean for Medicare?",
        a: "You're considered homebound if leaving home isn't recommended because of your condition, or you need help, a device or special transportation to leave — and leaving home takes a considerable and taxing effort. You can still attend medical appointments, religious services and adult day care.",
      },
      {
        q: "Can you help us get a hospital bed or other equipment?",
        a: "Your physician can order durable medical equipment such as a hospital bed. We help identify what's needed and coordinate with your physician and an equipment supplier. With Original Medicare, you typically pay 20% of the approved amount for equipment after the Part B deductible.",
      },
      {
        q: "Do you provide 24-hour or live-in care?",
        a: "No. Home health care is provided in scheduled, intermittent visits. Between visits, a registered nurse is on call by phone after hours, on weekends and on holidays.",
      },
    ],
    related: ["wound-care", "catheter-care", "home-health-aides"],
    image: {
      src: "/media/care-hands.jpg",
      alt: "Close-up of a caregiver gently holding the hands of an older person wrapped in a soft blanket.",
    },
  },
  {
    slug: "cardiac-care",
    category: "programs",
    title: "Cardiac Care",
    icon: "HeartPulse",
    summary:
      "Heart failure and post-heart-surgery care at home — daily weights, symptom tracking, medication management and education.",
    metaDescription:
      "Cardiac home health care: heart failure management, post-cardiothoracic surgery nursing, blood pressure and medication monitoring at home.",
    intro:
      "Living with heart disease means paying attention to small changes before they become big problems. Our cardiac care helps you understand your condition, take medications correctly, and recognize warning signs early — with your cardiologist and physician kept in the loop.",
    overview: [
      "For people with heart failure, daily weights, swelling checks and a careful eye on breathing can reveal fluid build-up days before it becomes an emergency. Our nurses teach these habits, review your readings, and contact your physician when something changes.",
      "After heart surgery, such as bypass or valve surgery, our post-cardiothoracic nursing supports a safe recovery: incision care, activity precautions, medication management and a gradual return to activity.",
    ],
    includes: [
      "Vital signs, heart rate and blood pressure monitoring",
      "Daily weight and swelling tracking for heart failure",
      "Medication management: water pills, blood thinners and heart medicines",
      "Post-cardiothoracic surgery nursing, including chest incision care",
      "Low-sodium diet and fluid guidance as ordered",
      "Energy-saving techniques and a gradual activity plan",
      "Clear education on symptoms to report and when to call 911",
      "Coordination with your cardiologist and primary physician",
    ],
    whoFor: [
      "People living with heart failure (CHF)",
      "Patients recovering from a heart attack",
      "Patients after bypass, valve or other heart surgery",
      "People with heart rhythm problems such as atrial fibrillation, or hard-to-control blood pressure",
    ],
    visit: defaultVisit,
    watchFor: [
      "Weight gain of 2–3 pounds in a day or 5 pounds in a week, or as your physician instructs",
      "More swelling in your feet, ankles, legs or belly",
      "Shortness of breath, especially when lying down",
      "Dizziness, a racing or irregular heartbeat, or a new cough",
    ],
    faqs: [
      {
        q: "Why do I need to weigh myself every day?",
        a: "With heart failure, sudden weight gain is often the first sign of fluid build-up. Weighing yourself every morning helps you and your care team catch it early, often before you feel worse.",
      },
      {
        q: "Can you help me understand all my heart medications?",
        a: "Yes. We review every medication with you — what it's for, when to take it and what side effects to watch for — and help you set up a routine that works.",
      },
      {
        q: "Do you work with my cardiologist?",
        a: "Yes. We share our findings with your cardiologist and primary physician and follow their orders, so everyone is working from the same plan.",
      },
    ],
    related: ["hospital-discharge-care", "post-surgical-recovery", "diabetes-management"],
  },
  {
    slug: "fall-risk-mobility",
    category: "programs",
    title: "Fall Risk & Mobility",
    icon: "Footprints",
    summary:
      "Fall-risk assessments, home safety evaluations and strength and balance therapy to help you move confidently and stay independent.",
    metaDescription:
      "Fall prevention and mobility care at home: fall-risk assessment, home safety evaluation, balance and gait therapy and walker training.",
    intro:
      "Falls are a leading cause of injury for older adults, and the fear of falling can keep people from moving at all. Our team looks at you and your home together to reduce risks and rebuild your confidence.",
    overview: [
      "Falls usually have more than one cause: weak muscles, poor balance, medication side effects, vision changes, clutter or poor lighting. We assess each of these, then build a plan that addresses the ones that matter for you.",
      "When ordered by your physician, physical therapists work on strength, balance and walking, and occupational therapists help you get in and out of bed, the shower and the car safely. We also teach your family how to help without risking injury to themselves.",
    ],
    includes: [
      "Fall-risk assessment by a nurse or therapist",
      "Room-by-room home safety evaluation",
      "Strength, balance and walking (gait) training",
      "Safe transfer training: bed, chair, toilet and tub",
      "Walker, cane and wheelchair training",
      "Medication review for side effects like dizziness",
      "Recommendations for grab bars, lighting, rugs and equipment",
      "A plan for what to do — and how to get help — if a fall happens",
    ],
    whoFor: [
      "Anyone who has fallen or nearly fallen",
      "People who feel unsteady or afraid of falling",
      "Patients weakened after a hospital stay",
      "People with Parkinson's disease, stroke, arthritis or neuropathy",
    ],
    visit: defaultVisit,
    faqs: [
      {
        q: "Will you install grab bars or rails?",
        a: "We don't install equipment, but we'll recommend exactly what to add and where, and can point you to resources that can help.",
      },
      {
        q: "I'm nervous about exercising. Is therapy safe?",
        a: "Therapists start where you are, with exercises matched to your strength and balance, and progress slowly. Safety comes first at every visit.",
      },
      {
        q: "What should I do if I fall?",
        a: "Stay calm and check for injury before trying to get up. If you're hurt, can't get up, or hit your head, call 911. Your therapist will teach you a safe way to get up and how to call for help.",
      },
    ],
    related: ["stroke-recovery", "physical-therapy", "post-surgical-recovery"],
  },

  /* ------------------------------------------------------------------ */
  /* HOME HEALTH DISCIPLINES                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "skilled-nursing",
    category: "core",
    title: "Skilled Nursing",
    icon: "Stethoscope",
    summary:
      "Registered nurses bring medication management, wound care, injections, IV therapy and chronic-condition monitoring to your door.",
    metaDescription:
      "Skilled nursing at home from Royal Home Health Care: registered nurses provide physician-directed care in Los Angeles, Ventura, San Bernardino and Orange Counties.",
    intro:
      "Our registered nurses are the center of your home health team. They assess your health, carry out your physician's orders, teach you and your family, and coordinate every other service you receive.",
    overview: [
      "Skilled nursing covers care that requires a licensed nurse: assessing a changing condition, managing complex medications, caring for wounds and lines, giving injections and infusions, and teaching you how to manage your health. Every visit follows a plan of care signed by your physician.",
      "Your nurse is also your guide. They explain what's happening in plain language, answer your family's questions, and keep your physician informed so your care can change as you do.",
    ],
    includes: [
      "Health assessments and vital sign monitoring",
      "Medication management, reconciliation and teaching",
      "Wound, ostomy and catheter care",
      "IV therapy and injections",
      "Chronic condition management: heart failure, COPD, diabetes and more",
      "Pain management support",
      "Blood draws for lab work when ordered",
      "Patient and caregiver education, and care coordination",
    ],
    whoFor: [
      "Patients recovering from illness, injury, surgery or a hospital stay",
      "People with chronic conditions that need monitoring",
      "Anyone with a new diagnosis, new medications or new equipment",
    ],
    visit: defaultVisit,
    faqs: [
      {
        q: "Are your nurses licensed?",
        a: "Skilled nursing is provided by licensed nurses working under the direction of your physician's plan of care.",
      },
      {
        q: "How often will my nurse visit?",
        a: "Your physician's orders set the frequency. It often changes over time — more visits at the start, fewer as you get stronger.",
      },
    ],
    related: ["wound-care", "iv-therapy", "diabetic-injections"],
    image: {
      src: "/media/nurse-visit.jpg",
      alt: "A nurse in teal scrubs checks the blood pressure of a smiling older woman resting in a recliner at home.",
    },
  },
  {
    slug: "home-health-aides",
    category: "core",
    title: "Home Health Aides",
    icon: "HandHeart",
    summary:
      "Certified aides help with bathing, grooming, dressing and mobility — with warmth and respect for your independence.",
    metaDescription:
      "Certified home health aides help with bathing, grooming, dressing and mobility as part of your home health plan of care.",
    intro:
      "Our certified home health aides are there for the everyday moments that matter most. Bathing, grooming, dressing and moving around safely — all handled with warmth and genuine respect for your independence.",
    overview: [
      "Home health aides provide hands-on personal care as part of your plan of care, under the supervision of a registered nurse. They often see you more than anyone else on the team, so they're also an important set of eyes and ears — reporting changes to your nurse.",
      "Under Medicare, home health aide visits are covered when you're also receiving skilled nursing or therapy. Aide visits are part-time and intermittent; we don't provide 24-hour or live-in care.",
    ],
    includes: [
      "Bathing, showering and bed baths",
      "Grooming, oral care and skin care",
      "Dressing and toileting assistance",
      "Help with walking and safe transfers",
      "Simple exercises from your therapist's plan",
      "Reporting changes in your condition to your nurse",
    ],
    whoFor: [
      "Patients who need help with personal care while recovering",
      "People who can't safely bathe on their own",
      "Families who need support with daily routines",
    ],
    faqs: [
      {
        q: "Does Medicare cover home health aides?",
        a: "Yes — when you're also receiving skilled nursing, physical therapy, speech therapy or continuing occupational therapy, and you meet the other home health requirements. Medicare does not cover personal care when it's the only care you need.",
      },
      {
        q: "Who supervises the aides?",
        a: "A registered nurse develops the aide's care instructions and supervises their work.",
      },
    ],
    related: ["homebound-bedbound-care", "skilled-nursing", "fall-risk-mobility"],
    image: {
      src: "/media/care-companionship.jpg",
      alt: "A smiling caregiver leans toward a laughing older man as they hold hands in a sunlit living room.",
    },
  },
  {
    slug: "physical-therapy",
    category: "core",
    title: "Physical Therapy",
    icon: "PersonStanding",
    byArrangement: true,
    summary:
      "Rebuild strength, balance and walking ability after surgery, illness or injury — in the home where you need them most.",
    metaDescription:
      "Physical therapy at home after surgery, stroke, illness or a fall: strength, balance, gait training and fall prevention, coordinated by Royal Home Health Care.",
    intro:
      "Whether you're bouncing back from surgery, an illness or a fall, physical therapists work with you in your own space to rebuild strength, improve balance and get you moving confidently again.",
    overview: [
      "Therapy at home is practical: you practice on your own stairs, in your own hallway, with your own furniture. Your therapist sets goals with you, teaches exercises you can do between visits, and adjusts the plan as you progress.",
      "Physical therapy is provided by arrangement with trusted licensed therapy partners and coordinated by Royal, so it fits into a single plan of care with your nursing visits.",
    ],
    includes: [
      "Strength and endurance training",
      "Balance and gait (walking) training",
      "Muscle re-education after stroke or injury",
      "Prosthetic training after amputation",
      "Walker, cane and wheelchair training",
      "Pain-relief techniques and therapeutic exercise",
      "Home exercise programs",
    ],
    whoFor: [
      "Patients after joint replacement or other surgery",
      "People recovering from a stroke or neurological condition",
      "Anyone who has fallen or feels unsteady",
    ],
    faqs: [
      {
        q: "Does Medicare cover physical therapy at home?",
        a: "Yes, when it's ordered by your physician as part of home health care and you meet the eligibility requirements.",
      },
    ],
    related: ["fall-risk-mobility", "post-surgical-recovery", "stroke-recovery"],
  },
  {
    slug: "occupational-therapy",
    category: "core",
    title: "Occupational Therapy",
    icon: "Hand",
    byArrangement: true,
    summary:
      "Relearn everyday tasks — dressing, bathing, cooking — safely and with confidence, using adaptive techniques and equipment.",
    metaDescription:
      "Occupational therapy at home: help with dressing, bathing and daily tasks, adaptive equipment and home safety, coordinated by Royal Home Health Care.",
    intro:
      "Occupational therapy helps you get back to the everyday things that make you feel like yourself: getting dressed, preparing meals, moving safely through your home. It's about living fully, on your own terms.",
    overview: [
      "Occupational therapists look at the tasks you need and want to do, and find safer, easier ways to do them — through practice, new techniques, and adaptive and assistive devices.",
      "Occupational therapy is provided by arrangement with trusted licensed therapy partners and coordinated by Royal as part of your plan of care.",
    ],
    includes: [
      "Training in dressing, bathing, grooming and toileting",
      "Adaptive and assistive device training",
      "Energy-conservation techniques",
      "Home safety and bathroom setup recommendations",
      "Fine-motor and hand function exercises",
    ],
    whoFor: [
      "People recovering from stroke, surgery or illness",
      "Patients with arthritis or limited hand function",
      "Anyone struggling with daily self-care tasks",
    ],
    faqs: [
      {
        q: "What's the difference between physical and occupational therapy?",
        a: "Physical therapy focuses on strength, balance and walking. Occupational therapy focuses on the daily activities you do with that strength — like dressing, bathing and cooking.",
      },
    ],
    related: ["stroke-recovery", "fall-risk-mobility", "physical-therapy"],
  },
  {
    slug: "speech-therapy",
    category: "core",
    title: "Speech-Language Therapy",
    navTitle: "Speech Therapy",
    icon: "MessageCircle",
    byArrangement: true,
    summary:
      "Gentle support to communicate clearly and swallow safely after a stroke, surgery or neurological condition.",
    metaDescription:
      "Speech-language therapy at home for communication, voice and swallowing after stroke or illness, coordinated by Royal Home Health Care.",
    intro:
      "After a stroke, surgery or neurological change, speech-language pathologists gently guide you back to communicating clearly and eating safely — at your pace, in your home.",
    overview: [
      "Speech-language therapy addresses speaking, understanding, reading, writing, memory and thinking skills, as well as voice and swallowing. Your therapist also teaches family members communication strategies that make every conversation easier.",
      "Speech-language therapy is provided by arrangement with trusted licensed therapy partners and coordinated by Royal as part of your plan of care.",
    ],
    includes: [
      "Speech, language and communication therapy",
      "Swallowing assessment and safe-swallowing strategies",
      "Voice rehabilitation",
      "Memory and thinking (cognitive-communication) exercises",
      "Family communication training",
    ],
    whoFor: [
      "People recovering from a stroke",
      "Patients with Parkinson's disease or other neurological conditions",
      "Anyone who coughs or chokes while eating or drinking",
    ],
    faqs: [
      {
        q: "Can speech therapy help with swallowing?",
        a: "Yes. Speech-language pathologists assess swallowing and recommend safer techniques, positions and food textures.",
      },
    ],
    related: ["stroke-recovery", "occupational-therapy", "skilled-nursing"],
  },
  {
    slug: "medical-social-services",
    category: "core",
    title: "Medical Social Services",
    icon: "Users",
    byArrangement: true,
    summary:
      "Social workers help you and your family with community resources, long-term planning and the emotional side of illness.",
    metaDescription:
      "Medical social services at home: help with community resources, long-term care planning and counseling, coordinated by Royal Home Health Care.",
    intro:
      "Navigating illness can feel overwhelming. Medical social workers sit with you and your family to connect you with resources, counseling and long-term planning support, so nothing falls through the cracks.",
    overview: [
      "Medical social services address the practical and emotional challenges that can get in the way of recovery — from finding community programs and financial resources to planning for long-term care.",
      "Medical social services are provided by arrangement and coordinated by Royal as part of your plan of care.",
    ],
    includes: [
      "Connecting you with community and financial resources",
      "Long-term care and advance care planning support",
      "Short-term counseling for patients and families",
      "Caregiver support and respite resources",
    ],
    whoFor: [
      "Patients facing financial or practical barriers to care",
      "Families planning for long-term needs",
      "Caregivers who need support",
    ],
    faqs: [
      {
        q: "Does Medicare cover medical social services?",
        a: "Yes, when they're ordered by your physician as part of your home health plan of care.",
      },
    ],
    related: ["homebound-bedbound-care", "hospital-discharge-care", "home-health-aides"],
  },
  {
    slug: "medical-supplies",
    category: "core",
    title: "Medical Supplies",
    icon: "Package",
    byArrangement: true,
    summary:
      "We coordinate the medical supplies and equipment your plan of care calls for, delivered to your door.",
    metaDescription:
      "Medical supply coordination for home health patients: wound care, catheter and other supplies arranged by Royal Home Health Care.",
    intro:
      "Whatever your care plan calls for, we coordinate the medical supplies and equipment you need, delivered to your door — one less thing for your family to worry about.",
    overview: [
      "Medical supplies used in your care, such as wound dressings and catheter supplies, are part of your home health plan. We coordinate them so your nurse has what's needed at every visit.",
      "Durable medical equipment, such as walkers, wheelchairs and hospital beds, is ordered by your physician and provided by an equipment supplier. We help identify what you need and coordinate the order.",
    ],
    includes: [
      "Wound care and dressing supplies",
      "Catheter and ostomy supplies",
      "Coordination of durable medical equipment orders",
      "Teaching on safe use of supplies and equipment",
    ],
    whoFor: [
      "Any home health patient whose care requires supplies",
      "Patients who need equipment to stay safe at home",
    ],
    faqs: [
      {
        q: "Does Medicare pay for medical supplies?",
        a: "Medical supplies used for your home health care are covered as part of the home health benefit. For durable medical equipment, Original Medicare typically pays 80% of the approved amount after the Part B deductible.",
      },
    ],
    related: ["wound-care", "catheter-care", "homebound-bedbound-care"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (cat: ServiceCategory) => services.filter((s) => s.category === cat);
