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
  className?: string;
};

/**
 * Standard page section: consistent vertical rhythm, gutters and heading
 * block. Every section is a landmark labelled by its own heading, so screen
 * reader users can jump between them.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  centered = false,
  className = "",
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24 lg:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2
              id={headingId}
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 text-base leading-relaxed text-pretty text-silver-400 sm:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
      <span aria-hidden="true" className="h-px w-7 bg-gold-500/70" />
      {children}
    </span>
  );
}

/** Thin gold hairline used to separate major bands of the page. */
export function Divider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-line-2 to-transparent"
    />
  );
}
