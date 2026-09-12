"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";
import { Cta } from "./ui/cta";
import { CloseIcon, MenuIcon } from "./ui/icons";
import { BRAND, NAV_LINKS, PRIMARY_BOOKING_HREF } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Swap the header from transparent to solid once the hero starts to scroll
  // away. Passive listener so it never blocks scrolling on touch devices.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        className={`transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#top"
            className="shrink-0 rounded-lg"
            aria-label={`${BRAND.name} — back to top`}
          >
            <BrandMark />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-silver-300 transition-colors hover:bg-ink-3 hover:text-gold-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapped rather than given `hidden sm:inline-flex` directly: Cta
                already carries `inline-flex`, and two display utilities of
                equal specificity resolve by stylesheet order, not intent. */}
            <div className="hidden sm:block">
              <Cta href={PRIMARY_BOOKING_HREF}>Book a Court</Cta>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-2 text-silver-200 transition-colors hover:border-gold-500/60 hover:text-gold-200 lg:hidden"
            >
              {open ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation. Covers the viewport below the header so the page
          behind it cannot show through while background scroll is locked.
          Kept mounted but `hidden`, which also takes it out of the
          accessibility tree when closed. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-height)] bottom-0 overflow-y-auto bg-ink lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 sm:px-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 font-display text-lg font-semibold text-silver-100 transition-colors hover:bg-ink-3 hover:text-gold-200"
            >
              {link.label}
            </a>
          ))}
          <Cta
            href={PRIMARY_BOOKING_HREF}
            size="lg"
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            Book a Court
          </Cta>
        </nav>
      </div>
    </header>
  );
}
