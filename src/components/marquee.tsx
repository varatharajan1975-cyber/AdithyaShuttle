import { ShuttleIcon } from "./ui/icons";
import { MARQUEE_ITEMS } from "@/content/site";

/**
 * Slow scrolling fact strip, sitting between the hero photograph and the
 * first content section.
 *
 * Structural, not ornamental: it gives the eye a low-contrast horizontal band
 * to cross between two tall sections, which is what stops the page reading as
 * one undifferentiated stack of cards.
 *
 * Pure CSS, so it stays a server component and ships no JavaScript. The track
 * holds two identical copies of the list and translates by exactly -50%, which
 * lands the second copy precisely where the first began — the loop has no
 * visible seam. The duplicate is hidden from assistive technology so the facts
 * are announced once rather than twice, and `prefers-reduced-motion` freezes
 * the animation through the global rule in globals.css.
 */
export function Marquee() {
  return (
    <div className="relative border-y border-hairline bg-surface/50 py-4">
      <div className="edge-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {MARQUEE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-6 pr-6 pl-6"
                >
                  <span className="text-sm font-medium whitespace-nowrap text-muted">
                    {item}
                  </span>
                  <ShuttleIcon
                    className="size-3.5 shrink-0 text-amber-500/60"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
