/**
 * Single source of truth for every piece of copy, link, address and contact
 * detail on the site.
 *
 * Non-technical edits — a new phone number, a new batch, a new tournament,
 * a new gallery photo — should only ever require a change in this file.
 *
 * Anything marked `TODO(owner)` is a real gap that needs a genuine value from
 * the academy. The UI is written to degrade gracefully when these are `null`,
 * so the site never renders a broken link or an empty placeholder — it simply
 * hides that element until real data exists.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type BookingPlatform = "turftown" | "playo";

export type BookingLink = {
  platform: BookingPlatform;
  /** Shown on the button. */
  label: string;
  href: string;
};

export type Branch = {
  slug: string;
  /** Short name used in nav, headings and booking buttons. */
  name: string;
  /** Neighbourhood line shown under the name. */
  area: string;
  addressLines: string[];
  /** `null` until the academy confirms published opening hours. */
  hours: string | null;
  /** Google Maps directions link. */
  mapsUrl: string;
  amenities: string[];
  booking: BookingLink[];
};

export type Programme = {
  title: string;
  audience: string;
  description: string;
  highlights: string[];
};

export type GalleryItem = {
  /** Path under /public, or `null` to render on-brand placeholder artwork. */
  src: string | null;
  alt: string;
  /** Controls which placeholder illustration is drawn when `src` is null. */
  art: "court" | "shuttle" | "net" | "rally";
  /**
   * Renders the tile at 2x2 on large screens. Exactly one item should set
   * this: with six tiles in a three-column grid it tiles perfectly, and any
   * other combination leaves holes in the layout.
   */
  featured?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Brand                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Canonical brand name. Note that the academy is currently listed under three
 * different spellings across platforms ("Adithya Sports Academy" on the logo,
 * "Adithya Badminton Academy" on Turf Town, "Aditya Sports Academy" on Playo).
 * Search engines may treat those as separate businesses — worth aligning.
 */
export const BRAND = {
  name: "Adithya Sports Academy",
  legalName: "Adithya Sports Academy",
  tagline: "Badminton in North Chennai",
  /**
   * Swap to "/logo.png" once the real logo file is saved to public/logo.png.
   * The bundled /logo.svg is an interim mark so the site is never broken.
   */
  logo: "/logo.svg",
  description:
    "Adithya Sports Academy runs professional badminton courts and structured coaching in Thirumullaivoyal and Madhavaram, Chennai. Book a court by the hour on Turf Town or Playo, or join an academy batch.",
} as const;

/**
 * Public origin, used for canonical URLs, sitemap and Open Graph tags.
 * Vercel injects VERCEL_PROJECT_PRODUCTION_URL automatically; set
 * NEXT_PUBLIC_SITE_URL once a custom domain is attached.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

type Contact = {
  /** E.164 format, e.g. "+919876543210", or null while unknown. */
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  instagram: string;
  instagramHandle: string;
};

export const CONTACT: Contact = {
  // TODO(owner): add the academy phone number in E.164, e.g. "+919876543210".
  phone: null,
  // TODO(owner): add a WhatsApp number in E.164 if it differs from `phone`.
  whatsapp: null,
  // TODO(owner): add a public enquiries email address.
  email: null,
  instagram: "https://www.instagram.com/adithya_sportsacademy",
  instagramHandle: "@adithya_sportsacademy",
};

/* -------------------------------------------------------------------------- */
/* Booking                                                                     */
/* -------------------------------------------------------------------------- */

const TURF_TOWN_THIRUMULLAIVOYAL =
  "https://turftown.in/chennai/sports-venue/adithya-badminton-academy-thirumullaivoyal-badminton";
const TURF_TOWN_MADHAVARAM =
  "https://turftown.in/chennai/sports-venue/adithya-badminton-academy-madhavaram-badminton";
const PLAYO_MADHAVARAM = "https://go.playo.app/PLAYOO/A8tDG";

export const PLATFORM_LABEL: Record<BookingPlatform, string> = {
  turftown: "Turf Town",
  playo: "Playo",
};

/* -------------------------------------------------------------------------- */
/* Branches                                                                    */
/* -------------------------------------------------------------------------- */

const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const BRANCHES: Branch[] = [
  {
    slug: "thirumullaivoyal",
    name: "Thirumullaivoyal",
    area: "Thendral Nagar, Chennai",
    addressLines: [
      "No. 16, Brindhavan Street",
      "Thendral Nagar, Thirumullaivoyal",
      "Chennai, Tamil Nadu",
    ],
    // TODO(owner): confirm opening hours for this branch.
    hours: null,
    mapsUrl: mapsLink(
      "Adithya Badminton Academy, Brindhavan Street, Thendral Nagar, Thirumullaivoyal, Chennai",
    ),
    amenities: [
      "Free parking",
      "Changing rooms",
      "Rest rooms",
      "UPI payments accepted",
    ],
    booking: [
      {
        platform: "turftown",
        label: "Book on Turf Town",
        href: TURF_TOWN_THIRUMULLAIVOYAL,
      },
    ],
  },
  {
    slug: "madhavaram",
    name: "Madhavaram",
    area: "Venugopal Nagar, Chennai",
    addressLines: [
      "Perumal Koil Street – Assisi Nagar Link Road",
      "Venugopal Nagar, Madhavaram",
      "Chennai, Tamil Nadu 600060",
    ],
    hours: "7:00 AM – 10:00 PM, daily",
    mapsUrl: mapsLink(
      "Adithya Sports Academy, Perumal Koil Street, Venugopal Nagar, Madhavaram, Chennai 600060",
    ),
    amenities: [
      "Free parking",
      "Changing rooms",
      "Showers",
      "Drinking water",
      "First aid",
      "Racket & shoe rental",
    ],
    booking: [
      {
        platform: "turftown",
        label: "Book on Turf Town",
        href: TURF_TOWN_MADHAVARAM,
      },
      {
        platform: "playo",
        label: "Book on Playo",
        href: PLAYO_MADHAVARAM,
      },
    ],
  },
];

