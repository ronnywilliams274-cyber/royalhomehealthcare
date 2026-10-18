# Media Files Guide - Royal Home Health Care

Place photos and videos in **`public/media/`** using **exactly** these file names, then run
`npm run build`. Every slot has a fallback, so the site never shows a broken image:
**video → poster image → designed gradient.**

## Accessibility rules for every photo and video (WCAG 2.1 AA)

1. **Alt text must describe what the photo actually shows.** If you replace a photo, update its
   description in the code (search the file name in `src/`). Example:
   *"A nurse in teal scrubs checks the blood pressure of a smiling older woman at home."*
   Don't write "image of…", and don't describe something that isn't in the picture.
2. **Decorative images** (pure background texture) use `alt=""` so screen readers skip them.
3. **Never put important words inside a picture** - put them in real text.
4. **Background videos must be silent.** The hero has a Pause button and never autoplays for visitors
   who ask their device to reduce motion.
5. **Any video with speech or meaningful sound needs closed captions and a transcript.** Use the
   `CaptionedVideo` component (`src/components/CaptionedVideo.tsx`) and a WebVTT caption file -
   start from `public/media/captions/TEMPLATE.en.vtt`. Don't rely on auto-generated captions
   without proofreading them.

## Hero (full-screen background)

| File name | Used for | Recommended specs |
|---|---|---|
| `hero-desktop.mp4` / `.webm` | Desktop background video (≥ 768px wide) | 16:9, 1280×720 is plenty under the dark overlay, 6–15 s loop, **no audio**, aim for < 600 KB |
| `hero-poster-desktop.jpg` | Shown first, and whenever video is off | 16:9, 1920×1080 |
| `hero-mobile.mp4` / `.webm` | Phone background video | 9:16, 540×960, 6–15 s, **no audio**, aim for < 300 KB |
| `hero-poster-mobile.jpg` | Phone poster | 9:16, 1080×1920 |

The current videos were re-encoded for speed (desktop 505 KB MP4 / 305 KB WebM, phone 220 KB / 148 KB -
down from 2.4–2.7 MB each). To do the same with a new clip (free tool: ffmpeg):

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -vf scale=1280:-2 hero-desktop.mp4
ffmpeg -i in.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 44 -row-mt 1 -vf scale=1280:-2 hero-desktop.webm
# phone versions: same commands with scale=540:-2 and the hero-mobile names
```

The video is loaded only after the page is idle, is skipped for visitors on Data Saver or slow
connections (they see the poster), and pauses whenever it is scrolled off screen.

## Section photos

| File name | What it shows | Specs |
|---|---|---|
| `about-care.jpg` | Nurse listening to an older man's heart, blood-pressure monitor on the table | 3:2 landscape |
| `care-companionship.jpg` | Nurse and older man reviewing a care-plan folder on a sofa | 3:4 portrait |
| `care-connection.jpg` | Nurse reviewing a pill organizer and paperwork with an older couple at a dining table | 3:2 landscape |
| `care-hands.jpg` | Close-up of a clinician holding an older patient's hands over a knit blanket | 3:4 portrait |
| `nurse-visit.jpg` | Nurse taking an older woman's blood pressure in an armchair | 3:2 landscape |
| `specialty-nursing.jpg` | Nurse preparing supplies on a coffee table beside a smiling older woman | 3:2 landscape |
| `specialty-therapy.jpg` | Therapist walking beside an older man using a walker | 3:2 landscape |
| `cta-home.jpg` | Empty sunlit living room - decorative background (desktop only) | wide landscape |

When you change a photo, also check the alt text that describes it (search the file name in `src/`).

## Fast-loading photos (WebP versions)

Each photo also has smaller **WebP** copies next to it, e.g. `nurse-visit-640.webp`,
`nurse-visit-960.webp`, `nurse-visit-1264.webp`. Phones download the small one (~30 KB) instead of the
full JPG; the JPG remains as a fallback for very old browsers. They are listed in
`imageVariants` in `src/config/media.ts` and used automatically by every photo on the site.

**If you replace a photo, replace its WebP copies too** (same names, same widths, quality ~75 -
free at https://squoosh.app), or delete that photo's line from `imageVariants`. Otherwise modern
browsers keep showing the old picture. `npm run build` prints a warning when a JPG is newer than its
WebP copies.

Keep JPGs at most ~1300 px wide and ~200 KB (export at quality ~80). The original photos were 700–950 KB
each, which was the single biggest cause of slow loading on phones.
