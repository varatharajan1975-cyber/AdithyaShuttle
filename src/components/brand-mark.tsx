import Image from "next/image";
import { BRAND } from "@/content/site";

/**
 * Logo lockup used in the header, mobile menu and footer.
 *
 * The image carries `alt=""` because the adjacent text already announces the
 * academy name — labelling both would make a screen reader say it twice.
 */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const dimension = size === "sm" ? 36 : 44;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src={BRAND.logo}
        alt=""
        width={dimension}
        height={Math.round(dimension * 1.1)}
        priority
        className="h-auto w-9 shrink-0 sm:w-10"
      />
      <span className="leading-none">
        <span className="block font-display text-[0.95rem] font-extrabold tracking-wide text-silver-gradient sm:text-base">
          ADITHYA
        </span>
        <span className="mt-1 block text-[0.55rem] font-semibold tracking-[0.26em] text-gold-400 sm:text-[0.6rem]">
          SPORTS ACADEMY
        </span>
      </span>
    </span>
  );
}
