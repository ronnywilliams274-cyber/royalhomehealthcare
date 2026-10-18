/**
 * MEDIA FILES - drop your own assets into `public/media/` using EXACTLY
 * these names and the site picks them up automatically. Every slot has a
 * graceful fallback: video → poster image → designed gradient.
 *
 * Paths start with "/" so they work on every page URL (e.g. /services/wound-care).
 * See MEDIA-GUIDE.md for sizes and the alt-text rules each photo must follow.
 */

const base = "/media";

export const media = {
  heroDesktop: {
    video: [`${base}/hero-desktop.webm`, `${base}/hero-desktop.mp4`],
    poster: `${base}/hero-poster-desktop.jpg`,
  },
  heroMobile: {
    video: [`${base}/hero-mobile.webm`, `${base}/hero-mobile.mp4`],
    poster: `${base}/hero-poster-mobile.jpg`,
  },
  /** Caregiver and older man reviewing a care plan together on a sunlit sofa (portrait 4:5) */
  companionship: `${base}/care-companionship.jpg`,
  /** Nurse checking an older woman's blood pressure and pulse oximetry at home (landscape 3:2) */
  nurseVisit: `${base}/nurse-visit.jpg`,
  /** Nurse reviewing hospital discharge instructions and pill organizer with an older couple (landscape 3:2) */
  connection: `${base}/care-connection.jpg`,
  /** Close-up of a clinician gently holding an older person's hands (portrait 4:5) */
  hands: `${base}/care-hands.jpg`,
  /** Skilled nurse preparing sterile wound & clinical supplies beside a smiling patient (landscape 3:2) */
  specialtyNursing: `${base}/specialty-nursing.jpg`,
  /** Physical therapist guiding a smiling older adult walking with a walker at home (landscape 3:2) */
  specialtyTherapy: `${base}/specialty-therapy.jpg`,
  /** Registered nurse listening to an older man's heart with a stethoscope at home (landscape 3:2) */
  cardiacCare: `${base}/about-care.jpg`,
  /** Contact band background - sunlit Southern California living room */
  cta: `${base}/cta-home.jpg`,
};

/**
 * Optimized WebP versions of each photo (generated from the JPGs above).
 * SmartImage and the hero use them automatically through <picture>/srcset, so phones
 * download a small file and large screens a sharp one. The JPG stays as the fallback.
 *
 * IF YOU REPLACE A PHOTO: also replace or delete its "-<width>.webp" files, or the old
 * photo will keep showing in modern browsers. `npm run build` warns when a JPG is newer
 * than its WebP versions. Free tool: https://squoosh.app (WebP, quality ~75).
 */
export type ImageVariants = { w: number; h: number; webp: [string, number][] };
export const imageVariants: Record<string, ImageVariants> = {
  "/media/about-care.jpg": { w: 1264, h: 848, webp: [["/media/about-care-640.webp", 640], ["/media/about-care-960.webp", 960], ["/media/about-care-1264.webp", 1264]] },
  "/media/care-companionship.jpg": { w: 896, h: 1200, webp: [["/media/care-companionship-480.webp", 480], ["/media/care-companionship-800.webp", 800], ["/media/care-companionship-896.webp", 896]] },
  "/media/care-connection.jpg": { w: 1264, h: 848, webp: [["/media/care-connection-640.webp", 640], ["/media/care-connection-960.webp", 960], ["/media/care-connection-1264.webp", 1264]] },
  "/media/care-hands.jpg": { w: 896, h: 1200, webp: [["/media/care-hands-480.webp", 480], ["/media/care-hands-800.webp", 800], ["/media/care-hands-896.webp", 896]] },
  "/media/nurse-visit.jpg": { w: 1264, h: 848, webp: [["/media/nurse-visit-640.webp", 640], ["/media/nurse-visit-960.webp", 960], ["/media/nurse-visit-1264.webp", 1264]] },
  "/media/specialty-nursing.jpg": { w: 1264, h: 848, webp: [["/media/specialty-nursing-640.webp", 640], ["/media/specialty-nursing-960.webp", 960], ["/media/specialty-nursing-1264.webp", 1264]] },
  "/media/specialty-therapy.jpg": { w: 1264, h: 848, webp: [["/media/specialty-therapy-640.webp", 640], ["/media/specialty-therapy-960.webp", 960], ["/media/specialty-therapy-1264.webp", 1264]] },
  "/media/cta-home.jpg": { w: 1280, h: 714, webp: [["/media/cta-home-640.webp", 640], ["/media/cta-home-960.webp", 960], ["/media/cta-home-1280.webp", 1280]] },
  "/media/hero-poster-desktop.jpg": { w: 1920, h: 1080, webp: [["/media/hero-poster-desktop-960.webp", 960], ["/media/hero-poster-desktop-1440.webp", 1440], ["/media/hero-poster-desktop-1920.webp", 1920]] },
  "/media/hero-poster-mobile.jpg": { w: 1080, h: 1920, webp: [["/media/hero-poster-mobile-540.webp", 540], ["/media/hero-poster-mobile-828.webp", 828], ["/media/hero-poster-mobile-1080.webp", 1080]] },
};

/** srcset string for a photo's WebP versions, or undefined when none exist. */
export function webpSrcSet(src: string): string | undefined {
  const v = imageVariants[src];
  return v ? v.webp.map(([url, w]) => `${url} ${w}w`).join(", ") : undefined;
}

