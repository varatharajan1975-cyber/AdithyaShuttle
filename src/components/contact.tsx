import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/icons";
import { BRANCHES, CONTACT } from "@/content/site";

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
      title={
        <>
          Come and <span className="text-gold-gradient">play</span>
        </>
      }
      intro="Questions about batches, court availability or a group booking? Reach us on any of these."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="surface-card flex h-full flex-col gap-3 rounded-2xl p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-silver-100">
              Talk to us
            </h3>

            <ul className="mt-2 space-y-3" aria-label="Contact channels">
              {channels.map(({ key, Glyph, label, value, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-ink/50 p-4 transition-colors hover:border-gold-500/45 hover:bg-ink-3"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold-500/25 bg-gold-500/10 text-gold-300">
                      <Glyph className="size-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.7rem] font-semibold tracking-[0.16em] text-silver-500 uppercase">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-silver-200 transition-colors group-hover:text-gold-200">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <h4 className="text-[0.7rem] font-semibold tracking-[0.18em] text-silver-500 uppercase">
                Ask us about
              </h4>
              <ul className="mt-4 space-y-2.5">
                {ENQUIRY_TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-3 text-sm text-silver-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3 shrink-0 bg-gold-500/70"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-3">
          <div className="surface-card flex h-full flex-col rounded-2xl p-7 sm:p-8">
            <h3 className="font-display text-lg font-bold text-silver-100">
              Find a branch
            </h3>

            <ul className="mt-5 flex-1 space-y-4">
              {BRANCHES.map((branch) => (
                <li
                  key={branch.slug}
                  className="rounded-xl border border-line bg-ink/50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-display text-base font-bold text-silver-100">
                        {branch.name}
                      </h4>
                      <p className="mt-2 flex gap-2.5 text-sm leading-relaxed text-silver-400">
                        <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-500" />
                        <span>{branch.addressLines.join(", ")}</span>
                      </p>
                      {branch.hours ? (
                        <p className="mt-2 flex items-center gap-2.5 text-sm text-silver-400">
                          <ClockIcon className="size-4 shrink-0 text-gold-500" />
                          {branch.hours}
                        </p>
                      ) : null}
                    </div>
                    <Cta
                      href={branch.mapsUrl}
                      variant="secondary"
                      className="shrink-0"
                      aria-label={`Get directions to the ${branch.name} branch`}
                    >
                      Directions
                    </Cta>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
