import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ExternalIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

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

const VARIANTS: Record<Variant, string> = {
  primary:
    "rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(232,178,46,0.7)] hover:from-gold-100 hover:via-gold-300 hover:to-gold-500 hover:shadow-[0_14px_38px_-12px_rgba(232,178,46,0.85)]",
  secondary:
    "rounded-full border border-line-2 bg-ink-3/70 font-medium text-silver-100 backdrop-blur-sm hover:border-gold-500/60 hover:bg-ink-4 hover:text-gold-200",
  ghost:
    "font-medium text-silver-300 underline-offset-4 hover:text-gold-200 hover:underline",
};

const SIZES: Record<Size, string> = {
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
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 ${VARIANTS[variant]} ${padding} ${className}`}
      {...rest}
    >
      {children}
      {isExternal && !hideExternalIcon ? (
        <ExternalIcon className="size-4 shrink-0 opacity-70" />
      ) : null}
    </a>
  );
}
