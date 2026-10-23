/**
 * Service catalog. Every service page, card, and menu item is generated from this file.
 * Clinical copy is written in warm, plain language for patients and family caregivers.
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
  /** <meta name="description"> about 150 characters. */
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
      "Hands-on clinical care from our registered nurses, brought right to your living room under your doctor's orders.",
  },
  programs: {
    label: "Recovery & Condition Programs",
    eyebrow: "Care programs",
    blurb:
      "Focused nursing, therapy, and family support tailored around a specific diagnosis, surgery, or hospital stay.",
  },
  core: {
    label: "Home Health Disciplines",
    eyebrow: "Our care team",
    blurb:
      "The dedicated clinicians and caregivers who make up your home health team, working together under one shared plan.",
  },
};

const defaultVisit = [
  { title: "Referral & orders", body: "Your doctor sends orders over, or you give us a call and we reach out to your doctor's office for you." },
  { title: "Nurse assessment", body: "One of our registered nurses visits you at home, listens to how you are doing, and goes over your medical needs." },
  { title: "Your plan of care", body: "We partner with your doctor to map out the right services, visit schedule, and recovery goals for you." },
  { title: "Care & coordination", body: "Your team visits on schedule, shows your family how to help, and keeps your doctor in the loop as you get stronger." },
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
      "Gentle assessment, cleaning, and dressing for surgical incisions, pressure injuries, and diabetic ulcers, plus practical guidance for care between visits.",
    metaDescription:
      "Doctor-ordered wound care at home across Los Angeles and nearby counties: surgical incisions, pressure injuries, diabetic ulcers, and ostomy care by registered nurses.",
    intro:
      "Dealing with a wound after surgery or an injury is much easier when a skilled nurse comes to you. Our registered nurses bring sterile supplies to your home, care for the wound gently, and keep your doctor updated at every step.",
    overview: [
      "Whether you are healing from a recent operation, treating a pressure injury, or tending to a slow-healing diabetic foot ulcer, having a wound at home can feel stressful. Our nurses examine the wound carefully, follow your doctor's treatment orders, and watch closely for early signs of infection.",
      "Because we see you regularly, we can spot subtle changes right away and let your doctor know if your dressing or treatment needs an update. We also pay attention to the bigger picture, including your nutrition, blood sugar, skin pressure, and daily comfort, since all of those play a big role in how well your skin heals.",
    ],
    includes: [
      "Careful wound measurement and progress tracking at every visit",
      "Gentle cleaning, irrigation, and sterile dressing changes ordered by your doctor",
      "Post-surgical incision care, including staple and suture checks",
      "Pressure injury treatment, skin checks, and prevention strategies",
      "Diabetic foot ulcer and venous leg ulcer care",
      "Ostomy and stoma care, including surrounding skin protection",
      "Close monitoring for signs of infection and direct updates to your doctor",
      "Clear, hands-on guidance so you and your family know how to protect the dressing between visits",
    ],
    whoFor: [
      "Patients recovering at home with a new surgical incision",
      "Anyone healing from a pressure injury or bedsore",
      "People managing diabetic foot ulcers or circulation-related leg wounds",
      "Patients with fragile skin tears or traumatic wounds",
      "Individuals adjusting to a new or existing ostomy",
    ],
    visit: [
      { title: "Assessment", body: "Your nurse reviews your doctor's orders, gently examines and measures the wound, and checks your vital signs." },
      { title: "Treatment", body: "We clean and dress the area using the exact sterile supplies and technique prescribed by your physician." },
      { title: "Family guidance", body: "We walk you and your loved ones through how to keep the dressing clean, dry, and comfortable between visits." },
      { title: "Doctor updates", body: "We document your healing progress, share updates with your doctor, and adjust the routine as the skin closes." },
    ],
    watchFor: [
      "Redness, warmth, or swelling that starts spreading around the wound",
      "New or heavier drainage, pus, or an unusual odor",
      "A fever, chills, or feeling generally unwell",
      "Incision edges pulling apart, or bleeding that does not stop with light pressure",
    ],
    faqs: [
      {
        q: "How often will a nurse come to care for my wound?",
        a: "Your visit schedule depends on the type of wound and what your doctor orders. Many patients start with several visits a week and taper down to fewer visits as the wound heals.",
      },
      {
        q: "Can my family learn to change the dressing?",
        a: "Definitely. Teaching family caregivers is a natural part of what we do. Our nurses demonstrate each step at a comfortable pace and stay right beside you while you practice until you feel confident.",
      },
    ],
    related: ["diabetes-management", "post-surgical-recovery", "homebound-bedbound-care"],
    image: {
      src: "/media/specialty-nursing.jpg",
      alt: "A registered nurse in blue scrubs preparing sterile wound care supplies at a table while speaking warmly with a smiling older woman at home.",
    },
  },
  {
    slug: "iv-therapy",
    category: "nursing",
    title: "IV Therapy",
    icon: "Droplets",
    summary:
      "Doctor-ordered IV antibiotics, hydration fluids, and infusions given safely in your living room, complete with PICC line and port care.",
    metaDescription:
      "Home IV therapy by registered nurses: IV antibiotics, hydration, PICC line, and port care across Los Angeles, Ventura, San Bernardino, and Orange Counties.",
    intro:
      "When your doctor prescribes intravenous medication or fluids, you often do not need to stay in a hospital bed or drive back and forth to an infusion clinic. Our registered nurses bring IV therapy to your home and care for your line between doses.",
    overview: [
      "Our nurses partner closely with your doctor and your home infusion pharmacy so you can receive IV medications safely in your own favorite chair. We check your line, start or set up the infusion, monitor how you feel, and keep everything clean and flowing smoothly.",
      "If you come home from the hospital with a PICC line, midline, or implanted port, regular flushing and sterile dressing changes are essential to prevent clots and infections. We handle all of that clinical maintenance and show you simple ways to protect the line while you shower, rest, and go about your day.",
    ],
    includes: [
      "Home IV antibiotic and antifungal infusions",
      "IV hydration fluids when ordered by your physician",
      "Other specialty infusions coordinated with your home infusion pharmacy",
      "Peripheral IV insertion and ongoing site care",
      "PICC line, midline, and implanted port flushing, cap changes, and sterile dressings",
      "Careful monitoring for medication side effects or allergic reactions",
      "Lab blood draws ordered by your doctor to check medication levels and kidney function",
      "Step-by-step guidance on infusion pumps and keeping your line dry and secure",
    ],
    whoFor: [
      "Patients discharged from the hospital to finish a course of IV antibiotics at home",
      "People who need scheduled IV hydration to stay out of the emergency room",
      "Anyone with a PICC line, midline, or port that needs weekly maintenance",
      "Patients whose specialist has ordered home infusion treatments",
    ],
    visit: [
      { title: "Coordination", body: "We confirm your prescription with your doctor and arrange medication and supply deliveries with your infusion pharmacy." },
      { title: "Line check", body: "Your nurse inspects the IV site, checks your vital signs, and confirms the catheter is flushing cleanly." },
      { title: "Infusion", body: "We administer the medication or set up your pump while monitoring you closely to make sure you feel comfortable." },
      { title: "Follow-up", body: "We dress the line, draw any scheduled labs, and send regular updates back to your prescribing physician." },
    ],
    watchFor: [
      "Redness, tenderness, warmth, or leaking around the IV site",
      "A sudden fever, chills, or feeling shaky",
      "Swelling in the arm, shoulder, or neck on the side of your IV line",
      "A line that resists flushing, or a dressing that becomes loose or wet",
    ],
    faqs: [
      {
        q: "Is IV therapy at home safe?",
        a: "Yes. When prescribed by your doctor, prepared by a licensed infusion pharmacy, and managed by an experienced registered nurse, home IV therapy is a safe and comfortable way to complete treatment. Your nurse checks on you regularly and makes sure you know who to call day or night.",
      },
      {
        q: "Who supplies the IV medication?",
        a: "A licensed home infusion pharmacy prepares and delivers your medication and pump supplies based on your doctor's prescription. Our team coordinates directly with the pharmacy so everything is at your house when your nurse arrives.",
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
      "Scheduled, sterile drainage for indwelling pleural or abdominal catheters at home so you can breathe easier and avoid hospital trips.",
    metaDescription:
      "PleurX catheter drainage at home: registered nurses drain pleural and peritoneal catheters on your doctor's schedule and support family caregivers.",
    intro:
      "An indwelling drainage catheter, such as a PleurX™ catheter, allows fluid around the lungs or in the abdomen to be relieved gently at home instead of making repeated trips to the hospital. Our nurses perform each drainage on your doctor's schedule and support your family every step of the way.",
    overview: [
      "When fluid keeps building up around the lungs (pleural effusion) or in the abdomen (ascites), it can leave you feeling winded, full, and exhausted. Having a nurse drain the catheter on a steady schedule at home brings relief right away and lets you rest in your own bed afterward.",
      "Our registered nurses follow your doctor's exact volume limits and use a fresh sterile kit for every visit. We track how much fluid is removed, check your breathing and vital signs, put on a clean dressing, and share detailed notes with your physician.",
    ],
    includes: [
      "Scheduled pleural (chest) or peritoneal (abdominal) catheter drainage per doctor's orders",
      "Careful sterile technique using prescribed vacuum drainage bottles and kits",
      "Tracking fluid volume and appearance at every visit",
      "Catheter exit-site inspection and sterile dressing changes",
      "Checking oxygen levels, breathing comfort, and vital signs before and after drainage",
      "Helping coordinate replacement drainage kits with your doctor and medical supplier",
      "Patient, hands-on training for family members who want to help with drainage",
    ],
    whoFor: [
      "Patients with recurring fluid around the lungs and an indwelling pleural catheter",
      "Patients with recurring abdominal fluid (ascites) and a peritoneal drainage catheter",
      "People who want comfortable symptom relief at home without frequent clinic procedures",
      "Family caregivers who would like a nurse's support or training with drainage kits",
    ],
    visit: [
      { title: "Check-in", body: "Your nurse asks how your breathing and energy have been and checks your vital signs and oxygen." },
      { title: "Gentle drainage", body: "Using a new sterile kit, we drain the fluid slowly and stop at the exact limit your doctor ordered." },
      { title: "Site care", body: "We clean the catheter site, check the skin, and secure the catheter neatly under a fresh sterile pad." },
      { title: "Doctor report", body: "We log the fluid amount and how you tolerated the visit, then update your physician." },
    ],
    watchFor: [
      "Fever, or new redness, warmth, tenderness, or oozing at the catheter site",
      "Drainage fluid that changes color, turns cloudy, or has a strong odor",
      "Shortness of breath that returns quickly after drainage or suddenly worsens",
      "Sharp chest pain, dizziness, or persistent coughing during drainage",
      "A catheter cuff or valve that looks damaged or dislodged",
    ],
    faqs: [
      {
        q: "Does draining the catheter hurt?",
        a: "Most patients feel relief rather than pain. Occasionally you might feel a mild pulling sensation or urge to cough as the last bit of fluid drains. Your nurse controls the flow rate gently and slows or pauses right away if you feel any tightness.",
      },
      {
        q: "How often does the catheter need to be drained?",
        a: "Your doctor sets the schedule based on how quickly fluid collects and how you feel. Because we keep your physician updated after each visit, the schedule can easily be adjusted as your needs change.",
      },
      {
        q: "Can my family learn to do the drainage?",
        a: "Yes. Many families like knowing how to use the kits between nursing visits. We teach you step by step at your own pace, and our nurses remain just a phone call away.",
      },
    ],
    related: ["cardiac-care", "homebound-bedbound-care", "hospital-discharge-care"],
    footnote:
      "PleurX™ is a trademark of its respective owner. Our nurses also care for other brands of tunneled pleural and peritoneal drainage catheters ordered by your doctor.",
  },
  {
    slug: "catheter-care",
    category: "nursing",
    title: "Catheter Care",
    icon: "Droplet",
    summary:
      "Private, respectful urinary catheter changes, irrigation, and troubleshooting at home, including Foley and suprapubic catheters.",
    metaDescription:
      "Urinary catheter care at home: Foley and suprapubic catheter changes, irrigation, infection prevention, and caregiver guidance by registered nurses.",
    intro:
      "Managing a urinary catheter is much simpler when you have an experienced nurse looking after it at home. We handle insertions, routine changes, and troubleshooting under your doctor's orders while helping you stay comfortable and free of infection.",
    overview: [
      "Urinary catheters need steady attention to stay comfortable and flow properly. Our registered nurses come to your home for scheduled changes, resolve issues like kinks, leaks, or blockages, and watch closely for early signs of a urinary tract infection.",
      "We treat every visit with complete privacy and respect. We also show you and your family practical tips for daily hygiene, switching between leg bags and overnight bags, and keeping tubing positioned comfortably.",
    ],
    includes: [
      "Indwelling (Foley) catheter insertion and scheduled routine changes",
      "Suprapubic catheter changes and site care per physician orders",
      "Sterile bladder irrigation when prescribed by your doctor",
      "Troubleshooting slow drainage, bypassing, leaks, or bladder spasms",
      "Guidance on cleaning and switching leg bags and overnight drainage bags",
      "Monitoring for urinary tract infections and protecting surrounding skin",
      "Teaching intermittent (straight) catheterization when ordered",
      "Helping coordinate replacement catheter supplies so you never run short",
    ],
    whoFor: [
      "Individuals with urinary retention or bladder conditions requiring an indwelling catheter",
      "Patients returning home from the hospital or rehab with a new Foley catheter",
      "People living with spinal cord injuries, multiple sclerosis, or prostate conditions",
      "Patients with a suprapubic catheter who prefer routine changes at home",
    ],
    visit: [
      { title: "Checkup", body: "Your nurse checks how the catheter is draining, inspects the skin, and notes the clarity and volume of urine." },
      { title: "Care or change", body: "We clean, irrigate, or replace the catheter using sterile technique according to your doctor's orders." },
      { title: "Everyday tips", body: "We review bag care, hydration, and comfortable tubing placement with you and your caregiver." },
      { title: "Follow-up", body: "We share updates with your doctor and make sure your supplies are stocked for upcoming visits." },
    ],
    watchFor: [
      "No urine draining into the bag over two to four hours, or a full bladder feeling",
      "Fever, chills, lower back ache, or sudden confusion",
      "Urine that looks very cloudy, dark red, or has a strong odor",
      "New burning, cramping, or leaking around the catheter tube",
      "A catheter that accidentally pulls out",
    ],
    faqs: [
      {
        q: "How often does a catheter need to be changed?",
        a: "Many indwelling catheters are changed about once a month, though your doctor sets the exact schedule for you. If a catheter ever clogs, leaks, or feels uncomfortable sooner, our nurses can visit to check or replace it.",
      },
      {
        q: "Can you help prevent urinary tract infections?",
        a: "Yes. Gentle sterile insertion, good daily hygiene, plenty of fluids, and keeping the drainage bag below hip level all make a big difference. We also watch for early symptoms so your doctor can treat any issue right away.",
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
      "Doctor-ordered vitamin B12 injections given comfortably at home for pernicious anemia and B12 deficiency, with ongoing symptom checks.",
    metaDescription:
      "Vitamin B12 injections at home for pernicious anemia and B12 deficiency, administered by registered nurses on your doctor's schedule.",
    intro:
      "When your body cannot absorb enough vitamin B12 from food or tablets, regular injections help keep your energy and nerves healthy. With your doctor's order, our nurses administer B12 injections at home and check in on how you are feeling.",
    overview: [
      "Vitamin B12 is essential for healthy red blood cells and nerve function. When levels drop too low because of pernicious anemia, digestive conditions, or past stomach surgery, it can leave you feeling exhausted, unsteady on your feet, or dealing with tingling in your hands and feet.",
      "Our registered nurses give your injection on the exact schedule your doctor sets, check your vital signs, and keep your physician updated on your symptoms. If you are already receiving home health visits for another condition, we can easily take care of your B12 injection during the same visit.",
    ],
    includes: [
      "Intramuscular vitamin B12 injections administered per your doctor's prescription",
      "Keeping track of your dosing calendar so you stay right on schedule",
      "Checking in on your energy levels, balance, and nerve symptoms",
      "Drawing follow-up blood work when ordered by your doctor",
      "Plain-language guidance on B12 deficiency and nutrition",
      "Teaching you or a family member how to give the injection safely if you want to do it yourself",
    ],
    whoFor: [
      "People diagnosed with pernicious anemia",
      "Patients with documented vitamin B12 deficiency who cannot absorb oral supplements",
      "Individuals who have had gastric or intestinal surgery that affects nutrient absorption",
      "Homebound seniors who find it taxing to travel to a clinic for routine shots",
    ],
    visit: [
      { title: "Check-in", body: "Your nurse asks how your energy, balance, and symptoms have been since your last dose." },
      { title: "Injection", body: "We give the B12 injection gently using proper technique and rotate sites for comfort." },
      { title: "Follow-up", body: "We log the dose and share updates with your doctor so your schedule stays on track." },
    ],
    watchFor: [
      "Numbness, tingling, or unsteadiness that seems to be getting worse",
      "New shortness of breath, dizziness, or unusual fatigue",
      "Soreness, redness, or swelling at the injection site that does not fade",
    ],
    faqs: [
      {
        q: "How often will I need injections?",
        a: "Your doctor sets your schedule based on your lab results. Some patients start with weekly or biweekly doses to build their levels back up, then move to a monthly maintenance dose.",
      },
      {
        q: "Can a family member learn to give the injection?",
        a: "Often, yes. If your doctor agrees, our nurses are happy to teach you or a loved one how to draw up and give the injection safely at home.",
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
      "Calm, hands-on support with insulin and injectable diabetes medications at home, including blood sugar checks and one-on-one coaching.",
    metaDescription:
      "Insulin and diabetic (DM) injections at home: registered nurses assist with injections, check blood sugar, and teach safe self-injection.",
    intro:
      "Starting insulin or adjusting to a new diabetes medication after a hospital stay can feel intimidating at first. Our nurses come to your home to help with injections, check your blood sugars, and coach you and your family until the routine feels second nature.",
    overview: [
      "Injectable diabetes medications work best when the timing, dose, and injection site are consistent. Our registered nurses follow your doctor's orders carefully, review your daily blood sugar log, and watch for patterns of high or low readings.",
      "Whenever possible, our goal is to help you or a family caregiver feel completely comfortable handling injections on your own. We walk you through using an insulin pen or syringe, rotating sites so your skin stays healthy, storing insulin properly, and knowing what to do if your blood sugar dips or spikes.",
    ],
    includes: [
      "Administering or supervising insulin and other injectable diabetes medications",
      "Fingerstick blood glucose checks and review of continuous glucose monitor readings",
      "Clear action plans for spotting and treating low or high blood sugar",
      "Hands-on coaching for drawing doses, using pens, and rotating injection sites",
      "Guidance on safe insulin storage and sharps container disposal",
      "Sharing blood sugar trends with your doctor so doses can be fine-tuned safely",
    ],
    whoFor: [
      "Patients newly prescribed insulin or another injectable diabetes medication",
      "People whose insulin doses were changed during a recent hospital stay",
      "Seniors with vision changes or arthritis who need extra help measuring doses",
      "Family members learning how to give insulin injections to a loved one",
    ],
    visit: [
      { title: "Blood sugar review", body: "Your nurse looks over your recent glucose readings, meal routine, and supplies." },
      { title: "Injection or coaching", body: "We administer the dose as ordered, or guide you step by step as you or a family member gives it." },
      { title: "Practical tips", body: "We take one skill at a time, from site rotation to handling low blood sugar safely." },
      { title: "Doctor updates", body: "We send your glucose logs to your doctor if your numbers suggest your dose needs adjusting." },
    ],
    watchFor: [
      "Low blood sugar signs: shakiness, cold sweats, dizziness, confusion, or a racing heart",
      "High blood sugar signs: unusual thirst, frequent trips to the bathroom, or blurred vision",
      "Blood sugar numbers that stay above or below the target range your doctor set",
      "Firm lumps, redness, or tenderness at your usual injection spots",
    ],
    faqs: [
      {
        q: "What does “DM” mean?",
        a: "DM stands for diabetes mellitus, the clinical term for diabetes. DM injections include insulin as well as non-insulin injectable diabetes medications.",
      },
      {
        q: "Will a nurse come every day to give my insulin?",
        a: "Because home health care consists of part-time, intermittent visits, a nurse typically cannot be there for multiple daily doses over the long term. Instead, we focus on helping you or a family caregiver feel confident giving the injections, while our nurses visit to check your blood sugars, review your technique, and coordinate with your doctor.",
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
      "A calm, organized transition from hospital to home, starting with a medication review, vital sign check, and clear answers on day one.",
    metaDescription:
      "Transitional home health care after a hospital stay: medication reconciliation, nursing visits, follow-up coordination, and family support across Southern California.",
    intro:
      "Coming home from the hospital is a huge relief, but those first few days can also feel overwhelming. Our transitional care team meets you at home right away to sort through your discharge paperwork, organize your medications, and help you settle in safely.",
    overview: [
      "A lot changes during a hospital stay. You often come home with a stack of instructions, new prescriptions, different doses of old medications, and follow-up appointments to schedule. One of our registered nurses visits shortly after you walk through the door to sit down with you, compare your pill bottles against your discharge list, and make sure nothing is missing.",
      "We stay in close touch with your hospital discharge planner and your primary doctor so everyone is on the same page. If your recovery also calls for physical therapy, occupational therapy, or a home health aide to help with showering, we coordinate all of it under one plan.",
    ],
    includes: [
      "Prompt start-of-care nursing visit right after you return home",
      "Side-by-side medication review comparing what is in your cabinet to your hospital discharge list",
      "Walking through your discharge instructions, diet, and activity guidelines in plain English",
      "Checking your vital signs, surgical sites, and overall comfort",
      "A practical home safety walkthrough and medical equipment check",
      "Helping coordinate follow-up doctor visits and lab work",
      "Clear guidance on what symptoms to watch for and when to call us",
      "Bringing in physical therapy, occupational therapy, or home health aides when ordered",
    ],
    whoFor: [
      "Anyone returning home after a stay in the hospital or a skilled nursing facility",
      "Patients juggling new or changed medication schedules after discharge",
      "People recovering from heart failure, pneumonia, COPD flare-ups, or serious infections",
      "Families who want an experienced nurse checking in during the first weeks home",
    ],
    visit: [
      { title: "Before discharge", body: "Your hospital case manager or doctor sends us your referral, or your family calls our Van Nuys office directly." },
      { title: "First visit home", body: "A registered nurse visits your home, checks your vitals, organizes your medications, and answers your questions." },
      { title: "Coordinated plan", body: "Together with your physician, we set up your nursing, therapy, and aide visit schedule." },
      { title: "Steady recovery", body: "We visit regularly, coach your family, and update your doctor until you are back on your feet." },
    ],
    watchFor: [
      "Shortness of breath, new swelling in your legs, or worsening pain",
      "A fever, chills, or redness around an incision or IV site",
      "New confusion, dizziness, or unusual grogginess",
      "Confusion about which pills to take or when to take them",
    ],
    faqs: [
      {
        q: "How soon after I get home will the first visit happen?",
        a: "We aim to make your first home health visit within 48 hours of your referral or your return home, or on the specific start date ordered by your doctor. We reach out as soon as we receive your referral to schedule a time that works for you.",
      },
      {
        q: "Can the hospital refer me directly to Royal?",
        a: "Yes. Hospital discharge planners and case managers send referrals to our intake team every day. You also have the right to choose your own home health agency. Just let your discharge planner know you would like Royal Home Health Care.",
      },
      {
        q: "What if I need help with bathing and getting dressed at first?",
        a: "When you are receiving skilled nursing or therapy under a home health plan, we can include a certified home health aide to help with showering, grooming, and dressing while you regain your strength.",
      },
    ],
    related: ["post-surgical-recovery", "cardiac-care", "iv-therapy"],
    image: {
      src: "/media/care-connection.jpg",
      alt: "A registered nurse at a sunlit dining table reviewing hospital discharge instructions and a pill organizer with an older couple.",
    },
  },
  {
    slug: "post-surgical-recovery",
    category: "programs",
    title: "Post-Surgical Recovery",
    icon: "ShieldPlus",
    summary:
      "Skilled nursing and rehabilitation after joint replacement, heart, abdominal, or spine surgery, covering incision care, pain control, and safe mobility.",
    metaDescription:
      "Post-surgical home health care: incision care, pain management, blood thinner guidance, and physical therapy at home coordinated with your surgeon.",
    intro:
      "Everyone prefers recovering from surgery in their own bed, but the first couple of weeks take careful attention. Our nurses and therapists come to your home to care for your incision, help manage pain and blood thinners, and get you moving safely under your surgeon's orders.",
    overview: [
      "After an operation, our registered nurses inspect and dress your incision, watch for early signs of infection or blood clots, and help you stay on top of your pain and medication schedule. If your surgeon has you on injectable blood thinners or surgical drains, we take care of those and show your family how to manage them safely.",
      "Getting moving again is just as important as resting. When your surgeon orders rehabilitation, physical and occupational therapists work with you right in your own hallway, bedroom, and bathroom so you can climb steps, shower, and move around your home with confidence.",
    ],
    includes: [
      "Surgical incision checks, sterile dressing changes, and staple or suture care",
      "Pain management support and safe medication scheduling",
      "Close monitoring for infection, swelling, or blood clots (DVT)",
      "Blood thinner education and injections when prescribed",
      "Surgical drain measurement and care when ordered",
      "In-home physical and occupational therapy coordinated by Royal",
      "Training on safe bed transfers, walkers, and stair safety",
      "Direct progress updates sent to your surgeon and primary doctor",
    ],
    whoFor: [
      "Patients coming home after hip, knee, or shoulder replacement",
      "People recovering from back, spine, abdominal, or general surgery",
      "Patients healing after heart or vascular procedures",
      "Individuals recovering after an amputation, including mobility and prosthetic training",
    ],
    visit: defaultVisit,
    watchFor: [
      "Increasing redness, warmth, swelling, or thick drainage at the incision",
      "A fever above the temperature threshold in your discharge paperwork",
      "New calf tenderness, warmth, or swelling in one leg",
      "Pain that stays severe even after taking your prescribed medicine",
    ],
    faqs: [
      {
        q: "Will I get physical therapy at home after joint replacement?",
        a: "Yes, whenever your surgeon orders it. We coordinate licensed physical and occupational therapists who come directly to your house, so your rehabilitation and nursing visits work together under one plan.",
      },
      {
        q: "How long does home health care last after surgery?",
        a: "It depends on the procedure and how quickly you heal. Many surgical patients need home visits for a few weeks until they can comfortably travel to outpatient therapy or their surgeon's office.",
      },
      {
        q: "Do I qualify as homebound right after surgery?",
        a: "After major surgery, most patients find that leaving the house takes a taxing physical effort or requires a walker and another person's help. For that recovery period, you are usually considered homebound. Give us a call and we will talk it through with you.",
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
      "Coordinated nursing, physical, occupational, and speech therapy at home to rebuild strength, speech, and daily confidence after a stroke.",
    metaDescription:
      "Stroke recovery at home: nursing, physical, occupational, and speech therapy, blood pressure monitoring, and family training across Southern California.",
    intro:
      "Recovering from a stroke happens one step and one day at a time. Practicing those skills in your own kitchen, hallway, and living room makes a real difference. Our team brings nursing and rehabilitation therapy together around your goals and your family.",
    overview: [
      "A stroke can change how you walk, use your hands, speak, swallow, or remember things. Our registered nurses monitor your blood pressure, organize your medications, and help prevent complications while you heal. At the same time, physical, occupational, and speech therapists work with you on the everyday skills that matter most to your independence.",
      "We also care deeply about your family caregivers. We show them safe ways to help you transfer from bed to chair, communicate without frustration, and manage the health factors like blood pressure, cholesterol, and blood sugar that help protect against another stroke.",
    ],
    includes: [
      "Skilled nursing checkups, blood pressure tracking, and health monitoring",
      "Medication management, including blood thinners and blood pressure prescriptions",
      "Physical therapy focused on balance, leg strength, and walking safely",
      "Occupational therapy for dressing, bathing, meal prep, and hand coordination",
      "Speech-language therapy for clear speech, word-finding, memory, and safe swallowing",
      "Room-by-room home safety and fall prevention recommendations",
      "Hands-on caregiver coaching for safe transfers and daily routines",
      "Education on stroke warning signs and long-term prevention",
    ],
    whoFor: [
      "Patients returning home after a hospital or inpatient rehab stay for a stroke or TIA",
      "People working through weakness or numbness on one side of the body",
      "Individuals experiencing new changes in speech, swallowing, or memory",
      "Families who want practical guidance on supporting a loved one safely at home",
    ],
    callout: {
      title: "Know the signs of stroke: BE FAST",
      body: [
        "B (Balance): sudden loss of balance or coordination",
        "E (Eyes): sudden blurred or lost vision in one or both eyes",
        "F (Face): one side of the face droops when smiling",
        "A (Arm): one arm drifts downward or feels weak or numb",
        "S (Speech): slurred speech or trouble finding words",
        "T (Time): call 911 right away if you spot any of these signs",
      ],
    },
    visit: defaultVisit,
    faqs: [
      {
        q: "Can stroke rehabilitation really happen at home?",
        a: "Yes. Practicing in your actual living space means you learn how to navigate your own front steps, bathroom, and kitchen safely. When ordered by your doctor, physical, occupational, and speech therapists come right to your home.",
      },
      {
        q: "My loved one coughs when drinking water after their stroke. Can you help?",
        a: "Yes. Trouble swallowing is common after a stroke and needs prompt attention. A speech-language pathologist can evaluate swallowing at home and recommend safer liquid consistencies, food textures, and posture adjustments.",
      },
      {
        q: "How do you support family caregivers during stroke recovery?",
        a: "Family members are at the heart of stroke recovery. We show you how to protect your own back during transfers, how to practice therapy exercises together between visits, and how to encourage independence safely.",
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
      "One-on-one diabetes coaching, blood sugar tracking, foot and skin checks, and medication support so you feel steady and in control at home.",
    metaDescription:
      "Diabetes management at home: blood sugar monitoring, insulin coaching, diabetic foot checks, and medication support by registered nurses.",
    intro:
      "Living with diabetes touches almost every part of your day, from what you eat to how your body heals. Our nurses sit down with you at home to help you make sense of your blood sugar numbers, stay on top of your medications, and build simple daily habits that protect your health.",
    overview: [
      "We start by getting to know your real daily routine: what you like to eat, which medications you take, how your blood sugars behave across the day, and where things feel frustrating. From there, we work on practical skills one step at a time and share your readings with your doctor so your doses can be adjusted whenever needed.",
      "Because diabetes can slow down healing and affect circulation in your feet, eyes, heart, and kidneys, we also check your feet and skin at every visit. Catching a small blister or dry spot early is one of the best ways to prevent serious complications.",
    ],
    includes: [
      "Blood glucose monitoring and reviewing your daily patterns together",
      "Support with both oral diabetes pills and injectable medications",
      "Hands-on insulin and glucose meter coaching",
      "Simple plans for recognizing and handling low or high blood sugar",
      "Routine diabetic foot and skin exams, plus wound care when needed",
      "Practical, everyday meal and carb guidance aligned with your doctor's advice",
      "Planning ahead for sick days when blood sugars can fluctuate",
      "Sharing regular updates with your doctor so your treatment stays dialed in",
    ],
    whoFor: [
      "People adjusting to a new diabetes diagnosis",
      "Patients recently hospitalized for high or low blood sugar",
      "Individuals healing from diabetic foot ulcers or circulation issues",
      "Anyone whose diabetes medications or insulin doses were recently changed",
    ],
    visit: defaultVisit,
    watchFor: [
      "Blood sugar readings that stay outside the target range your doctor set",
      "Signs of low blood sugar such as shakiness, cold sweats, or confusion",
      "A small cut, blister, red spot, or sore on your foot that is slow to heal",
      "Redness, warmth, swelling, or a fever",
    ],
    faqs: [
      {
        q: "What will we cover during diabetes visits?",
        a: "We go at your pace. Together we cover checking and logging your blood sugar, taking your medications safely, knowing how to treat a sudden low or high, checking your feet daily, and knowing when to call your doctor.",
      },
      {
        q: "Do your nurses check my feet?",
        a: "Yes, every time we visit. Reduced circulation and nerve sensitivity can make it easy to miss a small blister on your foot, so we check carefully and show you or a family member what to look for between visits.",
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
      "Attentive skilled nursing, skin protection, gentle repositioning, and caregiver support for patients who stay mostly in bed or at home.",
    metaDescription:
      "Home health care for homebound and bedbound patients: skilled nursing, pressure injury prevention, home health aides, and family caregiver training.",
    intro:
      "When getting out of the house takes a major physical effort, or when a loved one spends most of the day in bed, good medical care should come to you. We bring doctor-directed nursing, therapy, and personal care right to your bedside with a focus on comfort, skin health, and dignity.",
    overview: [
      "Staying homebound should never mean feeling forgotten or going without attentive medical care. Our registered nurses visit regularly to monitor ongoing conditions, manage medications, and catch subtle changes early so you can avoid stressful ambulance rides to the ER.",
      "For patients who spend most or all of their time in bed or a recliner, protecting fragile skin is one of our highest priorities. We inspect pressure points at every visit, show family caregivers gentle ways to turn and position their loved one, and help arrange pressure-relieving mattresses or hospital beds through your doctor.",
    ],
    includes: [
      "Routine skilled nursing checkups and chronic illness monitoring",
      "Bedside skin checks, turning schedules, and pressure injury prevention",
      "Skilled wound care and urinary catheter care when needed",
      "Careful medication organization and safety checks",
      "Certified home health aide visits for gentle bed baths, grooming, and changing linens",
      "Physical and occupational therapy for bed mobility, positioning, and safe transfers",
      "Helping coordinate hospital beds, alternating-pressure mattresses, and Hoyer lifts",
      "Hands-on caregiver coaching and medical social worker support for families",
    ],
    whoFor: [
      "Seniors and adults who need a walker, wheelchair, or another person's help to leave home",
      "Bedbound patients who spend most of the day resting in bed or a specialty chair",
      "Individuals living with advanced neurological, cardiac, or respiratory conditions",
      "Family caregivers caring for a loved one at home who want clinical backup and training",
    ],
    visit: defaultVisit,
    watchFor: [
      "Red, purple, or darkened spots on the heels, tailbone, or hips that do not fade after turning",
      "Noticeably less interest in eating or drinking",
      "New confusion, a fever, or changes in breathing",
      "Discomfort or restlessness when lying in bed or being moved",
    ],
    faqs: [
      {
        q: "What does “homebound” mean?",
        a: "You are considered homebound if your doctor recommends staying home because of your condition, or if leaving the house requires a walker, wheelchair, special transportation, or another person's assistance and takes a taxing effort. You can still leave home for doctor visits, religious services, adult day care, and occasional family milestones.",
      },
      {
        q: "Can you help us get a hospital bed or pressure mattress?",
        a: "Yes. Your doctor can order durable medical equipment like a hospital bed, overbed table, or pressure-relieving mattress. Our nurses help identify what will make care safer and coordinate the order with your doctor and a medical equipment supplier.",
      },
      {
        q: "Do you provide 24-hour or live-in care?",
        a: "No. Home health care is provided through scheduled, part-time visits. Between visits, our registered nurses are always on call by phone after hours, on weekends, and on holidays if you have an urgent question.",
      },
    ],
    related: ["wound-care", "catheter-care", "home-health-aides"],
    image: {
      src: "/media/care-hands.jpg",
      alt: "Close-up of a clinician gently holding the hands of an older patient resting under a soft cream knit blanket.",
    },
  },
  {
    slug: "cardiac-care",
    category: "programs",
    title: "Cardiac Care",
    icon: "HeartPulse",
    summary:
      "Heart failure and post-heart-surgery nursing at home, including blood pressure checks, daily weight tracking, and medication support.",
    metaDescription:
      "Cardiac home health care: heart failure monitoring, post-heart-surgery nursing, blood pressure checks, and medication management at home.",
    intro:
      "Managing a heart condition at home is all about noticing small changes before they turn into an emergency. Our nurses visit you at home to check your heart and lungs, help organize your heart medications, and keep your cardiologist and primary doctor closely updated.",
    overview: [
      "When you are living with heart failure (CHF), simple daily habits like checking your morning weight, watching for ankle swelling, and paying attention to your breathing can reveal fluid buildup days before it lands you back in the hospital. Our nurses help you set up an easy daily routine, review your readings, and reach out to your doctor right away when your numbers shift.",
      "If you are coming home after bypass surgery, a valve repair, or a heart procedure, our nurses care for your chest or leg incisions, review your sternal and activity precautions, and help you build your stamina back safely.",
    ],
    includes: [
      "Careful heart rate, blood pressure, oxygen, and lung checks at every visit",
      "Daily weight and fluid-retention tracking for heart failure",
      "Organizing and explaining water pills (diuretics), blood thinners, and blood pressure medications",
      "Post-heart-surgery nursing, including chest and leg incision care",
      "Practical low-sodium meal and fluid tips aligned with your cardiologist's plan",
      "Pacing and energy-saving strategies for everyday activities",
      "Clear guidance on which symptoms need a call to the nurse and which need 911",
      "Direct communication with your cardiologist and primary care doctor",
    ],
    whoFor: [
      "People living with congestive heart failure (CHF)",
      "Patients returning home after a heart attack or stent procedure",
      "Individuals recovering from open-heart bypass or valve surgery",
      "Patients managing atrial fibrillation, arrhythmias, or hard-to-control blood pressure",
    ],
    visit: defaultVisit,
    watchFor: [
      "A weight gain of 2 to 3 pounds in a single day or 5 pounds in a week, or whatever threshold your cardiologist set",
      "Tighter shoes or new swelling in your feet, ankles, calves, or abdomen",
      "Feeling more winded than usual, or needing extra pillows to breathe comfortably at night",
      "Lightheadedness, a racing or fluttering heartbeat, or a persistent new cough",
    ],
    faqs: [
      {
        q: "Why do I need to weigh myself every morning?",
        a: "With heart failure, extra fluid shows up on the scale before you notice swelling or shortness of breath. Weighing yourself at the same time each morning gives you and your nurse an early heads-up so your doctor can adjust your medication at home.",
      },
      {
        q: "Can you help me keep track of all my heart medications?",
        a: "Yes. Heart patients often leave the hospital with several new prescriptions. We sit down with you, explain what each pill does, set up a clear daily organizer, and watch for side effects like dizziness.",
      },
      {
        q: "Do you coordinate with my cardiologist?",
        a: "Absolutely. We send clinical updates to both your cardiologist and your primary care physician so your entire medical team stays aligned.",
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
      "Home safety walkthroughs, medication reviews, and in-home balance and strength therapy so you can move around your house with confidence.",
    metaDescription:
      "Fall prevention and mobility care at home: fall-risk checks, home safety walkthroughs, balance and gait therapy, and walker training.",
    intro:
      "After a fall or a close call, it is completely natural to feel hesitant on your feet. Our nurses and therapists look at your strength, your medications, and the layout of your home together so we can lower your risk of falling and help you move comfortably again.",
    overview: [
      "Most falls happen because several small things add up: leg weakness after an illness, a new medication that causes lightheadedness, dim hallway lighting, or a loose throw rug. We check each of those pieces during our visit and put together a practical plan tailored to your home.",
      "When your doctor orders therapy, physical therapists work with you on leg strength, balance, and walker technique, while occupational therapists practice safe ways to step into the shower, get out of bed, and use the stairs. We also show family members how to lend a steady hand without straining their own backs.",
    ],
    includes: [
      "Comprehensive fall-risk checkup by a registered nurse or therapist",
      "Room-by-room home safety walkthrough covering lighting, stairs, rugs, and bathrooms",
      "In-home physical therapy for leg strength, balance, and steady walking",
      "Safe transfer practice for getting in and out of bed, chairs, the toilet, and the shower",
      "Proper fitting and training for walkers, canes, and wheelchairs",
      "Medication review to spot prescriptions that may cause dizziness or drops in blood pressure",
      "Practical recommendations for grab bars, shower chairs, and non-slip mats",
      "A clear family plan for what to do and who to call if a fall ever happens",
    ],
    whoFor: [
      "Anyone who has had a recent fall or near-fall at home",
      "Seniors who feel unsteady on their feet or nervous about walking to the bathroom",
      "Patients who lost muscle strength during a hospital or rehab stay",
      "People living with Parkinson's disease, stroke recovery, arthritis, or neuropathy",
    ],
    visit: defaultVisit,
    faqs: [
      {
        q: "Do you install grab bars or bathroom rails?",
        a: "While we do not do hardware installation ourselves, your therapist will show you the exact spots where grab bars, a shower bench, or a raised toilet seat will help most, and we can connect you with local resources.",
      },
      {
        q: "I feel shaky on my feet. Will the exercises be too hard?",
        a: "Never. Your physical therapist starts right where you are today, often beginning with gentle seated or bedside movements, and builds up gradually as your legs get stronger. Your safety comes first at every visit.",
      },
      {
        q: "What should I do if a fall happens?",
        a: "Take a slow breath and check for pain or injury before trying to move. If you hit your head, feel significant pain, or cannot get up safely, call 911 right away. During your visits, your therapist will also practice safe floor recovery and emergency call options with you.",
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
      "Experienced registered nurses bring wound care, IV infusions, injections, medication management, and health monitoring right to your home.",
    metaDescription:
      "Skilled nursing at home from Royal Home Health Care: registered nurses provide doctor-directed care across Los Angeles, Ventura, San Bernardino, and Orange Counties.",
    intro:
      "Our registered nurses are the anchor of your home health care team. They listen to your concerns, carry out your doctor's clinical orders, teach your family what to expect, and coordinate all of your care at home.",
    overview: [
      "Skilled nursing covers any medical care that requires the training and judgment of a licensed nurse: evaluating a changing health condition, organizing complex medications, treating wounds and catheters, administering IV infusions or injections, and teaching you how to care for yourself safely. Every visit follows a care plan signed by your doctor.",
      "Just as importantly, your nurse is someone you can talk to openly. They explain medical terms in plain English, take time to answer your family's questions, and keep your doctor updated so your treatment plan adapts as you recover.",
    ],
    includes: [
      "Head-to-toe nursing checkups and vital sign monitoring",
      "Medication reconciliation, pill organizer setup, and safety teaching",
      "Surgical wound, pressure injury, ostomy, and catheter care",
      "Home IV therapy, PICC and port care, and prescribed injections",
      "Ongoing monitoring for heart failure, COPD, diabetes, and other chronic conditions",
      "Pain management support and comfort measures",
      "In-home blood draws for doctor-ordered lab tests",
      "Hands-on family caregiver training and care coordination",
    ],
    whoFor: [
      "Patients coming home after an illness, injury, operation, or hospital stay",
      "Adults living with chronic health conditions that need close nursing oversight",
      "Anyone adjusting to a new medical diagnosis, complex prescriptions, or home medical equipment",
    ],
    visit: defaultVisit,
    faqs: [
      {
        q: "Are all of your nurses licensed?",
        a: "Yes. All skilled nursing visits are performed by licensed nurses working directly under your physician's signed plan of care.",
      },
      {
        q: "How often will my nurse visit?",
        a: "Your doctor sets your visit schedule based on your medical needs. Most patients have more frequent visits during their first couple of weeks home and fewer visits as they feel stronger.",
      },
    ],
    related: ["wound-care", "iv-therapy", "diabetic-injections"],
    image: {
      src: "/media/nurse-visit.jpg",
      alt: "A registered nurse checking the blood pressure and pulse oximetry of a smiling older woman in a sunlit California living room.",
    },
  },
  {
    slug: "home-health-aides",
    category: "core",
    title: "Home Health Aides",
    icon: "HandHeart",
    summary:
      "Kind, certified aides who help with bathing, grooming, dressing, and safe transfers while always respecting your dignity and privacy.",
    metaDescription:
      "Certified home health aides assist with bathing, grooming, dressing, and safe mobility as part of your physician-ordered home health plan.",
    intro:
      "Our certified home health aides are there for the everyday personal routines that help you feel refreshed and comfortable. Whether helping with a warm shower, getting dressed, or moving safely from bed to chair, they treat you with patience and genuine warmth.",
    overview: [
      "Home health aides provide hands-on personal care as part of your overall home health plan, always supervised by a registered nurse. Because aides spend unhurried time helping with daily routines, they are also wonderful at noticing small changes in skin, appetite, or energy and letting your nurse know right away.",
      "Home health aide visits are provided alongside skilled nursing or rehabilitation therapy. Visits are scheduled on a part-time, intermittent basis rather than 24-hour live-in care.",
    ],
    includes: [
      "Safe assistance with showers, tub baths, or gentle bed baths",
      "Hair care, shaving, oral hygiene, and daily skin care",
      "Help getting dressed and using the bathroom safely",
      "Steady support with walking and transferring between bed and chair",
      "Practicing simple daily movement routines set by your therapist",
      "Keeping your registered nurse informed about how you are doing",
    ],
    whoFor: [
      "Patients who need a steady hand with bathing and personal care while recovering",
      "Seniors who feel unsteady or fatigued stepping into the shower alone",
      "Families who welcome extra help with a loved one's personal care routine",
    ],
    faqs: [
      {
        q: "Who supervises the home health aides?",
        a: "One of our registered nurses creates the personal care instructions for your aide and supervises their visits.",
      },
    ],
    related: ["homebound-bedbound-care", "skilled-nursing", "fall-risk-mobility"],
    image: {
      src: "/media/care-companionship.jpg",
      alt: "A compassionate female nurse in navy scrubs sitting beside a smiling older gentleman on a sofa reviewing a care plan folder.",
    },
  },
  {
    slug: "physical-therapy",
    category: "core",
    title: "Physical Therapy",
    icon: "PersonStanding",
    byArrangement: true,
    summary:
      "In-home physical therapy to rebuild leg strength, balance, and walking confidence after surgery, illness, or a fall.",
    metaDescription:
      "Physical therapy at home after surgery, stroke, illness, or a fall: strength, balance, gait training, and fall prevention coordinated by Royal Home Health Care.",
    intro:
      "Whether you are recovering from a joint replacement, an illness, or a recent fall, physical therapists work with you right in your own living room and hallway to rebuild strength, steady your balance, and help you walk with confidence.",
    overview: [
      "Doing physical therapy at home is practical and personal. Instead of practicing in a gym across town, you practice on your own front steps, down your own hallway, and getting up from your own favorite chair. Your therapist sets realistic goals with you and gives you a few simple exercises to practice between visits.",
      "Physical therapy is provided by arrangement with trusted, licensed local therapy partners and coordinated by our team so it fits seamlessly alongside your nursing visits.",
    ],
    includes: [
      "Leg and core strength and stamina rebuilding",
      "Balance and steady walking (gait) training",
      "Muscle re-education after a stroke, surgery, or injury",
      "Prosthetic and mobility training after an amputation",
      "Fitting and safe training with walkers, canes, and wheelchairs",
      "Gentle pain-relief movements and joint mobility work",
      "Clear, easy-to-follow home exercise routines",
    ],
    whoFor: [
      "Patients returning home after hip, knee, spine, or other surgeries",
      "People regaining movement after a stroke or neurological illness",
      "Anyone who has fallen recently or feels wobbly on their feet",
    ],
    faqs: [
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
      "Practical therapy to help you dress, shower, cook, and manage daily routines safely using smart techniques and adaptive tools.",
    metaDescription:
      "Occupational therapy at home: support with dressing, bathing, daily routines, adaptive equipment, and home safety coordinated by Royal Home Health Care.",
    intro:
      "Occupational therapy focuses on the everyday routines that make you feel independent at home, like getting dressed in the morning, stepping safely into the shower, and fixing a meal in your kitchen.",
    overview: [
      "Occupational therapists look closely at the daily tasks that have become tiring or tricky and help you find safer, easier ways to handle them. That might mean practicing a new technique, setting up your bathroom more safely, or using helpful tools like a reacher, shower bench, or button hook.",
      "Occupational therapy is provided by arrangement with trusted, licensed therapy partners and coordinated by Royal as part of your overall plan of care.",
    ],
    includes: [
      "Hands-on practice with dressing, bathing, grooming, and bathroom transfers",
      "Training with helpful adaptive tools and assistive devices",
      "Pacing and energy-saving tips for patients who tire easily",
      "Practical bathroom and kitchen safety recommendations",
      "Exercises to improve hand strength, grip, and fine-motor coordination",
    ],
    whoFor: [
      "Patients recovering from a stroke, joint surgery, or extended hospital stay",
      "People living with arthritis, tremors, or reduced hand strength",
      "Anyone finding everyday self-care routines harder than they used to be",
    ],
    faqs: [
      {
        q: "What is the difference between physical therapy and occupational therapy?",
        a: "Physical therapy focuses on overall strength, balance, and walking from place to place. Occupational therapy focuses on what you do once you get there, like showering safely, buttoning a shirt, or preparing breakfast.",
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
      "Patient, encouraging therapy at home for clear speech, word-finding, memory, and safe swallowing after a stroke or neurological change.",
    metaDescription:
      "Speech-language therapy at home for communication, voice, cognition, and safe swallowing after stroke or illness, coordinated by Royal Home Health Care.",
    intro:
      "After a stroke, surgery, or neurological condition, changes in how you speak or swallow can be deeply frustrating. Speech-language pathologists work with you calmly at home to strengthen your voice, communication, and safe swallowing.",
    overview: [
      "Speech-language therapy supports speaking, understanding, word-finding, reading, and memory skills, as well as vocal strength and swallowing safety. Your therapist also shares practical tips with your family so everyday conversations feel natural and unhurried.",
      "Speech-language therapy is provided by arrangement with trusted, licensed therapy partners and coordinated by Royal as part of your plan of care.",
    ],
    includes: [
      "Speech clarity, language, and word-finding therapy",
      "Swallowing evaluations and safe eating and drinking techniques",
      "Voice strengthening exercises",
      "Memory, attention, and problem-solving exercises",
      "Practical communication coaching for family members",
    ],
    whoFor: [
      "People recovering speech or swallowing skills after a stroke",
      "Patients living with Parkinson's disease or other neurological conditions",
      "Anyone who coughs, clears their throat often, or feels food stick when eating or drinking",
    ],
    faqs: [
      {
        q: "Can a speech therapist really help with swallowing problems?",
        a: "Yes. Speech-language pathologists are specially trained in the muscles of the throat and mouth. They evaluate swallowing at home and recommend targeted exercises, posture tips, and safer food and liquid textures.",
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
      "Compassionate social workers who help families navigate community resources, caregiver support, and long-term care planning.",
    metaDescription:
      "Medical social services at home: assistance with community resources, caregiver support, and long-term care planning coordinated by Royal Home Health Care.",
    intro:
      "A serious health change affects the whole family, not just the patient. Medical social workers sit down with you at home to help untangle practical challenges, connect you with local programs, and support your family's well-being.",
    overview: [
      "Recovery goes much smoother when a family feels supported at home. Medical social workers help with the practical and emotional side of care, from finding meal delivery, transportation, or financial assistance programs across Southern California to talking through long-term care options and advance directives.",
      "Medical social services are provided by arrangement and coordinated by Royal as part of your physician-approved plan of care.",
    ],
    includes: [
      "Connecting you with local community programs, meal services, and financial resources",
      "Guidance on long-term care planning and advance healthcare directives",
      "Supportive counseling for patients and family members adjusting to illness",
      "Helping family caregivers find local support groups and respite options",
    ],
    whoFor: [
      "Patients and families navigating practical or financial hurdles at home",
      "Families planning ahead for a loved one's long-term care needs",
      "Family caregivers feeling stretched thin who need local support resources",
    ],
    faqs: [
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
      "We coordinate the sterile dressings, catheter kits, and home medical equipment your care plan calls for, delivered right to your home.",
    metaDescription:
      "Medical supply coordination for home health patients: wound dressings, catheter supplies, and equipment arranged by Royal Home Health Care.",
    intro:
      "Tracking down sterile wound dressings, catheter kits, or a walker should not fall on your family's shoulders while you are recovering. We coordinate the medical supplies and equipment your care plan requires and arrange delivery to your door.",
    overview: [
      "Routine medical supplies used during your home health care, such as sterile gauze, specialty wound dressings, and catheter care supplies, are coordinated as part of your home health plan. We keep track of what you have on hand so your nurse always has what is needed.",
      "When you also need durable medical equipment like a walker, wheelchair, commode, or hospital bed, we help your doctor submit the order and coordinate delivery with a trusted medical equipment supplier.",
    ],
    includes: [
      "Sterile wound care and specialty dressing supplies",
      "Urinary catheter and ostomy care supplies",
      "Coordinating doctor orders for walkers, wheelchairs, and hospital beds",
      "Hands-on guidance so you and your family know how to use everything safely",
    ],
    whoFor: [
      "Home health patients whose nursing care requires dressings, catheter kits, or clinical supplies",
      "Patients who need mobility or bedroom equipment to stay safe at home",
    ],
    faqs: [
    ],
    related: ["wound-care", "catheter-care", "homebound-bedbound-care"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (cat: ServiceCategory) => services.filter((s) => s.category === cat);

