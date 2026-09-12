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
      split
      title={
        <>
          Play the{" "}
          <span className="accent-word text-amber-300">competitive</span> game
        </>
      }
      intro="Graded draws that put you against players at your own level — not a random bracket where the first round decides everything."
    >
      {/*
        Columns divided by vertical hairlines instead of three bordered cards.
        The formats are variations on one idea, and a shared rule says that;
        three separate boxes would say they are three unrelated things.
      */}
      <div className="grid border-t border-hairline lg:grid-cols-3">
        {TOURNAMENT_FORMATS.map((format, index) => {
          const isFirst = index === 0;
          const isLast = index === TOURNAMENT_FORMATS.length - 1;

          return (
            /*
              The dividers live on the Reveal wrapper, because that — not the
              <article> inside it — is the actual grid child. Hanging them off
              `first:`/`last:` on the article silently matched every column,
              since each article is an only child of its own wrapper, and the
              rules disappeared entirely.
            */
            <Reveal
              key={format.title}
              delay={index * 80}
              className={`h-full border-b border-hairline lg:border-b-0 ${
                isLast ? "" : "lg:border-r lg:border-hairline"
              }`}
            >
              <article
                className={`flex h-full flex-col py-8 lg:py-10 ${
                  isFirst ? "lg:pr-10" : isLast ? "lg:pl-10" : "lg:px-10"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300"
                >
                  <TrophyIcon className="size-[1.1rem]" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-text">
                  {format.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {format.body}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={140}>
        <div className="panel mt-12 flex flex-col items-start gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-5">
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300"
            >
              <InstagramIcon className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                Fixtures go up on Instagram
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Draws, entry details and results are posted there first. Follow{" "}
                {CONTACT.instagramHandle} so you don&rsquo;t miss an entry
                deadline.
              </p>
            </div>
          </div>
          <Cta
            href={CONTACT.instagram}
            size="lg"
            className="w-full shrink-0 sm:w-auto"
          >
            Follow on Instagram
          </Cta>
        </div>
      </Reveal>
    </Section>
  );
}
