"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { CourtArt } from "./ui/court-art";
import { ArrowRightIcon, CloseIcon } from "./ui/icons";
import { GALLERY } from "@/content/site";

/** Tiles that have a real photograph, in display order. */
const PHOTOS = GALLERY.filter(
  (item): item is (typeof GALLERY)[number] & { src: string } =>
    item.src !== null,
);

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback((direction: 1 | -1) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + direction + PHOTOS.length) % PHOTOS.length;
    });
  }, []);

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      title={
        <>
          Inside the <span className="text-gold-gradient">academy</span>
        </>
      }
      intro="Both branches, exactly as they look when you walk in."
    >
      {/*
        Uniform grid rows rather than per-tile aspect ratios, so the featured
        2x2 tile lines up exactly with the tiles beside it. Six tiles fill a
        three-column grid with no gaps; the span only applies from `lg` up,
        because at two columns six equal tiles already tile cleanly.
      */}
      <ul className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11.5rem] sm:gap-4 lg:auto-rows-[13.5rem] lg:grid-cols-3">
        {GALLERY.map((item, index) => {
          const photoIndex = item.src
            ? PHOTOS.findIndex((photo) => photo.src === item.src)
            : -1;

          return (
            <li
              key={`${item.alt}-${index}`}
              className={item.featured ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <Reveal delay={(index % 3) * 80} className="h-full">
                <figure className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-2">
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
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(photoIndex)}
                        className="absolute inset-0 cursor-zoom-in rounded-2xl ring-gold-400/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-inset group-hover:ring-gold-400/40"
                      >
                        <span className="sr-only">
                          View larger: {item.alt}
                        </span>
                      </button>
                    </>
                  ) : (
                    <CourtArt art={item.art} />
                  )}

                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent p-4 text-[0.7rem] font-medium tracking-wide text-silver-300 sm:text-xs">
                    {item.alt}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {PHOTOS.length === 0 ? (
        <p className="mt-6 text-center text-sm text-silver-500">
          Photographs of both branches are on the way.
        </p>
      ) : null}

      {lightboxIndex !== null ? (
        <Lightbox
          photo={PHOTOS[lightboxIndex]}
          onClose={close}
          onStep={PHOTOS.length > 1 ? step : undefined}
          position={`${lightboxIndex + 1} of ${PHOTOS.length}`}
        />
      ) : null}
    </Section>
  );
}

type LightboxProps = {
  photo: { src: string; alt: string };
  onClose: () => void;
  onStep?: (direction: 1 | -1) => void;
  position: string;
};

/**
 * Full-screen photo view.
 *
 * Behaves like a modal dialog: focus moves into it on open, Escape and the
 * backdrop close it, arrow keys step between photos, and background scroll is
 * locked while it is open.
 */
function Lightbox({ photo, onClose, onStep, position }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep?.(1);
      if (event.key === "ArrowLeft") onStep?.(-1);
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
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full border border-line-2 text-silver-200 transition-colors hover:border-gold-500/60 hover:text-gold-200 sm:top-6 sm:right-6"
      >
        <CloseIcon className="size-5" />
      </button>

      <figure
        className="relative max-h-full w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-silver-400">
          <span>{photo.alt}</span>
          <span className="shrink-0 text-silver-500">{position}</span>
        </figcaption>
      </figure>

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
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-ink-2/80 text-silver-200 transition-colors hover:border-gold-500/60 hover:text-gold-200 sm:inline-flex ${
        isNext ? "right-4 lg:right-8" : "left-4 lg:left-8"
      }`}
    >
      <ArrowRightIcon className={`size-5 ${isNext ? "" : "rotate-180"}`} />
    </button>
  );
}
