import { BrandMark } from "./brand-mark";
import { InstagramIcon, PhoneIcon } from "./ui/icons";
import {
  ALL_BOOKING_LINKS,
  BRANCHES,
  BRAND,
  CONTACT,
  formatPhone,
  NAV_LINKS,
  PLATFORM_LABEL,
} from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-surface">
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <BrandMark size="lg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Badminton courts and coaching in Thirumullaivoyal and Madhavaram,
              Chennai.
            </p>
            {CONTACT.phones.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {CONTACT.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-text transition-colors hover:text-amber-200"
                    >
                      <PhoneIcon className="size-4 shrink-0 text-amber-500" />
                      {formatPhone(phone)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-hairline px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-amber-400/60 hover:text-amber-200"
            >
              <InstagramIcon className="size-4" />
              {CONTACT.instagramHandle}
            </a>
          </div>

          <FooterColumn title="Explore">
            {NAV_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Branches">
            {BRANCHES.map((branch) => (
              <FooterLink key={branch.slug} href={branch.mapsUrl} external>
                {branch.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Book a court">
            {ALL_BOOKING_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href} external>
                {link.branch.name} &middot; {PLATFORM_LABEL[link.platform]}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Oversized wordmark, clipped by the section edge. Purely typographic
            texture — hidden from assistive technology because the lockup
            above already names the academy. */}
        <p
          aria-hidden="true"
          className="mt-16 -mb-[0.18em] translate-y-[0.12em] text-center font-display text-[19vw] leading-[0.8] font-semibold tracking-[-0.045em] text-text/[0.045] select-none"
        >
          Adithya
        </p>

        <div className="flex flex-col gap-3 border-t border-hairline pt-8 pb-[calc(2rem+var(--bookbar-height))] text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:pb-10">
          <p>
            &copy; {year} {BRAND.legalName}. All rights reserved.
          </p>
          <p>Court bookings powered by Turf Town and Playo.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[0.68rem] font-semibold tracking-[0.2em] text-amber-400 uppercase">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-sm text-muted transition-colors hover:text-amber-200"
      >
        {children}
      </a>
    </li>
  );
}
