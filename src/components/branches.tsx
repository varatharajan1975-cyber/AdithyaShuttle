import Image from "next/image";
import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CopyButton } from "./ui/copy-button";
import { OpenStatus } from "./ui/open-status";
import { ClockIcon, MapPinIcon } from "./ui/icons";
import { BRANCHES, PLATFORM_LABEL } from "@/content/site";
import { formatHours } from "@/lib/hours";

export function Branches() {
  return (
    <Section
      id="branches"
      eyebrow="Branches"
      split
      title={
        <>
          Two halls,{" "}
          <span className="accent-word text-amber-300">both sides</span> of town
        </>
      }
      intro="Thirumullaivoyal and Madhavaram. Free parking at both, and everything you need to change and get on court."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {BRANCHES.map((branch, index) => {
          const hours = formatHours(branch.hours);
          const address = branch.addressLines.join(", ");

          return (
            <Reveal key={branch.slug} delay={index * 90}>
              <article className="panel group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-hairline-strong">
                {/* The branch photograph carries the name, so each panel is
                    identifiable before a word of the address is read. */}
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={branch.image}
                    alt={`Court at the ${branch.name} branch`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="photo-scrim absolute inset-0" />

                  <OpenStatus
                    hours={branch.hours}
                    className="absolute top-4 right-4 backdrop-blur-md"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-[2rem]">
                      {branch.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-amber-300">
                      {branch.area}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
                  <div className="space-y-3.5 text-sm">
                    <p className="flex gap-3 text-muted">
                      <MapPinIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
                      <span className="leading-relaxed">
                        {branch.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </p>

                    {hours ? (
                      <p className="flex items-center gap-3 text-muted">
                        <ClockIcon className="size-4 shrink-0 text-amber-500" />
                        {hours}
                      </p>
                    ) : null}
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {branch.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>

                  {/* `mt-auto` sits on the platform line rather than on the
                      buttons, so the slack in a shorter card opens up above
                      this pair instead of between the label and the buttons it
                      describes. */}
                  <p className="mt-auto text-xs tracking-[0.16em] text-faint uppercase">
                    Bookable on{" "}
                    {branch.booking
                      .map((link) => PLATFORM_LABEL[link.platform])
                      .join(" · ")}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
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
                    <CopyButton
                      value={`${branch.name} — ${address}`}
                      label={`${branch.name} address`}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
