import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { media, webpSrcSet } from "@/config/media";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";
import { useMotionOff } from "@/hooks/useMotion";

type Conn = { saveData?: boolean; effectiveType?: string };

/** Only stream the background video when the device and connection can comfortably afford it. */
function videoAllowed(): boolean {
  const nav = navigator as Navigator & { connection?: Conn; deviceMemory?: number };
  const c = nav.connection;
  if (c?.saveData) return false;
  if (c?.effectiveType && /(^|-)2g|3g/.test(c.effectiveType)) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 2) return false;
  return true;
}

/**
 * Home hero.
 * Performance: the poster image paints first (it is the LCP element, served as a small WebP);
 * the silent background video is only attached after the page is idle, is skipped on Data Saver
 * or slow connections, and pauses whenever the hero is scrolled out of view.
 * Accessibility: the video is decorative and hidden from assistive technology (no captions
 * needed); a visible Pause control stops it (WCAG 2.2.2) and nothing autoplays when the
 * visitor prefers reduced motion.
 */
export default function Hero() {
  const motionOff = useMotionOff();
  const [isMobile, setIsMobile] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false); // allowed + page idle
  const [videoFailed, setVideoFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const paused = userPaused || motionOff;
  const src = isMobile ? media.heroMobile : media.heroDesktop;
  const showVideo = videoReady && !videoFailed && !motionOff;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);

    // Attach the video only after the page has loaded and the main thread is idle.
    let idleId = 0;
    let timer = 0;
    const start = () => {
      if (!videoAllowed()) return;
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) idleId = ric(() => setVideoReady(true), { timeout: 2500 });
      else timer = window.setTimeout(() => setVideoReady(true), 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Pause decoding while the hero is off screen (big win for scrolling on phones).
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    if (sectionRef.current) io.observe(sectionRef.current);

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("load", start);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId && cic) cic(idleId);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused || !inView) v.pause();
    else v.play().catch(() => {});
  }, [paused, inView, isMobile, showVideo]);

  // Entrance animation is pure CSS (see .hero-in in index.css) so the prerendered HTML is never hidden.
  const anim = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-forest-ink sm:items-center">
      {/* Background layers - decorative */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,rgb(var(--forest-rgb))_0%,rgb(var(--forest-deep-rgb))_55%,rgb(var(--forest-ink-rgb))_100%)]" />
        <picture>
          <source media="(max-width: 767px)" type="image/webp" srcSet={webpSrcSet(media.heroMobile.poster)} sizes="100vw" />
          <source media="(max-width: 767px)" srcSet={media.heroMobile.poster} />
          <source type="image/webp" srcSet={webpSrcSet(media.heroDesktop.poster)} sizes="100vw" />
          <img
            src={media.heroDesktop.poster}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        {showVideo && (
          <video
            key={isMobile ? "m" : "d"}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay={!paused}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            poster={src.poster}
            tabIndex={-1}
            onError={() => setVideoFailed(true)}
            onLoadedData={(e) => {
              if ((e.target as HTMLVideoElement).videoWidth === 0) setVideoFailed(true);
            }}
          >
            {src.video.map((v) => (
              <source key={v} src={v} type={v.endsWith("webm") ? "video/webm" : "video/mp4"} onError={(e) => {
                const video = (e.target as HTMLSourceElement).parentElement as HTMLVideoElement | null;
                if (video && video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setVideoFailed(true);
              }} />
            ))}
          </video>
        )}
        {/* readability scrim - adapts to active theme color while keeping text contrast above 4.5:1 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--forest-ink-rgb)/0.68)_0%,rgb(var(--forest-ink-rgb)/0.62)_40%,rgb(var(--forest-ink-rgb)/0.92)_100%)] sm:bg-[linear-gradient(90deg,rgb(var(--forest-ink-rgb)/0.88)_0%,rgb(var(--forest-ink-rgb)/0.68)_55%,rgb(var(--forest-ink-rgb)/0.35)_100%)]" />
      </div>

      {/* Pause / play all background motion */}
      {showVideo && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play background video" : "Pause background video"}
          className="hero-pause absolute right-4 top-[5.5rem] z-20 flex h-11 items-center gap-1.5 rounded-full border border-white/30 bg-forest-ink/80 px-3.5 text-sm sm:gap-2 sm:px-4 font-medium text-cream transition-colors hover:bg-forest-ink sm:bottom-8 sm:right-8 sm:top-auto"
        >
          <Icon name={userPaused ? "Play" : "Pause"} className="h-4 w-4" />
          <span className="hero-pause-label">
            {userPaused ? "Play" : "Pause"}
            <span className="hidden sm:inline"> background video</span>
          </span>
        </button>
      )}
      <div className="container-royal hero-pad relative z-10">
        <p {...anim(0)} className="hero-in hero-eyebrow eyebrow mb-3 flex sm:mb-5 flex-wrap items-center gap-x-3 gap-y-2 text-cream">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 bg-forest-ink/40 px-3 py-1.5 text-gold-light">
            <Icon name="BadgeCheck" className="h-4 w-4" /> Medicare-certified
          </span>
          <span>Licensed home health agency in Van Nuys, California</span>
        </p>

        <h1 id="hero-title" {...anim(120)} className="hero-in h-display text-hero max-w-5xl text-cream">
          Healing feels best <em className="font-medium italic text-gold-light">in your own home.</em>
        </h1>

        <p {...anim(260)} className="hero-in hero-lede mt-3 max-w-xl text-base leading-relaxed text-cream/95 sm:mt-6 sm:text-xl">
          Experienced nurses, physical therapists, and caring aides right at your front door, working closely with your doctor. We bring wound care, IV therapy, injections, and recovery support to families across Los Angeles, Ventura, San&nbsp;Bernardino, and Orange Counties.
        </p>

        <div {...anim(380)} className="hero-in hero-cta mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
          <a href={site.phoneHref} className="btn btn-gold">
            <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
          </a>
          <Link to="/services" className="btn btn-outline-light">
            Explore our services <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <ul {...anim(500)} className="hero-in hero-trust mt-6 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-[0.8125rem] leading-snug text-cream/90 sm:mt-10 sm:gap-x-6 sm:gap-y-4 sm:pt-6 sm:text-sm">
          {[
            ["ShieldPlus", "Guided by your doctor"],
            ["Stethoscope", "Licensed RNs & LVNs"],
            ["Clock", "Nurse on call after hours"],
            ["MapPin", "4 Southern California counties"],
          ].map(([icon, text]) => (
            <li key={text} className="flex items-center gap-2.5">
              <Icon name={icon as "Clock"} className="h-5 w-5 shrink-0 text-gold-light" />
              {text}
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
