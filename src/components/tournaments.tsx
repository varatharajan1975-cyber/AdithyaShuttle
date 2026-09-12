import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { InstagramIcon, TrophyIcon } from "./ui/icons";
import { CONTACT, TOURNAMENT_FORMATS } from "@/content/site";

export function Tournaments() {
  return (
    <Section
      id="tournaments"
      eyebrow="Tournaments"
      title={
        <>
          Play the <span className="text-gold-gradient">competitive</span> game
        </>
      }
      intro="Graded draws that put you against players at your own level — not a random bracket where the first round decides everything."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {TOURNAMENT_FORMATS.map((format, index) => (
          <Reveal key={format.title} delay={index * 80}>
            <article className="surface-card group h-full rounded-2xl p-7 transition-colors duration-300 hover:border-gold-500/40">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                <TrophyIcon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-silver-100">
                {format.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-400">
                {format.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <div className="surface-card mt-6 flex flex-col items-start gap-5 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
              <InstagramIcon className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-silver-100">
                Fixtures go up on Instagram
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-silver-400">
                Draws, entry details and results are posted there first. Follow{" "}
                {CONTACT.instagramHandle} so you don&rsquo;t miss an entry
                deadline.
              </p>
            </div>
          </div>
          <Cta href={CONTACT.instagram} className="w-full shrink-0 sm:w-auto">
            Follow on Instagram
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
