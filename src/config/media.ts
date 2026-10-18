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
