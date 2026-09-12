import type { Branch, OpeningHours } from "@/content/site";
import { BRANCHES } from "@/content/site";

/**
 * Live open/closed state for a branch.
 *
 * Everything here is pinned to Asia/Kolkata rather than the visitor's own
 * clock. A player in Chennai and a parent checking from Dubai must both be
 * told whether the hall is open *in Chennai* — reading the device timezone
 * would quietly show the wrong answer to anyone travelling.
 */

export type OpenState =
  | { status: "open"; until: string; minutesLeft: number }
  | { status: "closed"; from: string; opensToday: boolean }
  | { status: "unknown" };

const MINUTES_PER_DAY = 24 * 60;

/** "07:00" -> 420 */
export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** "07:00" -> "7 AM", "19:30" -> "7:30 PM" */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0
    ? `${hour12} ${suffix}`
    : `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** "7 AM – 10 PM, daily" */
export function formatHours(hours: OpeningHours | null): string | null {
  if (!hours) return null;
  return `${formatTime(hours.opens)} – ${formatTime(hours.closes)}, daily`;
}

/**
 * Minutes elapsed since midnight in Chennai.
 *
 * `hourCycle: "h23"` rather than `hour12: false`, which reports midnight as
 * hour 24 on some ICU builds and would push the value a full day out.
 */
export function chennaiMinutesNow(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const read = (type: "hour" | "minute") =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return read("hour") * 60 + read("minute");
}

/**
 * Resolves a branch's published hours against the current time in Chennai.
 *
 * A branch with no confirmed hours returns `"unknown"` and the UI omits the
 * indicator entirely, rather than guessing that it keeps the same hours as
 * the other branch.
 */
export function getOpenState(
  hours: OpeningHours | null,
  now: Date = new Date(),
): OpenState {
  if (!hours) return { status: "unknown" };

  const opens = toMinutes(hours.opens);
  const closes = toMinutes(hours.closes);
  const current = chennaiMinutesNow(now);

  // A closing time at or before the opening time means the session runs past
  // midnight, so the open window is the complement of the closed window.
  const overnight = closes <= opens;
  const isOpen = overnight
    ? current >= opens || current < closes
    : current >= opens && current < closes;

  if (isOpen) {
    const minutesLeft =
      (closes - current + MINUTES_PER_DAY) % MINUTES_PER_DAY || MINUTES_PER_DAY;
    return { status: "open", until: formatTime(hours.closes), minutesLeft };
  }

  return {
    status: "closed",
    from: formatTime(hours.opens),
    // Before opening time the hall opens again later today; after closing it
    // is tomorrow. Only meaningful for same-day schedules.
    opensToday: !overnight && current < opens,
  };
}

/**
 * The branch whose hours drive the site-wide indicator in the header.
 *
 * Deliberately the first branch that has confirmed hours, so adding hours for
 * Thirumullaivoyal later needs no code change here.
 */
export function branchWithHours(): Branch | undefined {
  return BRANCHES.find((branch) => branch.hours !== null);
}
