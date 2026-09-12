import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { ArrowUpRightIcon } from "./ui/icons";
import { CONTACT, PROGRAMMES } from "@/content/site";

export function Training() {
  /**
   * Batch timings and fees are not published here on purpose — they change,
   * and guessing them would send people to the wrong court at the wrong time.
   * The enquiry CTA points at whichever channel is actually configured.
   */
  const enquiryHref = CONTACT.phone ? `tel:${CONTACT.phone}` : CONTACT.instagram;
  const enquiryLabel = CONTACT.phone
    ? "Call about batches"
    : "Ask us on Instagram";

  return (
    <Section
      id="training"
      eyebrow="Training"
      split
      title={
        <>
          Coaching that builds a{" "}
          <span className="accent-word text-amber-300">real game</span>
        </>
      }
      intro="Four programme tracks, from a first lesson in grip and stance through to tournament preparation. Players are placed by level, not by age alone."
    >
      {/*
        An editorial index rather than a grid of cards. Four equal boxes make
        four programmes look interchangeable; a numbered list with a shared
        baseline makes the progression from Foundation to Competitive legible
        at a glance, which is the actual information here.
      */}
      <ul className="border-b border-hairline">
        {PROGRAMMES.map((programme, index) => (
          <li key={programme.title}>
            <Reveal delay={index * 70}>
              <article className="group relative grid grid-cols-1 items-start gap-x-8 gap-y-5 border-t border-hairline px-2 py-8 transition-colors duration-500 hover:border-amber-500/40 sm:px-4 lg:grid-cols-12 lg:gap-y-0 lg:py-11">
                {/* Hover wash. Sits behind the content and bleeds past the
                    row padding so the row lights up edge to edge. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 inset-y-0 -z-10 bg-gradient-to-r from-amber-500/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="font-display text-3xl leading-none font-semibold tabular-nums text-surface-4 transition-colors duration-500 group-hover:text-amber-400 lg:col-span-1 lg:text-4xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="lg:col-span-3">
                  <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-amber-400 uppercase">
                    {programme.audience}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text lg:text-[1.75rem]">
                    {programme.title}
                  </h3>
                </div>

                <p className="text-base leading-relaxed text-muted lg:col-span-4">
                  {programme.description}
                </p>

                <ul className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
                  {programme.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-muted transition-colors duration-500 group-hover:border-hairline-strong"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={120}>
        <div className="panel mt-10 flex flex-col items-start gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-5">
            <span
              aria-hidden="true"
              className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 sm:inline-flex"
            >
              <ArrowUpRightIcon className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                Batch timings and fees
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Timings differ by branch and by season. Talk to us and we&rsquo;ll
                put you in the batch that fits.
              </p>
            </div>
          </div>
          <Cta href={enquiryHref} size="lg" className="w-full shrink-0 sm:w-auto">
            {enquiryLabel}
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
