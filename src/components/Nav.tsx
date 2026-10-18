import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { site } from "@/data/site";
import { categories, servicesIn, type ServiceCategory } from "@/data/services";
import { Icon } from "@/components/Icon";
import { Crest } from "@/components/Crest";

const primary = [
  { label: "Medicare", to: "/medicare-certified" },
  { label: "About", to: "/about" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "FAQs", to: "/faq" },
  { label: "Referrals", to: "/referrals" },
];

const catOrder: ServiceCategory[] = ["nursing", "programs", "core"];

/**
 * Site header and navigation.
 * - Desktop: "Services" is a disclosure button (not an ARIA menu) that reveals a panel of links.
 * - Mobile: a modal dialog with focus trap, Escape to close and focus return.
 * - The header slides away on scroll-down but always returns when anything inside it has focus.
 */
export default function Nav() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const servicesBtn = useRef<HTMLButtonElement>(null);
  const servicesWrap = useRef<HTMLLIElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close menus when the page changes
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Services panel: close on Escape or outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesBtn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!servicesWrap.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  const isServices = pathname.startsWith("/services");
  const showHeader = !hidden || focusWithin || servicesOpen || mobileOpen;

  return (
    <>
      <header
        data-site-header
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusWithin(false);
        }}
        className={`on-dark fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-out sm:px-4 ${
          showHeader ? "translate-y-0" : "-translate-y-[130%]"
        }`}
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div
          className={`relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6 ${
            scrolled || servicesOpen
              ? "border-white/15 bg-forest-ink/90 shadow-[0_12px_40px_-16px_rgba(12,26,7,0.65)] backdrop-blur-xl"
              : "border-white/15 bg-forest-ink/55 backdrop-blur-md"
          }`}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pr-2 text-cream" aria-label={`${site.shortName} — home`}>
            <Crest className="h-9 w-9 text-gold-light" />
            <span className="font-serif-display text-xl font-medium leading-none sm:text-[1.4rem]" aria-hidden="true">
              Royal <span className="hidden sm:inline">Home Health Care</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              <li ref={servicesWrap}>
                <button
                  ref={servicesBtn}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={panelId}
                  onClick={() => setServicesOpen((o) => !o)}
                  className={`flex min-h-[2.75rem] items-center gap-1 rounded-full px-3.5 text-[0.9rem] font-medium text-cream transition-colors hover:bg-white/10 ${
                    isServices ? "bg-white/10" : ""
                  }`}
                >
                  Services
                  <Icon name="ChevronDown" className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={panelId}
                  hidden={!servicesOpen}
                  onBlur={(e) => {
                    if (!servicesWrap.current?.contains(e.relatedTarget as Node)) setServicesOpen(false);
                  }}
                  className="absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-3xl border border-white/10 bg-forest-ink/[0.97] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                >
                  <div className="grid grid-cols-3 gap-8">
                    {catOrder.map((cat) => (
                      <div key={cat}>
                        <p className="eyebrow mb-4 text-gold-light" id={`${panelId}-${cat}`}>
                          {categories[cat].label}
                        </p>
                        <ul aria-labelledby={`${panelId}-${cat}`} className="space-y-0.5">
                          {servicesIn(cat).map((s) => (
                            <li key={s.slug}>
                              <NavLink
                                to={`/services/${s.slug}`}
                                className="group flex items-center gap-3 rounded-xl px-2 py-2 text-[0.95rem] text-cream/90 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
                              >
                                <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem] shrink-0 text-gold-light" />
                                {s.navTitle ?? s.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6">
                    <p className="text-sm text-cream/80">Not sure what you need? A registered nurse can help.</p>
                    <Link to="/services" className="link-arrow text-sm">
                      View all services <Icon name="ArrowRight" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
              {primary.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className="flex min-h-[2.75rem] items-center rounded-full px-3.5 text-[0.9rem] font-medium text-cream transition-colors hover:bg-white/10 aria-[current=page]:bg-white/10"
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn btn-outline-light hidden !min-h-[2.75rem] !px-5 text-sm lg:inline-flex">
              Contact
            </Link>
            <a href={site.phoneHref} className="btn btn-gold !min-h-[2.75rem] !px-4 text-sm sm:!px-5">
              <Icon name="Phone" className="h-4 w-4" />
              <span className="hidden sm:inline">{site.phone}</span>
              <span className="sr-only sm:hidden">Call {site.phone}</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream xl:hidden"
            >
              <Icon name="Menu" className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileMenu
          onClose={() => {
            setMobileOpen(false);
            requestAnimationFrame(() => menuBtn.current?.focus());
          }}
        />
      )}
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [openCat, setOpenCat] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside the dialog
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      className="on-dark fixed inset-0 z-[70] overflow-y-auto bg-forest-ink text-cream motion-safe:animate-in motion-safe:fade-in"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-royal flex min-h-full flex-col py-5">
        <div className="flex items-center justify-between">
          <h2 id={titleId} className="font-serif-display text-2xl font-medium">
            Menu
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25"
          >
            <Icon name="X" className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main" className="mt-6 flex-1">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            <li>
              <NavLink to="/" end onClick={onClose} className="block py-4 font-serif-display text-3xl aria-[current=page]:text-gold-light">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" end onClick={onClose} className="block py-4 font-serif-display text-3xl aria-[current=page]:text-gold-light">
                All services
              </NavLink>
              <ul className="mb-4 space-y-1">
                {catOrder.map((cat) => {
                  const open = openCat === cat;
                  const listId = `${titleId}-${cat}`;
                  return (
                    <li key={cat} className="rounded-2xl bg-white/[0.04]">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={listId}
                        onClick={() => setOpenCat(open ? null : cat)}
                        className="flex min-h-[3rem] w-full items-center justify-between px-4 text-left font-semibold"
                      >
                        {categories[cat].label}
                        <Icon name="ChevronDown" className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                      <ul id={listId} hidden={!open} className="px-2 pb-3">
                        {servicesIn(cat).map((s) => (
                          <li key={s.slug}>
                            <NavLink
                              to={`/services/${s.slug}`}
                              onClick={onClose}
                              className="flex min-h-[2.75rem] items-center gap-3 rounded-xl px-2 text-cream/90 aria-[current=page]:bg-white/10"
                            >
                              <Icon name={s.icon} className="h-5 w-5 text-gold-light" />
                              {s.navTitle ?? s.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
            {[...primary, { label: "Contact", to: "/contact" }].map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={onClose} className="block py-4 font-serif-display text-3xl aria-[current=page]:text-gold-light">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-3 pb-6">
          <a href={site.phoneHref} className="btn btn-gold w-full">
            <Icon name="Phone" className="h-4 w-4" /> Call {site.phone}
          </a>
          <p className="text-center text-sm text-cream/80">
            {site.hours.label}. {site.hours.onCall}
          </p>
        </div>
      </div>
    </div>
  );
}
