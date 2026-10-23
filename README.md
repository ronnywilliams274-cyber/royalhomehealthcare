# Royal Home Health Care, Inc. - Website

Marketing website for **Royal Home Health Care, Inc.**, a licensed home health
agency at 14328 Victory Blvd., Suite 203, Van Nuys, CA 91401.

Built with **Vite + React 19 + Tailwind CSS 3 + React Router 7**. Every page is **prerendered to
static HTML** at build time, so it loads fast, ranks well and works even before JavaScript runs.
Animations are lightweight CSS driven by a single IntersectionObserver (see *Performance* below).

> Accessibility: the site is built to **WCAG 2.1 Level AA**. See `ADA-COMPLIANCE-REPORT.md` for what
> was fixed, how it was tested, and the few items only the agency can complete.

---

## Quick start

```bash
npm install          # first time only
npm run dev          # http://localhost:3000 - live-reloading development server
npm run build        # type-check, build, and prerender every page into dist/
npm run preview      # preview the production build locally
```

`npm run build` runs three steps:

1. `tsc -b` - TypeScript type-check
2. `vite build` - bundles the app into `dist/`
3. `node scripts/prerender.mjs` - writes a complete HTML file for every page
   (`dist/services/wound-care/index.html`, etc.), plus `404.html`, `robots.txt`
   and - once your domain is set - `sitemap.xml` and canonical tags.

## Before launch - fill these in

All facts live in **`src/data/site.ts`** (one file, no code knowledge needed):

| Field | Why |
|---|---|
| `siteUrl` | Your real domain (e.g. `https://www.yourdomain.com`). Enables canonical URLs, social previews and `sitemap.xml`. |
| `licenseNumber` | California license number - shown in the footer. |
| `compliance.cdph` | **Verify** the CDPH complaint phone/fax numbers (copied from printed materials). |

Optional: create a `.env` file with `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` (or any service
that accepts a JSON POST) so the contact form sends messages directly. Without it, the form opens the
visitor's email app with the message pre-filled.

## Deploying

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages,
cPanel/Apache). Each page is a real folder with an `index.html`, so no server rewrites are needed.
The site must be served from the root of the domain (`/`).

## Project map

```
src/
  data/site.ts          ← contact info, hours, coverage, compliance text (edit facts here)
  data/services.ts      ← all 20 services: page copy, FAQs, related services
  data/faqs.ts          ← FAQ page content
  routes.ts             ← page titles & meta descriptions
  pages/                ← one file per page type
  sections/             ← home page sections + footer
  components/           ← header/nav, layout, forms, cards, accessible video player
  hooks/                ← scroll helpers, reveal animations, reduced-motion preference
  entry-server.tsx      ← used only by the prerender step
scripts/prerender.mjs   ← static HTML generation
public/media/           ← photos & video (see MEDIA-GUIDE.md)
```

### Pages (30)

Home · Services · 20 service pages · FAQs · About · Service Areas · Referrals ·
Contact · Accessibility Statement · Nondiscrimination & Patient Rights · Site Map · 404

## Content guardrails

- No invented facts, staff names, statistics, awards or testimonials.
- No outcome guarantees; clinical copy is in plain language (about 8th-grade reading level).
- Home health is described as intermittent visits - never 24-hour care. The on-call RN is phone access.
- Therapy, social services and supplies are described as "provided by arrangement and coordinated by Royal".

## Performance (mobile first)

Measured on an emulated mid-range phone (4× CPU slowdown), home page, before → after the
October 2026 performance pass:

| | Before | After |
|---|---|---|
| Data downloaded | 2.27 MB | 0.65 MB |
| JavaScript (compressed) | 317 KB | 135 KB |
| Total blocking time | 0.8–1.7 s | ~0.14 s |
| Scrolling | 43–45 fps, janky frames | 60 fps, no janky frames |
| Main-thread work while scrolling (9 s) | 5.1 s | 1.5 s |

How it stays fast - please keep these rules when adding features:

- **Native scrolling only.** No smooth-scroll library (it made scrolling lag behind the finger).
- **No animation libraries or WebGL.** Reveals use one IntersectionObserver + CSS
  `opacity`/`transform` transitions (`src/hooks/useScrollAnimations.ts`); nothing runs per scroll frame.
- **No `backdrop-filter` blur** on fixed or large elements (header, call bar, cards) - it forces the
  phone to re-blur the page on every scroll frame. Use solid or semi-opaque colours instead.
- **Off-screen sections skip rendering** (`content-visibility: auto` in `src/index.css`).
- **Photos ship as responsive WebP** (`imageVariants` in `src/config/media.ts`, used automatically by
  `SmartImage`); the hero poster is preloaded on the home page only.
- **The hero video** (≈150–500 KB) loads only after the page is idle, is skipped on Data Saver and
  slow connections, and pauses whenever it is scrolled out of view.
- **Hover effects only on devices that can hover** (`future.hoverOnlyWhenSupported` in
  `tailwind.config.js`), so taps on phones never leave cards stuck in a hover state.
- `gsap`, `lenis`, `three` and `@types/three` are no longer used; you can remove them with
  `npm uninstall gsap lenis three @types/three` when convenient.

## Older files

The `app/`, `components/`, `content/` and `lib/` folders at the project root belong to an earlier,
unfinished Next.js draft; they are not used by the Vite build.
