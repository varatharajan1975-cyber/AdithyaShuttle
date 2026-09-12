import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** Centres the heading block. */
  centered?: boolean;
  /** Puts the intro beside the heading instead of under it, on wide screens. */
  split?: boolean;
  /** Extra element rendered at the far end of the heading row. */
  aside?: ReactNode;
  className?: string;
  /** Applied to the inner max-width wrapper — widen a section without
      rewriting its gutters. */
  innerClassName?: string;
};

/**
 * Standard page section: consistent vertical rhythm, gutters and heading
 * block. Every section is a landmark labelled by its own heading, so screen
 * reader users can jump between them.
 *
 * `split` exists to break the monotony of the old layout, where every section
 * was an identical centre-left stack. Alternating between stacked, split and
 * centred heading blocks is what gives the page its rhythm.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  centered = false,
  split = false,
  aside,
  className = "",
  innerClassName = "max-w-6xl",
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:py-28 ${className}`}
    >
      <div className={`mx-auto w-full ${innerClassName}`}>
        <Reveal>
          {split ? (
            /*
              A twelve-column grid rather than a flex row. Under flex, the
              heading was a shrinkable item competing with the intro and any
              aside, so a two-word heading like "Inside the academy" was being
              squeezed into two lines. Fixed column spans give the heading a
              width that does not depend on what sits beside it.
            */
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
                <Heading id={headingId}>{title}</Heading>
              </div>

              <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end lg:pb-2">
                {intro ? (
                  <p className="max-w-md text-base leading-relaxed text-pretty text-muted">
                    {intro}
                  </p>
                ) : null}
                {aside}
              </div>
            </div>
          ) : (
            <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
              {eyebrow ? <Eyebrow centered={centered}>{eyebrow}</Eyebrow> : null}
              <Heading id={headingId}>{title}</Heading>
              {intro ? (
                <p
                  className={`mt-6 text-lg leading-relaxed text-pretty text-muted sm:text-xl ${
                    centered ? "mx-auto max-w-2xl" : ""
                  }`}
                >
                  {intro}
                </p>
              ) : null}
              {aside ? <div className="mt-8">{aside}</div> : null}
            </div>
          )}
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}

/**
 * Shared display heading. Kept here so the type scale lives in exactly one
 * place — the old build set a different clamp on every section.
 */
export function Heading({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`mt-5 text-4xl leading-[1.04] font-semibold text-balance sm:text-5xl lg:text-[3.5rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.24em] text-amber-400 uppercase ${
        centered ? "justify-center" : ""
      }`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-amber-500/80" />
      {children}
    </span>
  );
}
