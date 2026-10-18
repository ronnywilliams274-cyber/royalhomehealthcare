import { useState } from "react";
import { imageVariants, webpSrcSet } from "@/config/media";

/**
 * Responsive, lazy-loaded photo with a graceful fallback.
 * - Serves small WebP files to phones and sharper ones to large screens (see imageVariants)
 * - Reserves its space before loading (width/height + aspect ratio) so nothing jumps
 * - If the file is missing, a designed gradient panel is shown instead of a broken image
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
  sizes = "(min-width: 1024px) 42vw, 92vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  eager?: boolean;
  /** How wide the image is displayed, so the browser can pick the right file. */
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const v = imageVariants[src];
  const srcSet = webpSrcSet(src);
  return (
    <div
      className={`group/img relative overflow-hidden bg-[radial-gradient(110%_110%_at_30%_20%,rgb(var(--forest-rgb))_0%,rgb(var(--forest-deep-rgb))_55%,rgb(var(--forest-ink-rgb))_100%)] shadow-[0_24px_54px_-24px_rgb(var(--forest-ink-rgb)/0.38)] ring-1 ring-forest/15 ${className}`}
    >
      {!failed && (
        <picture>
          {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
          <img
            src={src}
            alt={alt}
            width={width ?? v?.w}
            height={height ?? v?.h}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03] ${imgClassName}`}
          />
        </picture>
      )}
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
