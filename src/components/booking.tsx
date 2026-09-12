"use client";

import { useRef, useState } from "react";
import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Eyebrow, Heading } from "./ui/section";
import { OpenStatus } from "./ui/open-status";
import { CheckIcon, ClockIcon, MapPinIcon } from "./ui/icons";
import { BRANCHES, COURT_RULES, PLATFORM_LABEL } from "@/content/site";
import { formatHours } from "@/lib/hours";

/** What each platform actually gives you, shown under its button. */
const PLATFORM_NOTE: Record<string, string> = {
  turftown: "Live slots, instant confirmation, UPI",
  playo: "Live slots, instant confirmation, UPI",
};

export function Booking() {
  const [activeSlug, setActiveSlug] = useState(BRANCHES[0].slug);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = BRANCHES.findIndex(
    (branch) => branch.slug === activeSlug,
  );
  const branch = BRANCHES[activeIndex];
  const hours = formatHours(branch.hours);

  /**
   * Roving-tabindex keyboard handling, as the WAI-ARIA tabs pattern requires:
   * one Tab stop for the whole tablist, arrow keys to move between tabs, and
   * Home/End to jump to either end. Without this a keyboard user has to Tab
   * through every branch to reach the panel.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = BRANCHES.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = activeIndex + 1 > lastIndex ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = activeIndex - 1 < 0 ? lastIndex : activeIndex - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveSlug(BRANCHES[nextIndex].slug);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="relative isolate scroll-mt-24 overflow-hidden border-y border-hairline bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="court-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute top-0 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse,rgba(239,177,52,0.12),transparent_68%)] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>Booking</Eyebrow>
            <Heading id="booking-heading">
              Book a court in{" "}
              <span className="accent-word text-amber-300">under a minute</span>
            </Heading>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
              Courts are booked through Turf Town and Playo — live availability,
              instant confirmation and UPI. Pick a branch.
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          {/*
            A branch picker rather than two side-by-side cards. With two
            branches on separate platforms, the question is always "which
            branch", and answering it once then showing only that branch's
            options removes the comparison step entirely.
          */}
          <div className="mt-14">
            <div
              role="tablist"
              aria-label="Choose a branch to book"
              className="mx-auto flex w-full max-w-md rounded-full border border-hairline bg-canvas/60 p-1.5 backdrop-blur-sm"
            >
              {BRANCHES.map((item, index) => {
                const selected = item.slug === activeSlug;

                return (
                  <button
                    key={item.slug}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`booking-tab-${item.slug}`}
                    aria-selected={selected}
                    aria-controls={`booking-panel-${item.slug}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveSlug(item.slug)}
                    onKeyDown={onKeyDown}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                      selected
                        ? "bg-amber-400 text-canvas"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`booking-panel-${branch.slug}`}
              aria-labelledby={`booking-tab-${branch.slug}`}
              tabIndex={0}
              className="panel mt-8 rounded-3xl p-7 sm:p-10"
            >
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-text">
                    {branch.name}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm">
                    <p className="flex gap-3 text-muted">
                      <MapPinIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
                      <span className="leading-relaxed">
                        {branch.addressLines.join(", ")}
                      </span>
                    </p>

                    {hours ? (
                      <p className="flex items-center gap-3 text-muted">
                        <ClockIcon className="size-4 shrink-0 text-amber-500" />
                        {hours}
                      </p>
                    ) : null}
                  </div>

                  <OpenStatus
                    hours={branch.hours}
                    size="md"
                    className="mt-5"
                  />

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {branch.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-faint uppercase">
                    Book on
                  </p>

                  {branch.booking.map((link, index) => (
                    <Cta
                      key={link.href}
                      href={link.href}
                      size="lg"
                      variant={index === 0 ? "primary" : "secondary"}
                      className="w-full justify-between"
                      aria-label={`${link.label} — ${branch.name} branch`}
                    >
                      <span className="flex flex-col items-start text-left">
                        <span>{PLATFORM_LABEL[link.platform]}</span>
                        <span
                          className={`text-[0.7rem] font-normal ${
                            index === 0 ? "text-canvas/65" : "text-faint"
                          }`}
                        >
                          {PLATFORM_NOTE[link.platform]}
                        </span>
                      </span>
                    </Cta>
                  ))}

                  <Cta
                    href={branch.mapsUrl}
                    variant="quiet"
                    size="lg"
                    className="w-full"
                    aria-label={`Get directions to the ${branch.name} branch`}
                  >
                    Directions
                  </Cta>
                </div>
              </div>

              <div className="mt-10 border-t border-hairline pt-8">
                <h4 className="text-[0.68rem] font-semibold tracking-[0.2em] text-faint uppercase">
                  Before you arrive
                </h4>
                <ul className="mt-5 grid gap-3 text-sm text-muted sm:grid-cols-2">
                  {COURT_RULES.map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-amber-400" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
