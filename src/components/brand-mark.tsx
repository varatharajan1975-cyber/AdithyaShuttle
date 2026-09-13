import Image from "next/image";
import { BRAND } from "@/content/site";

type Size = "sm" | "md" | "lg" | "xl";

/** Shield width, wordmark size and sub-line size, per step. */
const SIZES: Record<Size, { image: number; shield: string; name: string; sub: string }> = {
  sm: { image: 36, shield: "w-8", name: "text-sm", sub: "text-[0.52rem]" },
  md: { image: 44, shield: "w-9 sm:w-10", name: "text-[0.98rem] sm:text-base", sub: "text-[0.55rem] sm:text-[0.58rem]" },
  lg: { image: 56, shield: "w-12", name: "text-xl", sub: "text-[0.62rem]" },
  xl: {
    image: 72,
    shield: "w-12 sm:w-16",
    name: "text-xl sm:text-[1.6rem]",
    sub: "text-[0.58rem] sm:text-[0.7rem]",
  },
};

/**
 * Logo lockup used in the header, mobile menu and footer.
 *
 * The image carries `alt=""` because the adjacent text already announces the
 * academy name — labelling both would make a screen reader say it twice.
 *
 * The wordmark is set in flat ink and amber rather than the old brushed-metal
 * gradient. A gradient clipped to text is the single strongest "template"
 * signal in a layout, and at 15px it renders as mud.
 */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const step = SIZES[size];

  return (
    <span className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <Image
        src={BRAND.logo}
        alt=""
        width={step.image}
        height={Math.round(step.image * 1.1)}
        // `priority` was deprecated in Next.js 16 in favour of `preload`.
        preload
        className={`h-auto shrink-0 ${step.shield}`}
      />
      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-tight text-text ${step.name}`}
        >
          Adithya
        </span>
        <span
          className={`mt-1.5 block font-semibold tracking-[0.24em] text-amber-400 uppercase ${step.sub}`}
        >
          Sports Academy
        </span>
      </span>
    </span>
  );
}
