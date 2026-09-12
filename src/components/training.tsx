import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CheckIcon } from "./ui/icons";
import { CONTACT, PROGRAMMES } from "@/content/site";

export function Training() {
  /**
   * Batch timings and fees are not published here on purpose — they change,
   * and guessing them would send people to the wrong court at the wrong time.
   * The enquiry CTA points at whichever channel is actually configured.
   */
  const enquiryHref = CONTACT.phone
    ? `tel:${CONTACT.phone}`
    : CONTACT.instagram;
  const enquiryLabel = CONTACT.phone
    ? "Call about batches"
    : "Ask us on Instagram";

  return (
    <Section
      id="training"
      eyebrow="Training"
      title={
        <>
          Coaching that builds a{" "}
          <span className="text-gold-gradient">real game</span>
        </>
      }
      intro="Four programme tracks, from a first lesson in grip and stance through to tournament preparation. Players are placed by level, not by age alone."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {PROGRAMMES.map((programme, index) => (
          <Reveal key={programme.title} delay={index * 80}>
            <article className="surface-card group relative h-full overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-gold-500/40">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-gold-400 uppercase">
                {programme.audience}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-silver-100">
                {programme.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-400">
                {programme.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {programme.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-ink/60 px-3 py-1.5 text-xs font-medium text-silver-300"
                  >
                    <CheckIcon className="size-3.5 shrink-0 text-gold-400" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="surface-card mt-6 flex flex-col items-start gap-5 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-display text-lg font-bold text-silver-100">
              Batch timings and fees
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-silver-400">
              Timings differ by branch and by season. Talk to us and we&rsquo;ll
              put you in the batch that fits.
            </p>
          </div>
          <Cta href={enquiryHref} className="w-full shrink-0 sm:w-auto">
            {enquiryLabel}
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
