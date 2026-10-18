# Media Files Guide — Royal Home Health Care

Place photos and videos in **`public/media/`** using **exactly** these file names, then run
`npm run build`. Every slot has a fallback, so the site never shows a broken image:
**video → poster image → designed gradient.**

## Accessibility rules for every photo and video (WCAG 2.1 AA)

1. **Alt text must describe what the photo actually shows.** If you replace a photo, update its
   description in the code (search the file name in `src/`). Example:
   *"A nurse in teal scrubs checks the blood pressure of a smiling older woman at home."*
   Don't write "image of…", and don't describe something that isn't in the picture.
2. **Decorative images** (pure background texture) use `alt=""` so screen readers skip them.
3. **Never put important words inside a picture** — put them in real text.
4. **Background videos must be silent.** The hero has a Pause button and never autoplays for visitors
   who ask their device to reduce motion.
5. **Any video with speech or meaningful sound needs closed captions and a transcript.** Use the
   `CaptionedVideo` component (`src/components/CaptionedVideo.tsx`) and a WebVTT caption file —
   start from `public/media/captions/TEMPLATE.en.vtt`. Don't rely on auto-generated captions
   without proofreading them.

## Hero (full-screen background)

| File name | Used for | Recommended specs |
|---|---|---|
| `hero-desktop.mp4` / `.webm` | Desktop background video (≥ 768px wide) | 16:9, 1920×1080, 6–15 s loop, **no audio**, < 5 MB |
| `hero-poster-desktop.jpg` | Shown first, and whenever video is off | 16:9, 1920×1080 |
| `hero-mobile.mp4` / `.webm` | Phone background video | 9:16, 1080×1920, 6–15 s, **no audio** |
| `hero-poster-mobile.jpg` | Phone poster | 9:16, 1080×1920 |

## Section photos

| File name | Where it appears | Current alt text | Specs |
|---|---|---|---|
| `care-companionship.jpg` | Home "Who we are", About page, aide/therapy pages | A smiling caregiver leans toward a laughing older man as they hold hands in a sunlit living room. | 4:5 portrait, ≥ 900×1125 |
| `nurse-visit.jpg` | Medicare band, skilled-nursing pages | A nurse in teal scrubs checks the blood pressure of a smiling older woman resting in a recliner at home. | 3:2 landscape, ≥ 1500×1000 |
| `care-connection.jpg` | Medicare page, care-program pages | A smiling older woman resting in a recliner looks up at a nurse who leans in to talk with her. | 3:2 landscape, ≥ 1500×1000 |
| `care-hands.jpg` | "Why home health care", homebound page | Close-up of a caregiver gently holding the hands of an older person wrapped in a soft blanket. | 4:5 portrait, ≥ 900×1125 |
| `cta-home.jpg` | Faint background of the home contact band (decorative) | (decorative — empty alt) | Wide 21:9 |

The four `care-*.jpg` / `nurse-visit.jpg` photos were taken from the hero video so the imagery matches.
**Best practice:** replace them with real photos of your own team (with signed photo releases).

### Retired photos

`about-care.jpg` (hands typing on a laptop), `specialty-nursing.jpg` (blood-pressure check in a clinic)
and `specialty-therapy.jpg` (a young woman doing sit-ups in a gym) are no longer used: their alt text
described scenes they didn't show, and the gym photo didn't represent home health patients.
