import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { ClockIcon, MapPinIcon } from "./ui/icons";
import { BRANCHES } from "@/content/site";

export function Branches() {
  return (
    <Section
      id="branches"
      eyebrow="Branches"
      title={
        <>
          Two courts, <span className="text-gold-gradient">both sides of town</span>
        </>
      }
      intro="Thirumullaivoyal and Madhavaram. Free parking at both, and everything you need to change and get on court."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {BRANCHES.map((branch, index) => (
          <Reveal key={branch.slug} delay={index * 90}>
            <article className="surface-card flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative overflow-hidden border-b border-line bg-ink/40 px-7 pt-7 pb-6">
                {/* Court lines sit on their own layer so the fade mask applies
                    to the pattern and not to the heading text above it. */}
                <div
                  aria-hidden="true"
                  className="court-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-silver-100 sm:text-[1.65rem]">
                    {branch.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-gold-400">{branch.area}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 p-7">
                <div className="space-y-4 text-sm">
                  <p className="flex gap-3 text-silver-300">
                    <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                    <span className="leading-relaxed">
                      {branch.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </p>

                  {branch.hours ? (
                    <p className="flex items-center gap-3 text-silver-300">
                      <ClockIcon className="size-4 shrink-0 text-gold-500" />
                      {branch.hours}
                    </p>
                  ) : null}
                </div>

                <ul className="flex flex-wrap gap-2">
                  {branch.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="rounded-full border border-line-2 bg-ink/60 px-3 py-1.5 text-xs font-medium text-silver-400"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap">
                  {branch.booking.map((link) => (
                    <Cta
                      key={link.href}
                      href={link.href}
                      className="w-full sm:w-auto"
                      aria-label={`${link.label} — ${branch.name} branch`}
                    >
                      {link.label}
                    </Cta>
                  ))}
                  <Cta
                    href={branch.mapsUrl}
                    variant="secondary"
                    className="w-full sm:w-auto"
                    aria-label={`Get directions to the ${branch.name} branch`}
                  >
                    Directions
                  </Cta>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
