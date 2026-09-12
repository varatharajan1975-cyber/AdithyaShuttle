import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "quiet" | "ghost";
type Size = "sm" | "md" | "lg";

type CtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Overrides the auto-detected external-link behaviour. */
  external?: boolean;
  /** Hides the trailing external-link glyph on external links. */
  hideExternalIcon?: boolean;
};

/**
 * Solid amber, no gradient.
 *
 * The previous build ran a three-stop gradient across every button, which
 * banded at small sizes and dropped the contrast of the dark label over the
 * lighter stops. A flat fill holds its contrast ratio at every size, and the
 * depth comes from one inset highlight plus a cast glow instead.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "glow-amber rounded-full bg-amber-400 font-semibold text-canvas hover:bg-amber-300",
  secondary:
    "rounded-full border border-hairline-strong bg-surface-2/80 font-medium text-text backdrop-blur-md hover:border-amber-400/50 hover:bg-surface-3 hover:text-amber-200",
  quiet:
    "rounded-full border border-hairline font-medium text-muted hover:border-hairline-strong hover:text-text",
  ghost:
    "font-medium text-muted underline-offset-4 hover:text-amber-200 hover:underline",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.8rem]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

/**
 * The single link primitive used for every call to action.
 *
 * External links always get `rel="noopener noreferrer"`: `noopener` stops the
 * destination page from reaching back through `window.opener`, and `noreferrer`
 * keeps our URL out of third-party referrer logs.
 */
export function Cta({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  hideExternalIcon = false,
  ...rest
}: CtaProps) {
  const isExternal = external ?? /^https?:\/\//i.test(href);
  const padding = variant === "ghost" ? "" : SIZES[size];

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/cta inline-flex items-center justify-center gap-2 transition-all duration-300 ${VARIANTS[variant]} ${padding} ${className}`}
      {...rest}
    >
      {children}
      {isExternal && !hideExternalIcon ? (
        <ArrowUpRightIcon className="size-4 shrink-0 opacity-60 transition-transform duration-300 group-hover/cta:translate-x-px group-hover/cta:-translate-y-px" />
      ) : null}
    </a>
  );
}
