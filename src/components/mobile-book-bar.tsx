"use client";

import { useEffect, useState } from "react";
import { Cta } from "./ui/cta";
import { OpenStatus } from "./ui/open-status";
import { PRIMARY_BOOKING_HREF } from "@/content/site";
import { branchWithHours } from "@/lib/hours";

/**
 * Sticky booking bar for phones.
 *
 * On a narrow screen the header's booking button is traded for the menu
 * toggle, which means the primary action is off-screen for the entire page
 * once the hero scrolls away. This puts it back within thumb reach.
 *
 * It only appears after the hero, so it never covers the hero's own CTA, and
 * it is `sm:hidden` because from that breakpoint up the header button is
 * visible again.
 */
export function MobileBookBar() {
  const [visible, setVisible] = useState(false);
  const hoursBranch = branchWithHours();

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      // Hidden from assistive technology while off-screen, so a screen reader
      // does not announce a booking button that is not yet available.
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold text-text">
            Book a court
          </p>
          {hoursBranch ? (
            <OpenStatus
              hours={hoursBranch.hours}
              className="mt-1 border-0 bg-transparent px-0 py-0"
            />
          ) : (
            <p className="mt-0.5 text-[0.7rem] text-faint">
              Turf Town &amp; Playo
            </p>
          )}
        </div>

        <Cta
          href={PRIMARY_BOOKING_HREF}
          className="shrink-0"
          tabIndex={visible ? undefined : -1}
        >
          Choose branch
        </Cta>
      </div>
    </div>
  );
}
