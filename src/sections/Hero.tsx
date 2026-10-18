import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router";
import { media } from "@/config/media";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";
import { useMotionOff } from "@/hooks/useMotion";

const HeroCanvas = lazy(() => import("@/components/HeroCanvas"));

/**
 * Home hero.
 * Background: video (webm → mp4) → poster image → forest gradient, plus a light particle layer on desktop.
 * The video is decorative and silent, so it is hidden from assistive technology and needs no captions.
 * WCAG 2.2.2: a visible Pause/Play control stops all background motion; nothing autoplays when the
 * visitor prefers reduced motion.
 */
export default function Hero() {
  const motionOff = useMotionOff();
  const [isMobile, setIsMobile] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [canvasOk, setCanvasOk] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const paused = userPaused || motionOff;
  const src = isMobile ? media.heroMobile : media.heroDesktop;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // Enable gentle ambient particles on both mobile and desktop unless Data Saver is on
    setCanvasOk(!conn?.saveData);
    setMounted(true);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused, isMobile]);

  // Entrance animation is pure CSS (see .hero-in in index.css) so the prerendered HTML is never hidden.
  const anim = (delay: number) => ({ className: "hero-in", style: { animationDelay: `${delay}ms` } });

  return (
    <section aria-labelledby="hero-title" className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-forest-ink sm:items-center">
      {/* Background layers — decorative */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,rgb(var(--forest-rgb))_0%,rgb(var(--forest-deep-rgb))_55%,rgb(var(--forest-ink-rgb))_100%)]" />
        <picture>
          <source media="(max-width: 767px)" srcSet={media.heroMobile.poster} />
          <img src={media.heroDesktop.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        {mounted && !videoFailed && (
          <video
            key={isMobile ? "m" : "d"}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay={!paused}
            muted
            loop
            playsInline
            preload="metadata"
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
        {canvasOk && !motionOff && (
          <Suspense fallback={null}>
            <HeroCanvas className="absolute inset-0 h-full w-full opacity-80" paused={paused} />
          </Suspense>
        )}
        {/* readability scrim — adapts to active theme color while keeping text contrast above 4.5:1 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--forest-ink-rgb)/0.68)_0%,rgb(var(--forest-ink-rgb)/0.62)_40%,rgb(var(--forest-ink-rgb)/0.92)_100%)] sm:bg-[linear-gradient(90deg,rgb(var(--forest-ink-rgb)/0.88)_0%,rgb(var(--forest-ink-rgb)/0.68)_55%,rgb(var(--forest-ink-rgb)/0.35)_100%)]" />
      </div>

      {/* Pause / play all background motion */}
      {!motionOff && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          className="absolute right-4 top-[5.75rem] z-20 flex h-11 items-center gap-2 rounded-full border border-white/30 bg-forest-ink/60 px-4 text-sm font-medium text-cream backdrop-blur-md transition-colors hover:bg-forest-ink/80 sm:bottom-8 sm:right-8 sm:top-auto"
        >
          <Icon name={userPaused ? "Play" : "Pause"} className="h-4 w-4" />
          {userPaused ? "Play background video" : "Pause background video"}
        </button>
      )}
      <div className="container-royal relative z-10 pb-28 pt-36 sm:pb-24 md:pb-20">
        <p {...anim(0)} className="hero-in eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-cream">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 bg-forest-ink/40 px-3 py-1.5 text-gold-light">
            <Icon name="BadgeCheck" className="h-4 w-4" /> Medicare-certified
          </span>
          <span>Licensed home health agency · Van Nuys, California</span>
        </p>

        <h1 id="hero-title" {...anim(120)} className="hero-in h-display text-hero max-w-5xl text-cream">
          Healing happens best <em className="font-medium italic text-gold-light">at home.</em>
        </h1>

        <p {...anim(260)} className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-cream/95 sm:text-xl">
          Skilled nurses, therapists and caring aides — at your door, under your physician's plan. Wound care, IV therapy,
          injections and recovery programs across Los Angeles, Ventura, San&nbsp;Bernardino and Orange Counties.
        </p>

        <div {...anim(380)} className="hero-in mt-9 flex flex-wrap items-center gap-3">
          <a href={site.phoneHref} className="btn btn-gold">
            <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
          </a>
          <Link to="/services" className="btn btn-outline-light">
            Explore our services <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>

        <ul {...anim(500)} className="hero-in mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-7 text-sm text-cream/90 sm:grid-cols-4">
          {[
            ["ShieldPlus", "Physician-directed care"],
            ["Stethoscope", "Registered nurses"],
            ["Clock", "On-call nurse after hours"],
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
