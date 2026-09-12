"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

type CopyButtonProps = {
  value: string;
  /** Describes what is being copied, for the accessible label. */
  label: string;
  className?: string;
};

type State = "idle" | "copied" | "failed";

/**
 * Copies a value to the clipboard and confirms it in place.
 *
 * Useful on a phone: most people reading a branch address are about to paste
 * it into a maps app or a message to whoever they are playing with.
 *
 * The Clipboard API needs a secure context and can be refused outright by
 * permissions policy, so a failure is reported to the user rather than
 * swallowed — a button that silently does nothing is worse than no button.
 */
export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<number | undefined>(undefined);

  // Clears the pending reset if the component unmounts first, which would
  // otherwise set state on a gone component.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={state === "copied" ? `${label} copied` : `Copy ${label}`}
      className={`inline-flex items-center gap-2 rounded-full border border-hairline px-3.5 py-2 text-xs font-medium transition-colors duration-300 hover:border-hairline-strong hover:text-text ${
        state === "copied" ? "text-live" : "text-muted"
      } ${className}`}
    >
      {state === "copied" ? (
        <CheckIcon className="size-3.5 shrink-0" />
      ) : (
        <CopyIcon className="size-3.5 shrink-0" />
      )}
      {/* Announced politely so a screen reader confirms the copy without
          stealing focus from the button. */}
      <span aria-live="polite">
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Press Ctrl+C"
            : "Copy address"}
      </span>
    </button>
  );
}
