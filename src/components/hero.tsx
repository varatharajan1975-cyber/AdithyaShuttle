import Image from "next/image";
import heroImage from "../../public/gallery/madhavaram-main-court.jpg";
import { Cta } from "./ui/cta";
import { OpenStatus } from "./ui/open-status";
import { ArrowDownIcon } from "./ui/icons";
import { BRANCHES, PRIMARY_BOOKING_HREF } from "@/content/site";
import { branchWithHours, formatHours } from "@/lib/hours";

export function Hero() {
  const hoursBranch = branchWithHours();

  /** Every figure is verifiable from the content file — no invented stats. */
  const stats = [
    { value: String(BRANCHES.length), label: "Branches in North Chennai" },
    {
      value: hoursBranch?.hours
        ? formatHours(hoursBranch.hours)!.replace(", daily", "")
        : "Indoor",
      label: hoursBranch ? `Daily play at ${hoursBranch.name}` : "Courts",
    },
    { value: "All levels", label: "Beginner to competitive" },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[calc(var(--header-height)+4rem)] pb-10 sm:pb-14"
    >
      {/*
        The lead photograph is the single biggest change from the previous
        build, which opened on an empty CSS gradient. A venue sells on what it
        looks like, so the first thing above the fold is the actual hall.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt=""
          fill
          // The LCP element, so it is preloaded rather than lazily discovered.
          // (`priority` was deprecated in Next.js 16 in favour of `preload`.)
          preload
          placeholder="blur"
          quality={82}
          sizes="100vw"
          className="scale-105 object-cover object-center"
        />

        {/* Stacked treatments, each doing one job: deepen the photo's
            exposure, guarantee contrast under the headline, and warm the
            highlights so the hall lights agree with the amber accent.

            The warm pass is `soft-light` at low strength rather than `screen`.
            Screen lifts black points, which washed the court out to a grey
            haze and threw away the one saturated colour the page has. */}
        <div className="absolute inset-0 bg-canvas/55" />
        <div className="photo-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_18%,rgba(239,177,52,0.35),transparent_72%)] mix-blend-soft-light" />
        <div className="court-lines absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-4xl">
          {hoursBranch ? (
            <OpenStatus
              hours={hoursBranch.hours}
              branchName={hoursBranch.name}
              size="md"
              className="mb-8"
            />
          ) : null}

          <h1
            id="hero-heading"
            className="text-[3.25rem] leading-[0.94] font-semibold text-balance sm:text-7xl lg:text-[6.5rem]"
          >
            {/* The full stop lives inside the accent span: `accent-word` adds
                trailing space so an upright word can follow an italic, and
                that space was visibly detaching the period from "rally". */}
            Own every{" "}
            <span className="accent-word text-amber-300">rally.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            Indoor badminton courts and structured coaching across two branches
            in North Chennai. Book by the hour, or train with us all season.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta
              href={PRIMARY_BOOKING_HREF}
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a court
            </Cta>
            <Cta
              href="#training"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Join the academy
            </Cta>
          </div>
        </div>

        {/* Facts rail. Hairline-separated columns rather than the old boxed
            cards — at the bottom of a photograph, borders on four sides read
            as clutter where a single rule reads as structure. */}
        <dl className="mt-16 grid max-w-4xl grid-cols-1 border-t border-hairline sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-hairline py-5 sm:border-b-0 sm:border-r sm:px-6 sm:py-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
                  {stat.value}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1.5 block text-[0.8rem] leading-snug text-faint"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="#about"
          className="mt-10 inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.16em] text-faint uppercase transition-colors hover:text-amber-200"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-full border border-hairline"
          >
            <ArrowDownIcon className="size-3.5" />
          </span>
          Look around
        </a>
      </div>
    </section>
  );
}
