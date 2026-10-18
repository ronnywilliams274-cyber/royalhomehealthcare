import { useId, useState } from "react";

/**
 * Accessible video player for any video WITH SPEECH OR MEANINGFUL AUDIO
 * (patient stories, staff introductions, how-to videos).
 *
 * WCAG 2.1 AA requires, for prerecorded video with audio:
 *  - 1.2.2 Captions          → `captions` (a WebVTT .vtt file), shown by default
 *  - 1.2.5 Audio description → describe important visuals in the narration, or
 *                              supply `descriptions` (.vtt) / a described version
 *  - 1.2.1 / 1.2.3 Transcript → `transcript` text (also helps deaf-blind users and SEO)
 *  - 2.2.2 / 1.4.2           → never autoplay with sound; native controls let users pause
 *
 * Example:
 *   <CaptionedVideo
 *     src="/media/welcome.mp4"
 *     poster="/media/welcome-poster.jpg"
 *     title="Meet our nursing team"
 *     captions="/media/captions/welcome.en.vtt"
 *     transcript="Hi, I'm ... (full text)"
 *   />
 * A starter caption file lives at public/media/captions/TEMPLATE.en.vtt.
 */
export default function CaptionedVideo({
  src,
  poster,
  title,
  captions,
  descriptions,
  transcript,
}: {
  src: string;
  poster?: string;
  title: string;
  captions: string;
  descriptions?: string;
  transcript: string;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  const id = useId();
  return (
    <figure className="overflow-hidden rounded-2xl border border-forest/10 bg-white">
      <video controls preload="metadata" poster={poster} className="aspect-video w-full bg-black" aria-describedby={`${id}-cap`}>
        <source src={src} type="video/mp4" />
        <track kind="captions" src={captions} srcLang="en" label="English captions" default />
        {descriptions && <track kind="descriptions" src={descriptions} srcLang="en" label="English audio descriptions" />}
        Your browser can't play this video. <a href={src}>Download the video</a>.
      </video>
      <figcaption id={`${id}-cap`} className="flex flex-wrap items-center justify-between gap-3 p-4">
        <span className="font-semibold text-forest">{title}</span>
        <button
          type="button"
          aria-expanded={showTranscript}
          aria-controls={`${id}-tr`}
          onClick={() => setShowTranscript((s) => !s)}
          className="btn btn-outline !min-h-[2.75rem] text-sm"
        >
          {showTranscript ? "Hide transcript" : "Show transcript"}
        </button>
      </figcaption>
      <div id={`${id}-tr`} hidden={!showTranscript} className="border-t border-forest/10 p-5 text-charcoal/90">
        <h3 className="sr-only">Transcript: {title}</h3>
        <p className="whitespace-pre-line leading-relaxed">{transcript}</p>
      </div>
    </figure>
  );
}
