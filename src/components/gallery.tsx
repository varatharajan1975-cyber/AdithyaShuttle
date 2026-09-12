"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CourtArt } from "./ui/court-art";
import { ArrowRightIcon, CloseIcon } from "./ui/icons";
import { BRANCHES, GALLERY, type GalleryItem } from "@/content/site";

type Filter = "all" | GalleryItem["branch"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...BRANCHES.map((branch) => ({
    value: branch.slug as Filter,
    label: branch.name,
  })),
];

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Remembers which tile opened the lightbox so focus can be handed back to
  // it on close, rather than dumped at the top of the document.
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? GALLERY
        : GALLERY.filter((item) => item.branch === filter),
    [filter],
  );

  /** Tiles that have a real photograph, in display order. */
  const photos = useMemo(
    () =>
      visible.filter(
        (item): item is GalleryItem & { src: string } => item.src !== null,
      ),
    [visible],
  );

  const close = useCallback(() => {
    setLightboxIndex(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        return (current + direction + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  const changeFilter = (next: Filter) => {
    // The open index refers to a position in the previous result set, so it
    // would point at the wrong photo — or off the end — once the set changes.
    setLightboxIndex(null);
    setFilter(next);
  };

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      split
      title={
        <>
          Inside the <span className="accent-word text-amber-300">academy</span>
        </>
      }
      intro="Both branches, exactly as they look when you walk in."
      aside={
        <div
          role="group"
          aria-label="Filter photos by branch"
          className="inline-flex rounded-full border border-hairline bg-surface p-1.5"
        >
          {FILTERS.map((option) => {
            const selected = filter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => changeFilter(option.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                  selected
                    ? "bg-amber-400 text-canvas"
                    : "text-muted hover:text-text"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      }
    >
      {/*
        Uniform grid rows rather than per-tile aspect ratios, so the featured
        2x2 tile lines up exactly with the tiles beside it. The span applies
        only in the unfiltered view: six tiles fill a three-column grid with
        no gaps, but a filtered set of three would leave holes around it.
      */}
      <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[14rem] lg:grid-cols-3">
        {visible.map((item, index) => {
          const photoIndex = item.src
            ? photos.findIndex((photo) => photo.src === item.src)
            : -1;

          return (
            <li
              key={`${item.alt}-${index}`}
              className={
                item.featured && filter === "all"
                  ? "lg:col-span-2 lg:row-span-2"
                  : ""
              }
            >
              <Reveal delay={(index % 3) * 70} className="h-full">
                <figure className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-surface">
                  {item.src ? (
                    <>
                      {/* alt is empty because the visible figcaption below
                          already names the image — labelling both makes a
                          screen reader announce it twice. */}
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget;
                          setLightboxIndex(photoIndex);
                        }}
                        className="absolute inset-0 cursor-zoom-in rounded-2xl transition-shadow duration-300 group-hover:ring-2 group-hover:ring-amber-400/50 group-hover:ring-inset"
                      >
                        <span className="sr-only">View larger: {item.alt}</span>
                      </button>
                    </>
                  ) : (
                    <CourtArt art={item.art} />
                  )}

                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-[0.7rem] font-medium text-muted sm:text-xs">
                    {item.alt}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {photos.length === 0 ? (
        <p className="mt-8 text-center text-sm text-faint">
          Photographs of this branch are on the way.
        </p>
      ) : null}

      {lightboxIndex !== null && photos[lightboxIndex] ? (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={close}
          onStep={photos.length > 1 ? step : undefined}
          onSelect={setLightboxIndex}
        />
      ) : null}
    </Section>
  );
}

type LightboxProps = {
  photos: (GalleryItem & { src: string })[];
  index: number;
  onClose: () => void;
  onStep?: (direction: 1 | -1) => void;
  onSelect: (index: number) => void;
};

/**
 * Full-screen photo view.
 *
 * Behaves like a modal dialog: focus moves into it on open and is trapped
 * inside it, Escape and the backdrop close it, arrow keys and horizontal
 * swipes step between photos, and background scroll is locked while open.
 */
function Lightbox({ photos, index, onClose, onStep, onSelect }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const photo = photos[index];

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") onStep?.(1);
      if (event.key === "ArrowLeft") onStep?.(-1);

      // Focus trap. Without it, Tab walks out of the dialog and into the page
      // behind it, which is still visually covered and scroll-locked.
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-canvas/96 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        // Roughly a thumb's width — short enough to feel responsive, long
        // enough not to fire on a tap that drifts.
        if (Math.abs(delta) > 50) onStep?.(delta < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full border border-hairline-strong text-text transition-colors hover:border-amber-400/60 hover:text-amber-200 sm:top-6 sm:right-6"
      >
        <CloseIcon className="size-5" />
      </button>

      <figure
        className="relative flex w-full max-w-5xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* No border or fill on the frame: the photos are not all 3:2, and a
            visible panel behind `object-contain` turned the letterboxing into
            two grey bands across every wider shot. */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
          <span>{photo.alt}</span>
          <span className="shrink-0 tabular-nums text-faint">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      {/* Thumbnail rail. Lets someone jump straight to a photo instead of
          stepping through the set one frame at a time. */}
      {photos.length > 1 ? (
        <div
          className="no-scrollbar flex max-w-full gap-2 overflow-x-auto px-1"
          onClick={(event) => event.stopPropagation()}
        >
          {photos.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => onSelect(itemIndex)}
              aria-label={`Show photo ${itemIndex + 1}: ${item.alt}`}
              aria-current={itemIndex === index ? "true" : undefined}
              className={`relative size-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:size-16 ${
                itemIndex === index
                  ? "border-amber-400 opacity-100"
                  : "border-hairline opacity-50 hover:opacity-90"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {onStep ? (
        <>
          <StepButton direction={-1} onStep={onStep} />
          <StepButton direction={1} onStep={onStep} />
        </>
      ) : null}
    </div>
  );
}

function StepButton({
  direction,
  onStep,
}: {
  direction: 1 | -1;
  onStep: (direction: 1 | -1) => void;
}) {
  const isNext = direction === 1;

  return (
    <button
      type="button"
      aria-label={isNext ? "Next photo" : "Previous photo"}
      onClick={(event) => {
        event.stopPropagation();
        onStep(direction);
      }}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-strong bg-surface/80 text-text backdrop-blur-sm transition-colors hover:border-amber-400/60 hover:text-amber-200 lg:inline-flex ${
        isNext ? "right-4 xl:right-10" : "left-4 xl:left-10"
      }`}
    >
      <ArrowRightIcon className={`size-5 ${isNext ? "" : "rotate-180"}`} />
    </button>
  );
}
