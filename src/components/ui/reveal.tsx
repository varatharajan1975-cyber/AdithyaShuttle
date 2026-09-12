"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms, applied as a CSS transition delay. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its children into view once, the first time they are
 * scrolled near the viewport.
 *
 * Content is never hidden without JavaScript: the `<noscript>` override in the
 * root layout forces every `[data-reveal]` element visible, so a failed bundle
 * or a crawler that does not execute scripts still sees the full page.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    // Reduced motion is handled entirely in CSS, which is the right layer for
    // it. This only has to cover browsers with no IntersectionObserver, where
    // the content must still be revealed rather than left at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      data-reveal=""
      data-shown={shown}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
