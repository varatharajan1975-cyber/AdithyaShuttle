"use client";

import { useEffect, useState } from "react";
import type { OpeningHours } from "@/content/site";
import { getOpenState, type OpenState } from "@/lib/hours";

/**
 * Live open/closed state, recomputed on the client.
 *
 * Returns `null` until the component has mounted, and every caller renders
 * nothing for that first pass. This is deliberate: the page is statically
 * generated, so a server-rendered "Open now" would be frozen at build time and
 * would also disagree with the client's first render. Computing it only in the
 * browser keeps the badge both accurate and free of hydration mismatch.
 */
export function useOpenState(hours: OpeningHours | null): OpenState | null {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState(hours));
    update();

    // The badge names the closing hour, not the minute, so a 60s tick is
    // precise enough and stays cheap on battery.
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours]);

  return state;
}

type OpenStatusProps = {
  hours: OpeningHours | null;
  /** Names the branch in the label — used where two branches are on screen. */
  branchName?: string;
  size?: "sm" | "md";
  className?: string;
};

export function OpenStatus({
  hours,
  branchName,
  size = "sm",
  className = "",
}: OpenStatusProps) {
  const state = useOpenState(hours);

  // Pre-mount, or a branch whose hours the academy has not confirmed.
  if (!state || state.status === "unknown") return null;

  const isOpen = state.status === "open";
  const detail = isOpen
    ? `until ${state.until}`
    : `opens ${state.opensToday ? "" : "tomorrow "}${state.from}`;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border py-1.5 whitespace-nowrap ${
        size === "sm" ? "px-3 text-[0.7rem]" : "px-3.5 text-xs"
      } font-medium ${
        isOpen
          ? "border-live/25 bg-live/10 text-live"
          : "border-hairline bg-surface-2 text-faint"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${
          isOpen ? "animate-pulse-dot bg-live" : "bg-faint"
        }`}
      />
      <span>
        {isOpen ? "Open now" : "Closed"}
        {branchName ? ` · ${branchName}` : ""}
        <span className={isOpen ? "text-live/70" : "text-faint"}> · {detail}</span>
      </span>
    </span>
  );
}
