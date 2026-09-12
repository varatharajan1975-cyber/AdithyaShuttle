import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CopyButton } from "./ui/copy-button";
import { OpenStatus } from "./ui/open-status";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/icons";
import { BRANCHES, CONTACT } from "@/content/site";
import { formatHours } from "@/lib/hours";

/** What people actually message the academy about. */
const ENQUIRY_TOPICS = [
  "Batch availability and timings",
  "Court availability at either branch",
  "Group and corporate bookings",
  "Tournament entries",
];

type Channel = {
  key: string;
  Glyph: typeof PhoneIcon;
  label: string;
  value: string;
  href: string;
};

/**
 * Only channels that actually have a value are rendered — a dead `tel:` link
 * or an "email us" card with no address is worse than an honest omission.
 */
function buildChannels(): Channel[] {
  const channels: Channel[] = [];

  if (CONTACT.phone) {
    channels.push({
      key: "phone",
      Glyph: PhoneIcon,
      label: "Call",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
    });
  }

  const whatsapp = CONTACT.whatsapp ?? CONTACT.phone;
  if (whatsapp) {
    channels.push({
      key: "whatsapp",
      Glyph: WhatsAppIcon,
      label: "WhatsApp",
      value: whatsapp,
      // wa.me expects the number without "+" or separators.
      href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
    });
  }

  if (CONTACT.email) {
    channels.push({
      key: "email",
      Glyph: MailIcon,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    });
  }

  channels.push({
    key: "instagram",
    Glyph: InstagramIcon,
    label: "Instagram",
    value: CONTACT.instagramHandle,
    href: CONTACT.instagram,
  });

  return channels;
}

export function Contact() {
  const channels = buildChannels();

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      split
      title={
        <>
          Come and <span className="accent-word text-amber-300">play</span>
        </>
      }
      intro="Questions about batches, court availability or a group booking? Reach us on any of these."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="panel flex h-full flex-col rounded-3xl p-7 sm:p-8">
            <h3 className="font-display text-xl font-semibold tracking-tight text-text">
              Talk to us
            </h3>

            <ul className="mt-6 space-y-2.5" aria-label="Contact channels">
              {channels.map(({ key, Glyph, label, value, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface-2 p-4 transition-colors duration-300 hover:border-amber-400/45 hover:bg-surface-3"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300">
                      <Glyph className="size-[1.05rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.68rem] font-semibold tracking-[0.18em] text-faint uppercase">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-text transition-colors group-hover:text-amber-200">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <h4 className="text-[0.68rem] font-semibold tracking-[0.18em] text-faint uppercase">
                Ask us about
              </h4>
              <ul className="mt-5 space-y-3">
                {ENQUIRY_TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3 shrink-0 bg-amber-500/70"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-3">
          {/*
            No `h-full` / `flex-1` here. Stretching this column to the grid row
            height and then dividing it between two `flex-1` cards compressed
            each card below its own content, and `overflow-hidden` on the
            rounded card clipped the buttons clean off. Natural height instead.
          */}
          <div className="flex flex-col gap-6">
            {BRANCHES.map((branch) => {
              const hours = formatHours(branch.hours);
              const address = branch.addressLines.join(", ");

              return (
                <div
                  key={branch.slug}
                  className="panel overflow-hidden rounded-3xl"
                >
                  {/*
                    A live map rather than a link that only proves an address
                    exists. Google's `output=embed` endpoint needs no API key,
                    so there is no billing account or rotating key that can
                    silently break this.
                  */}
                  <iframe
                    src={branch.mapEmbedUrl}
                    title={`Map showing the ${branch.name} branch`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    /*
                      Google serves this tile set light-only, and a sheet of
                      white in the middle of a dark page is the brightest thing
                      on screen by a wide margin. Inverting and rotating the
                      hue a half turn is the standard way to darken a map you
                      do not control: land and water swap to dark values while
                      the label text stays legible. Hovering restores the
                      original, for anyone who wants the familiar rendering.
                    */
                    className="h-52 w-full border-0 invert-[0.92] brightness-[0.95] contrast-[0.92] saturate-[0.85] transition-[filter] duration-500 hue-rotate-180 hover:invert-0 hover:hue-rotate-0"
                  />

                  <div className="border-t border-hairline p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="font-display text-lg font-semibold tracking-tight text-text">
                          {branch.name}
                        </h4>
                        <p className="mt-2.5 flex gap-2.5 text-sm leading-relaxed text-muted">
                          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
                          <span>{address}</span>
                        </p>
                        {hours ? (
                          <p className="mt-2 flex items-center gap-2.5 text-sm text-muted">
                            <ClockIcon className="size-4 shrink-0 text-amber-500" />
                            {hours}
                          </p>
                        ) : null}
                      </div>
                      <OpenStatus hours={branch.hours} />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      <Cta
                        href={branch.mapsUrl}
                        variant="secondary"
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
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
