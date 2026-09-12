import Image from "next/image";
import netImage from "../../public/gallery/madhavaram-net.jpg";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { HIGHLIGHT_ICONS } from "./ui/icons";
import { HIGHLIGHTS } from "@/content/site";

export function Highlights() {
  return (
    <Section
      id="about"
      eyebrow="Why play here"
      split
      title={
        <>
          Everything you need to{" "}
          <span className="accent-word text-amber-300">just play</span>
        </>
      }
      intro="Turn up after work, park on site, change, play. No queue, no fuss, and nothing missing when you get there."
    >
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        {/*
          A single tall photograph anchoring the amenity list. The list itself
          is set as hairline-separated rows rather than six bordered cards:
          six identical boxes in a grid is the layout the rest of the page used
          everywhere, and repeating it here is what made the site read as one
          long template.
        */}
        <Reveal className="lg:col-span-2">
          <figure className="relative h-64 overflow-hidden rounded-2xl border border-hairline sm:h-80 lg:h-full lg:min-h-[30rem]">
            <Image
              src={netImage}
              alt="Net and service lines on the Madhavaram court"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-3">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {HIGHLIGHTS.map((item, index) => {
              const Glyph = HIGHLIGHT_ICONS[item.icon];

              return (
                <li key={item.title}>
                  <Reveal delay={index * 60}>
                    <div className="group flex gap-4 border-t border-hairline py-6 transition-colors duration-300 hover:border-amber-500/40">
                      <Glyph className="mt-0.5 size-5 shrink-0 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
                      <div>
                        <h3 className="text-base font-semibold text-text">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
