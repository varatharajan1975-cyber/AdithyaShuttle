"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { Cta } from "./ui/cta";
import { OpenStatus } from "./ui/open-status";
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon } from "./ui/icons";
import {
  BRAND,
  CONTACT,
  formatPhone,
  NAV_LINKS,
  PRIMARY_BOOKING_HREF,
  PRIMARY_PHONE,
} from "@/content/site";
import { branchWithHours } from "@/lib/hours";

/** Section ids the scroll-spy watches, derived from the nav itself. */
const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hoursBranch = branchWithHours();

  /**
   * One scroll listener drives both the header background and the reading
   * progress bar. The progress bar is written straight to the DOM node rather
   * than through state: it changes on every frame, and re-rendering the whole
   * header sixty times a second to move one bar is wasted work.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 16);

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /**
   * Scroll-spy. The root margin collapses the viewport to a band just under
   * the header, so the "active" section is whichever one currently sits at
   * reading position rather than whichever merely touches the viewport.
   */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: lock background scroll and let Escape close
  // it, which keyboard users expect from any modal surface.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    /*
     * The blur sits on the inner bar, never on <header> itself: a
     * `backdrop-filter` establishes a containing block for fixed-position
     * descendants, which would collapse the full-height mobile menu below it
     * to zero height.
     */
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-hairline bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/*
          Three columns at `1fr auto 1fr` rather than a flex row, so the logo
          is centred on the viewport rather than on whatever space the nav and
          the buttons happen to leave. The outer columns are equal by
          construction, which keeps the lockup centred at every breakpoint —
          including on phones, where the left column is an empty spacer
          balancing the menu button on the right.

          Each child names its own column. `display: none` takes an element out
          of the grid altogether rather than leaving an empty track, so under
          auto-placement the hidden nav below `lg` pulled the logo into column
          one and the buttons into column two — the lockup was centred only on
          desktop. Explicit `col-start` values hold the three slots regardless
          of which children are currently rendered.
        */}
        <div className="mx-auto grid h-[var(--header-height)] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
          <nav
            aria-label="Main"
            className="col-start-1 hidden items-center gap-0.5 justify-self-start lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-text"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {/* The active marker is a dot rather than a filled pill:
                      it reads at a glance without competing with the amber
                      booking button beside it. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 mx-auto size-1 rounded-full bg-amber-400 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <a
            href="#top"
            className="col-start-2 justify-self-center rounded-lg"
            aria-label={`${BRAND.name} — back to top`}
          >
            <BrandMark size="xl" />
          </a>

          <div className="col-start-3 flex items-center gap-3 justify-self-end">
            {/* Both of these are wrapped rather than given a `hidden` class
                directly: each already carries `inline-flex` in its own base
                styles, and two display utilities of equal specificity resolve
                by stylesheet order rather than by intent — which is why the
                status chip was showing up on phones and crowding the header. */}
            {hoursBranch ? (
              <div className="hidden xl:block">
                <OpenStatus hours={hoursBranch.hours} />
              </div>
            ) : null}

            <div className="hidden sm:block">
              <Cta href={PRIMARY_BOOKING_HREF}>Book a court</Cta>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-hairline-strong text-text transition-colors hover:border-amber-400/60 hover:text-amber-200 lg:hidden"
            >
              {open ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Reading progress. Purely decorative, so it is hidden from the
            accessibility tree — a screen reader gets nothing useful from a
            bar that only restates scroll position. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px overflow-hidden"
        >
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-amber-300"
          />
        </div>
      </div>

      {/* Mobile navigation. Covers the viewport below the header so the page
          behind it cannot show through while background scroll is locked.
          Kept mounted but `hidden`, which also takes it out of the
          accessibility tree when closed. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-height)] bottom-0 overflow-y-auto bg-canvas lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex min-h-full max-w-7xl flex-col px-5 py-8 sm:px-8"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-hairline py-5 transition-colors hover:text-amber-200"
                >
                  <span className="font-mono text-xs text-faint tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-4 pt-10">
            {hoursBranch ? (
              <OpenStatus
                hours={hoursBranch.hours}
                branchName={hoursBranch.name}
                size="md"
              />
            ) : null}

            <Cta
              href={PRIMARY_BOOKING_HREF}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Book a court
            </Cta>

            {/* A tap-to-call on the one surface where the visitor is already
                holding a phone. */}
            {PRIMARY_PHONE ? (
              <Cta
                href={`tel:${PRIMARY_PHONE}`}
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <PhoneIcon className="size-4" />
                {formatPhone(PRIMARY_PHONE)}
              </Cta>
            ) : null}

            <Cta
              href={CONTACT.instagram}
              variant="secondary"
              size="lg"
              className="w-full"
              hideExternalIcon
            >
              <InstagramIcon className="size-4" />
              {CONTACT.instagramHandle}
            </Cta>
          </div>
        </nav>
      </div>
    </header>
  );
}
