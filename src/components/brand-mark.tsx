import Image from "next/image";
import { BRAND } from "@/content/site";

/**
 * Logo lockup used in the header, mobile menu and footer.
 *
 * The image carries `alt=""` because the adjacent text already announces the
 * academy name — labelling both would make a screen reader say it twice.
 *
 * The wordmark is set in flat ink and amber rather than the old brushed-metal
 * gradient. A gradient clipped to text is the single strongest "template"
 * signal in a layout, and at 15px it renders as mud on most screens.
 */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimension = size === "lg" ? 56 : size === "sm" ? 36 : 44;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src={BRAND.logo}
        alt=""
        width={dimension}
        height={Math.round(dimension * 1.1)}
        // `priority` was deprecated in Next.js 16 in favour of `preload`.
        preload
        className={`h-auto shrink-0 ${
          size === "lg" ? "w-12" : size === "sm" ? "w-8" : "w-9 sm:w-10"
        }`}
      />
      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-tight text-text ${
            size === "lg" ? "text-xl" : "text-[0.98rem] sm:text-base"
          }`}
        >
          Adithya
        </span>
        <span
          className={`mt-1.5 block font-semibold tracking-[0.24em] text-amber-400 uppercase ${
            size === "lg" ? "text-[0.62rem]" : "text-[0.55rem] sm:text-[0.58rem]"
          }`}
        >
          Sports Academy
        </span>
      </span>
    </span>
  );
}
