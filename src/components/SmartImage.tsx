import { useState } from "react";

/**
 * Image with a graceful fallback — if the file is missing from public/media/,
 * a designed gradient panel is shown instead of a broken image.
 *
 * ACCESSIBILITY: `alt` must describe what the photo actually shows (WCAG 1.1.1).
 * Pass alt="" only for purely decorative images.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  width,
  height,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      data-image-reveal
      className={`group/img relative overflow-hidden bg-[radial-gradient(110%_110%_at_30%_20%,rgb(var(--forest-rgb))_0%,rgb(var(--forest-deep-rgb))_55%,rgb(var(--forest-ink-rgb))_100%)] shadow-[0_24px_54px_-24px_rgb(var(--forest-ink-rgb)/0.38)] ring-1 ring-forest/15 ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03] ${imgClassName}`}
        />
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center" role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
          <svg viewBox="0 0 32 32" className="h-16 w-16 text-sage/40" fill="none" aria-hidden="true">
            <path d="M4 12l4 10h16l4-10-6 4-6-8-6 8-6-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 26h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