/** Every booking link on the site, flattened for the booking section. */
export const ALL_BOOKING_LINKS = BRANCHES.flatMap((branch) =>
  branch.booking.map((link) => ({ ...link, branch })),
);

/** Primary "Book a Court" target used by the header and hero CTAs. */
export const PRIMARY_BOOKING_HREF = "#booking";

/* -------------------------------------------------------------------------- */
/* Court rules (published by the academy on Playo)                             */
/* -------------------------------------------------------------------------- */

export const COURT_RULES = [
  "Non-marking shoes are mandatory on court.",
  "Carry socks if you are renting shoes.",
  "Barefoot play is not permitted.",
  "Up to 4 players per court, per booking.",
] as const;

/* -------------------------------------------------------------------------- */
/* Training                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Programme tiers. Batch timings and fees are deliberately not listed here —
 * publishing guessed numbers would be worse than sending people to ask.
 * TODO(owner): supply real batch timings, age groups, coach names and fees and
 * this section can grow a proper schedule table.
 */
export const PROGRAMMES: Programme[] = [
  {
    title: "Foundation",
    audience: "New to badminton",
    description:
      "Grip, stance, footwork and the basic strokes — built slowly and correctly, so nothing has to be unlearned later.",
    highlights: ["Grip & stance", "Court movement", "Serve and clear"],
  },
  {
    title: "Intermediate",
    audience: "Players with a base",
    description:
      "Stroke consistency, shot selection and rally construction, with match play every session to put it under pressure.",
    highlights: ["Stroke consistency", "Shot selection", "Match play"],
  },
  {
    title: "Competitive",
    audience: "Tournament players",
    description:
      "Speed, endurance and tactics for players entering district and state-level draws, with structured sparring.",
    highlights: ["Speed & endurance", "Tactical drills", "Tournament prep"],
  },
  {
    title: "Adults & Fitness",
    audience: "Play for the love of it",
    description:
      "Evening and early-morning sessions for working players who want a real workout and a genuinely competitive game.",
    highlights: ["Flexible timings", "All levels", "Fitness focused"],
  },
];

/* -------------------------------------------------------------------------- */
/* Tournaments                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Formats the academy runs. Individual fixtures are intentionally not listed —
 * they are announced on Instagram, and a stale "upcoming event" on a website is
 * worse than none at all.
 *
 * TODO(owner): if you want dated fixtures on the site, send the details and
 * this becomes a proper event list with structured data for Google.
 */
export const TOURNAMENT_FORMATS = [
  {
    title: "Singles draws",
    body: "Graded singles brackets so players meet opponents at their own level rather than a random draw.",
  },
  {
    title: "Doubles & mixed",
    body: "Doubles and mixed-doubles events — the format most of our regulars actually play week to week.",
  },
  {
    title: "Corporate & group events",
    body: "Block-booked courts and a run-of-day format for company teams, societies and friend groups.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Amenities shown in the highlights strip                                     */
/* -------------------------------------------------------------------------- */

export const HIGHLIGHTS = [
  {
    icon: "court" as const,
    title: "Proper courts",
    body: "Indoor badminton courts kept match-ready, at both branches.",
  },
  {
    icon: "coach" as const,
    title: "Structured coaching",
    body: "Programmes from absolute beginner through to tournament level.",
  },
  {
    icon: "parking" as const,
    title: "Free parking",
    body: "Park on site at both branches — no hunting for a spot after work.",
  },
  {
    icon: "shower" as const,
    title: "Showers & changing",
    body: "Changing rooms at both branches, showers at Madhavaram.",
  },
  {
    icon: "aid" as const,
    title: "First aid on site",
    body: "First-aid kit and drinking water available through the day.",
  },
  {
    icon: "racket" as const,
    title: "Rackets & shoes",
    body: "Turn up empty-handed — rental gear is available at Madhavaram.",
  },
];

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Photographs of both branches, taken from the academy's own Turf Town and
 * Playo venue listings. Three per branch, every one an empty court — there are
 * no identifiable people in any of them, so nothing here needs consent.
 *
 * `art` is the fallback illustration drawn if `src` is ever set back to null,
 * so a removed photo degrades to on-brand artwork rather than a broken tile.
 *
 * To add more: drop the file in `public/gallery/` and add a row here.
 */
export const GALLERY: GalleryItem[] = [
  {
    src: "/gallery/madhavaram-main-court.jpg",
    alt: "Main badminton court at the Madhavaram branch",
    art: "court",
    featured: true,
  },
  {
    src: "/gallery/thirumullaivoyal-show-court.jpg",
    alt: "Badminton court at the Thirumullaivoyal branch",
    art: "court",
  },
  {
    src: "/gallery/madhavaram-net.jpg",
    alt: "Net and service lines on the Madhavaram court",
    art: "net",
  },
  {
    src: "/gallery/thirumullaivoyal-courts.jpg",
    alt: "Full court view at the Thirumullaivoyal branch",
    art: "court",
  },
  {
    src: "/gallery/madhavaram-floodlights.jpg",
    alt: "Madhavaram court under floodlights",
    art: "rally",
  },
  {
    src: "/gallery/thirumullaivoyal-surface.jpg",
    alt: "Court surface and markings at Thirumullaivoyal",
    art: "court",
  },
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Training", href: "#training" },
  { label: "Branches", href: "#branches" },
  { label: "Tournaments", href: "#tournaments" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;
