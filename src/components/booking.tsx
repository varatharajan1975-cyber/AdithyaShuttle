import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CheckIcon } from "./ui/icons";
import { BRANCHES, COURT_RULES, PLATFORM_LABEL } from "@/content/site";

export function Booking() {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="court-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-1/2 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,151,27,0.13),transparent_65%)] blur-3xl" />
      </div>

      <Section
        id="booking"
        eyebrow="Booking"
        centered
        title={
          <>
            Book a court in{" "}
            <span className="text-gold-gradient">under a minute</span>
          </>
        }
        intro="Courts are booked through Turf Town and Playo — live slot availability, instant confirmation, and UPI payment. Pick your branch below."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {BRANCHES.map((branch, index) => (
            <Reveal key={branch.slug} delay={index * 90}>
              <article className="surface-card flex h-full flex-col rounded-2xl p-7 text-center sm:p-8">
                <h3 className="font-display text-xl font-bold text-silver-100">
                  {branch.name}
                </h3>
                <p className="mt-1.5 text-sm text-silver-400">{branch.area}</p>

                <p className="mt-4 text-xs tracking-wide text-silver-500 uppercase">
                  Available on{" "}
                  {branch.booking
                    .map((link) => PLATFORM_LABEL[link.platform])
                    .join(" · ")}
                </p>

                <div className="mt-7 flex flex-col gap-2.5">
                  {branch.booking.map((link, linkIndex) => (
                    <Cta
                      key={link.href}
                      href={link.href}
                      size="lg"
                      variant={linkIndex === 0 ? "primary" : "secondary"}
                      aria-label={`${link.label} — ${branch.name} branch`}
                    >
                      {link.label}
                    </Cta>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="surface-card mt-6 rounded-2xl p-7 sm:p-8">
            <h3 className="font-display text-base font-bold text-silver-100">
              Before you arrive
            </h3>
            <ul className="mt-5 grid gap-3 text-sm text-silver-400 sm:grid-cols-2">
              {COURT_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2.5 text-left">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
