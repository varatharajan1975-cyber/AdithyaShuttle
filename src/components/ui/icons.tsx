import type { SVGProps } from "react";

/**
 * Hand-rolled icon set.
 *
 * Deliberately not an icon library: the site needs ~14 glyphs, and inlining
 * them keeps the client bundle free of an extra dependency and its supply
 * chain. All icons share a 24x24 grid and inherit `currentColor`.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CourtIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 12h18M12 4v16M7 4v16M17 4v16" />
    </Icon>
  );
}

export function CoachIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      <path d="M18.5 3.5 21 6l-2.5 2.5" />
    </Icon>
  );
}

export function ParkingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9.5 17V7h3.2a3 3 0 0 1 0 6H9.5" />
    </Icon>
  );
}

export function ShowerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 13V6.5A2.5 2.5 0 0 1 7.5 4h.2" />
      <path d="M2.5 13h12" />
      <path d="M5.5 17v1.5M8.5 16.5V19M11.5 17v1.5" />
      <path d="M18 4v6" />
      <circle cx="18" cy="12.5" r="2.2" />
    </Icon>
  );
}

export function AidIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="6.5" width="19" height="13" rx="2.5" />
      <path d="M8.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v1.5" />
      <path d="M12 10.5v5M9.5 13h5" />
    </Icon>
  );
}

export function RacketIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <ellipse cx="14" cy="9" rx="5.5" ry="6.5" transform="rotate(35 14 9)" />
      <path d="M9.8 13.4 3.5 20.5" />
      <path d="M10.5 16.2 7.8 13.5" />
    </Icon>
  );
}

export function ShuttleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      {/* Feather rim and skirt, flaring up from the cork. */}
      <ellipse cx="12" cy="5" rx="7" ry="2.3" />
      <path d="M5 5 8.9 16.4M19 5l-3.9 11.4" />
      {/* Cork base. */}
      <path d="M8.9 16.4h6.2" />
      <path d="M8.9 16.4Q12 20.8 15.1 16.4" />
      {/* Binding thread and feather ribs. */}
      <path d="M7.6 11.2h8.8" strokeWidth="0.9" />
      <path d="M12 16.4V2.8M10.2 16.3 8.4 3.6M13.8 16.3l1.8-12.7" strokeWidth="0.8" />
    </Icon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Icon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </Icon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.2 3.5h3l1.5 4-2 1.4a12 12 0 0 0 5.4 5.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 20.5 5 16.4A8 8 0 1 1 8.1 19.4l-4.6 1.1Z" />
      <path d="M9 9.2c.3 2.3 2.4 4.5 4.8 5 .8.2 1.5-.4 1.6-1.1l.1-.6-2-.9-.8.9a5.4 5.4 0 0 1-2.2-2.3l.9-.7-.9-2-.6.1c-.7.1-1 .8-.9 1.6Z" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5v1.5A3.5 3.5 0 0 0 8 11M17 6h2.5v1.5A3.5 3.5 0 0 1 16 11" />
      <path d="M12 14v3.5M8.5 20.5h7l-.7-3h-5.6l-.7 3Z" />
    </Icon>
  );
}

/** Maps the `icon` key used in site content to a component. */
export const HIGHLIGHT_ICONS = {
  court: CourtIcon,
  coach: CoachIcon,
  parking: ParkingIcon,
  shower: ShowerIcon,
  aid: AidIcon,
  racket: RacketIcon,
} as const;

export type HighlightIconName = keyof typeof HIGHLIGHT_ICONS;
