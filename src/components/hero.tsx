import { Cta } from "./ui/cta";
import { Eyebrow } from "./ui/section";
import { MapPinIcon, ShuttleIcon } from "./ui/icons";
import { BRANCHES, PRIMARY_BOOKING_HREF } from "@/content/site";

/** Facts shown in the hero strip. Every one is verifiable — no invented stats. */
const STATS = [
  { value: String(BRANCHES.length), label: "Branches in North Chennai" },
  { value: "7AM–10PM", label: "Daily play hours at Madhavaram" },
  { value: "All levels", label: "Beginner through competitive" },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-[calc(var(--header-height)+3rem)] pb-20 sm:pb-24 lg:min-h-[92svh] lg:pt-[calc(var(--header-height)+5rem)]"
    >
      <HeroBackdrop />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Thirumullaivoyal &middot; Madhavaram &middot; Chennai</Eyebrow>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <span className="block text-silver-gradient">Own every</span>
            <span className="block text-gold-gradient">rally.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-silver-300 sm:text-lg">
            Proper indoor badminton courts and structured coaching across two
            branches in North Chennai. Book by the hour, or train with us all
            season.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta href={PRIMARY_BOOKING_HREF} size="lg" className="w-full sm:w-auto">
              Book a Court
            </Cta>
            <Cta
              href="#training"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Join the Academy
            </Cta>
          </div>

          <ul className="mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {STATS.map((stat) => (
              <li key={stat.label} className="bg-ink-2/80 px-5 py-5 backdrop-blur-sm">
                <p className="font-display text-xl font-bold text-gold-300 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-snug text-silver-400">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-center gap-2 text-sm text-silver-500">
            <MapPinIcon className="size-4 shrink-0 text-gold-500" />
            Bookings handled on Turf Town and Playo
          </p>
        </div>
      </div>
    </section>
  );
}

/** Layered, purely decorative background: grid, glow and a drifting shuttle. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="court-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />

      <div className="absolute top-[-18%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,151,27,0.20),transparent_62%)] blur-2xl" />
      <div className="absolute right-[-12%] bottom-[-22%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,178,46,0.12),transparent_65%)] blur-3xl" />

      <ShuttleIcon className="absolute top-[22%] right-[8%] hidden size-40 animate-float text-gold-500/15 lg:block" />
      <ShuttleIcon className="absolute bottom-[14%] left-[4%] hidden size-24 animate-float text-gold-400/10 [animation-delay:-4s] xl:block" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
