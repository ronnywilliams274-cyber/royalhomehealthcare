# ADA & WCAG 2.1 AA Compliance Report
**Royal Home Health Care, Inc. — website**
Prepared October 18, 2026 · Standard: WCAG 2.1 Level A + AA

> This is a technical accessibility review, not legal advice. Please have your attorney confirm
> which laws apply to your agency and how.

---

## 1. Bottom line

**Yes, the original site needed fixes.** We found **16 types of barriers** on the original site,
including some that fully block people who use a keyboard or screen reader. All of them are fixed in
the upgraded site.

| | Original site | Upgraded site |
|---|---|---|
| Automated WCAG 2.1 A/AA checks | 40+ issues on the home page alone | **0 issues** on all 32 pages |
| Text colour contrast | 35+ text elements below 4.5:1 | **3,694 text elements measured — all pass** |
| Keyboard-only use | No skip link; 6 invisible tab stops; focus ring invisible on dark sections | Skip link; 84 tab stops on home, every one visible with a ring |
| Moving content | Video + scrolling marquee with no way to stop them | Pause buttons on both; marquee also pauses on hover/keyboard focus; both stop for "reduce motion" |
| Image descriptions | 3 photos described scenes they didn't show | Accurate descriptions; decorative images hidden |
| Form | Placeholder-only fields, no error messages | Visible labels, error summary, inline errors |

