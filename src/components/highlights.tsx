import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { HIGHLIGHT_ICONS } from "./ui/icons";
import { HIGHLIGHTS } from "@/content/site";

export function Highlights() {
  return (
    <Section
      id="about"
      eyebrow="Why play here"
      title={
        <>
          Everything you need to <span className="text-gold-gradient">just play</span>
        </>
      }
      intro="Turn up after work, park on site, change, play. No queue, no fuss, and nothing missing when you get there."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((item, index) => {
          const Glyph = HIGHLIGHT_ICONS[item.icon];

          return (
            <li key={item.title}>
              <Reveal delay={index * 70} className="h-full">
                <article className="surface-card group h-full rounded-2xl p-6 transition-colors duration-300 hover:border-gold-500/40">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300 transition-colors duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-500/15">
                    <Glyph className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-silver-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-400">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
