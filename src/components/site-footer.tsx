import { BrandMark } from "./brand-mark";
import { InstagramIcon } from "./ui/icons";
import {
  ALL_BOOKING_LINKS,
  BRANCHES,
  BRAND,
  CONTACT,
  NAV_LINKS,
  PLATFORM_LABEL,
} from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver-400">
              Badminton courts and coaching in Thirumullaivoyal and Madhavaram,
              Chennai.
            </p>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line-2 px-4 py-2.5 text-sm font-medium text-silver-300 transition-colors hover:border-gold-500/60 hover:text-gold-200"
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

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-silver-500 sm:flex-row sm:items-center sm:justify-between">
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
      <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-400 uppercase">
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
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="text-sm text-silver-400 transition-colors hover:text-gold-200"
      >
        {children}
      </a>
    </li>
  );
}