**What only you can do** is listed in [section 7](#7-owner-action-items).

---

## 2. Why this matters now

- **HHS Section 504 rule (45 CFR Part 84).** Health care providers that receive HHS federal financial
  assistance (for example, Medicare Part A payments) must make their websites conform to
  **WCAG 2.1 Level AA**. In May 2026 HHS extended the deadlines by one year with an interim final
  rule: **May 11, 2027** for organizations with 15 or more employees, **May 2028** for fewer than
  15. The technical standard did not change, and the rule's general effective-communication
  duties already apply.
- **ADA Title III.** Private health care providers are "public accommodations." There is no separate
  federal web regulation for Title III, but WCAG 2.1 AA is the benchmark used in DOJ guidance,
  settlements and the large volume of demand letters and lawsuits against health care websites.
- **Section 1557 (ACA)** adds notice requirements for language assistance and auxiliary aids
  (see action item 7).

Sources: HHS interim final rule, *Federal Register* May 11, 2026 (summarized by
[EDUCAUSE](https://er.educause.edu/articles/2026/6/doj-and-hhs-extend-web-accessibility-deadlines-to-2027-2028)
and [Pivotal Accessibility](https://www.pivotalaccessibility.com/2026/06/hhs-section-504-web-accessibility-deadline-extended/));
[Medicare.gov — Home health services](https://www.medicare.gov/coverage/home-health-services).

---

## 3. Your four specific requests

| Request | Status | Details |
|---|---|---|
| **WCAG 2.1 Level AA** | ✅ Done | Every A and AA success criterion reviewed — see the checklist in section 8. |
| **Alt text for images** | ✅ Done | Every content photo has an accurate description; decorative images use `alt=""`; all icons are hidden from screen readers and paired with text. Three photos on the old site had **inaccurate** alt text (e.g. "nurse providing wound care" on a photo of a blood-pressure check in a clinic) — a WCAG 1.1.1 failure. Those photos were retired. |
| **Closed captions for videos** | ✅ Ready | The only video today is the **silent, decorative hero background**. Captions are required for audio content, so this video doesn't need them; it's hidden from screen readers, has a **Pause** button, and doesn't autoplay for people who ask for reduced motion. For any future video with speech, use the new `CaptionedVideo` component (captions on by default, transcript button) and the caption template at `public/media/captions/TEMPLATE.en.vtt`. |
| **Full keyboard navigation** | ✅ Done | Skip link, logical tab order, visible focus everywhere, keyboard-operable Services menu (Enter/Escape), mobile menu as a proper dialog with focus trap and focus return, FAQ accordions, form errors, and focus moved to the page heading after every page change. |

---

## 4. Barriers found on the original site → fixes

| # | Barrier on the original site | WCAG | Fix in the upgraded site |
|---|---|---|---|
| 1 | No "skip to content" link — keyboard users had to tab through the whole menu on every page | 2.4.1 | Skip link is the first tab stop on every page |
| 2 | Hidden mobile-menu links stayed focusable — 6 **invisible** tab stops on phones, plus content that was still faded out when tabbed to | 2.4.3, 2.4.7 | Menu is only rendered when open; it's a modal dialog with focus trap, Escape to close and focus return |
| 3 | Focus outline was dark green on dark-green sections — **invisible** | 2.4.7, 1.4.11 | Two-tone focus system: forest ring on light sections, gold ring on dark (8.3:1) |
| 4 | Menu links scrolled the page but left keyboard focus at the top | 2.4.3 | Real pages; on navigation, focus moves to the new page's heading and the change is announced |
| 5 | Background video autoplayed with **no way to pause**, even with "reduce motion" on | 2.2.2 | Pause/Play button; no autoplay when reduced motion is requested; site-wide "Reduce motion" switch in footer |
| 6 | Auto-scrolling marquee with no pause control | 2.2.2 | "We work with" strip now has a visible Pause button, pauses on hover and keyboard focus, is read once by screen readers, and is a static list when motion is reduced or JavaScript is off |
| 7 | 35+ text elements failed contrast (gold labels 2.5:1, "by arrangement" tags 3.6:1, contact labels 4.2:1, footer 3.6:1, step numbers 2.5:1) | 1.4.3 | New accessible palette: gold-ink `#7d5f26` on light (5.3:1), gold-light `#d6b77c` on dark (8.3:1), moss `#4a5745` secondary text (6.9:1). Every pairing measured. |
| 8 | Three photos had alt text describing things not in the photo | 1.1.1 | Accurate alt text; mismatched stock photos retired |
| 9 | Contact form used placeholders instead of labels; no error messages; required fields not indicated; no autocomplete | 1.3.1, 1.3.5, 3.3.1, 3.3.2, 3.3.3 | Visible labels with "(required)"/"(optional)", autocomplete tokens, error summary that receives focus with links to each field, inline errors, polite status messages |
| 10 | One page title for the whole site | 2.4.2 | Unique, descriptive title on all 32 pages |
| 11 | Hero heading sized in viewport units (doesn't grow when users zoom) | 1.4.4 | Fluid `clamp(rem…)` type that scales with browser zoom |
| 12 | Content was invisible until JavaScript animations ran (blank sections if a script failed) | 4.1.2 / robustness | Pages are prerendered HTML; animations are progressive enhancement and fall back to visible content |
| 13 | 1.4-second intro screen covered the page | 2.2.1 (usability) | Removed |
| 14 | Statistic counters started at "0" in the page | 1.3.1 | Real values in the HTML; count-up is visual only |
| 15 | Service accordion buttons weren't linked to their panels | 4.1.2 | Native `<details>` FAQs; disclosure buttons use `aria-expanded` + `aria-controls` |
| 16 | Single long page — no breadcrumbs, site map or second way to find content | 2.4.5, 2.4.8 | 31 real pages, breadcrumbs, HTML site map, consistent header and footer navigation |

---

## 5. Accessibility features in the upgraded site

**Perceivable** — accurate alt text · decorative media hidden · AA contrast for all text and form
borders · hero text stays above 4.5:1 even if the video showed pure white behind it (scrim tuned for
worst case) · text resizes to 200% · reflows to 320 px wide with no sideways scrolling · survives
increased letter/word/line spacing · works in Windows High Contrast mode · prints cleanly.

**Operable** — everything works by keyboard · skip link · visible focus · no keyboard traps ·
Services menu opens on click/Enter (never on hover alone) and closes with Escape · Pause button for
the hero · "Reduce motion" switch · respects the operating-system reduced-motion setting (no smooth
scrolling, no reveals, no particles) · no time limits · no flashing content · buttons and menu controls at least 44 px tall.

**Understandable** — plain-language content (about 8th-grade reading level) · `lang="en"` ·
consistent navigation on every page · clear form instructions and error suggestions · links that open
a new tab say so.

**Robust** — semantic HTML5 landmarks and headings (one `<h1>` per page, no skipped levels) · valid
ARIA only where native HTML isn't enough · status messages announced via live regions · every page
works without JavaScript.

---

## 6. How we tested

1. **Automated WCAG 2.1 A/AA checks** on all 32 pages using Chromium's accessibility tree: accessible
   names for every link, button, field and image; headings; landmarks; duplicate IDs; broken ARIA
   references; focusable elements hidden from assistive tech; link distinguishability; page titles;
   language.
2. **Contrast measurement** of 3,694 visible text elements, plus a worst-case analysis of text over
   the hero video at desktop and phone sizes.
3. **Reflow & text-spacing** tests on every page at 320 px and with WCAG 1.4.12 spacing applied.
4. **Keyboard walkthroughs:** skip link, 84 tab stops on the home page, Services menu, mobile menu
   dialog, contact form errors, page-change focus, hero Pause button.
5. **Reduced-motion and no-JavaScript** runs.

**Result: 0 issues.**

**Limitations:** the popular axe-core engine and WAVE could not be installed in the build environment,
so the automated checks were custom-written. Automated tools catch roughly a third of real-world
problems. **Before launch, please:** (a) run [WAVE](https://wave.webaim.org/) or axe DevTools on the
live site, and (b) have someone do a short screen-reader pass (NVDA on Windows or VoiceOver on
iPhone/Mac) — book a visit, open the menu, submit the form.

---

## 7. Owner action items

These can't be completed in code:

1. **Verify the complaint numbers** in `src/data/site.ts` → `compliance.cdph` (copied from printed
   materials; not confirmed on CDPH's website). Add your **CMS Certification Number** and **license
   number**, and set **`siteUrl`** to your domain.
2. **Run `npm run build` on your computer** and deploy the `dist/` folder (the build tools on this
   project are installed for Windows; the cloud workspace verified the same code with an equivalent
   build).
3. **Photos:** replace the video-frame images with real photos of your team (with releases) and
   update the alt text — see `MEDIA-GUIDE.md`.
4. **PDFs & documents** you post (admission packets, patient rights) must be accessible too —
   tagged PDFs or HTML pages.
5. **Third-party tools** — patient portals, scheduling, chat widgets, payment pages — must also meet
   WCAG 2.1 AA under the HHS rule. Ask vendors for an Accessibility Conformance Report (VPAT).
   Avoid "accessibility overlay" widgets; they don't make a site compliant.
6. **Section 504 coordinator & grievance procedure** — required for recipients with 15+ employees.
7. **Have counsel review the nondiscrimination notice** against current Section 1557 notice rules
   (which may require taglines in the most common non-English languages in California), and make
   sure staff can deliver what the site promises: large print, 711 relay calls, language assistance.
8. **Contact form:** set `VITE_FORM_ENDPOINT` so messages arrive directly; if you expect protected
   health information, use a HIPAA-eligible form service with a BAA. The form already tells visitors
   not to include medical details.
9. **Keep it compliant:** any new video needs captions + transcript; any new image needs accurate alt
   text; re-test after major content changes and at least once a year (update
   `accessibilityReviewed` in `site.ts`).

---

## 8. WCAG 2.1 Level A & AA checklist

✅ supports · ➖ not applicable (no such content) · 👤 depends on future content you add

| Criterion | Level | Status | How |
|---|---|---|---|
| 1.1.1 Non-text Content | A | ✅ | Accurate alt text; decorative images/icons hidden |
| 1.2.1 Audio-only & Video-only | A | ✅ | Hero video is decorative (no information conveyed) |
| 1.2.2 Captions (Prerecorded) | A | ✅ 👤 | No video with audio today; `CaptionedVideo` + VTT template for future videos |
| 1.2.3 Audio Description or Alternative | A | ✅ 👤 | Transcript support built into `CaptionedVideo` |
| 1.2.4 Captions (Live) | AA | ➖ | No live video |
| 1.2.5 Audio Description | AA | ✅ 👤 | `descriptions` track support; describe visuals in narration |
| 1.3.1 Info & Relationships | A | ✅ | Landmarks, headings, lists, labelled fields, `dl` for facts |
| 1.3.2 Meaningful Sequence | A | ✅ | DOM order matches reading order |
| 1.3.3 Sensory Characteristics | A | ✅ | No "click the green button"-style instructions |
| 1.3.4 Orientation | AA | ✅ | Works in portrait and landscape |
| 1.3.5 Identify Input Purpose | AA | ✅ | `autocomplete` on name, tel, email, postal code |
| 1.4.1 Use of Color | A | ✅ | Inline links underlined; errors use icon + text |
| 1.4.2 Audio Control | A | ✅ | No autoplaying audio |
| 1.4.3 Contrast (Minimum) | AA | ✅ | 3,694 elements measured |
| 1.4.4 Resize Text | AA | ✅ | rem-based fluid type |
| 1.4.5 Images of Text | AA | ✅ | All text is real text |
| 1.4.10 Reflow | AA | ✅ | No horizontal scroll at 320 px |
| 1.4.11 Non-text Contrast | AA | ✅ | Field borders 4.5:1; focus rings 8:1+ |
| 1.4.12 Text Spacing | AA | ✅ | No clipping with WCAG spacing |
| 1.4.13 Content on Hover/Focus | AA | ✅ | Menus open on click; dismissible with Escape |
| 2.1.1 Keyboard | A | ✅ | All functions keyboard-operable |
| 2.1.2 No Keyboard Trap | A | ✅ | Only the open mobile dialog contains focus, and Escape exits |
| 2.1.4 Character Key Shortcuts | A | ➖ | None |
| 2.2.1 Timing Adjustable | A | ✅ | No time limits; intro screen removed |
| 2.2.2 Pause, Stop, Hide | A | ✅ | Pause buttons (hero video and payer strip); reduced-motion respected |
| 2.3.1 Three Flashes | A | ✅ | No flashing |
| 2.4.1 Bypass Blocks | A | ✅ | Skip link + landmarks |
| 2.4.2 Page Titled | A | ✅ | Unique titles |
| 2.4.3 Focus Order | A | ✅ | Logical order; focus managed on page change and dialogs |
| 2.4.4 Link Purpose | A | ✅ | Descriptive link text; card links named by service |
| 2.4.5 Multiple Ways | AA | ✅ | Navigation, footer, breadcrumbs, site map |
| 2.4.6 Headings & Labels | AA | ✅ | Descriptive headings and labels |
| 2.4.7 Focus Visible | AA | ✅ | Visible ring on every focusable element |
| 2.5.1 Pointer Gestures | A | ✅ | No multipoint/path gestures |
| 2.5.2 Pointer Cancellation | A | ✅ | Standard click activation |
| 2.5.3 Label in Name | A | ✅ | Accessible names contain visible text |
| 2.5.4 Motion Actuation | A | ➖ | None |
| 3.1.1 Language of Page | A | ✅ | `lang="en"` |
| 3.1.2 Language of Parts | AA | ✅ 👤 | Mark any non-English passages you add with `lang` |
| 3.2.1 On Focus | A | ✅ | No context changes on focus |
| 3.2.2 On Input | A | ✅ | No auto-submit |
| 3.2.3 Consistent Navigation | AA | ✅ | Same header/footer everywhere |
| 3.2.4 Consistent Identification | AA | ✅ | Same labels for same functions |
| 3.3.1 Error Identification | A | ✅ | Error summary + inline errors |
| 3.3.2 Labels or Instructions | A | ✅ | Visible labels, required/optional marked |
| 3.3.3 Error Suggestion | AA | ✅ | Errors explain how to fix |
| 3.3.4 Error Prevention (Legal/Financial) | AA | ➖ | No legal or financial transactions |
| 4.1.1 Parsing | A | ✅ | No duplicate IDs; valid nesting |
| 4.1.2 Name, Role, Value | A | ✅ | Native controls; correct ARIA states |
| 4.1.3 Status Messages | AA | ✅ | Form status and page changes announced |
