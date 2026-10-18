/**
 * MEDIA FILES — drop your own assets into `public/media/` using EXACTLY
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
  /** Caregiver and older man holding hands, smiling (portrait 4:5) */
  companionship: `${base}/care-companionship.jpg`,
  /** Nurse checking an older woman's blood pressure at home (landscape 3:2) */
  nurseVisit: `${base}/nurse-visit.jpg`,
  /** Older woman smiling up at a nurse (landscape 3:2) */
  connection: `${base}/care-connection.jpg`,
  /** Close-up of a caregiver holding an older person's hands (portrait 4:5) */
  hands: `${base}/care-hands.jpg`,
  /** Contact band background — decorative */
  cta: `${base}/cta-home.jpg`,
};
