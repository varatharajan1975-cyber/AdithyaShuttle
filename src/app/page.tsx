import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Highlights } from "@/components/highlights";
import { Training } from "@/components/training";
import { Branches } from "@/components/branches";
import { Booking } from "@/components/booking";
import { Tournaments } from "@/components/tournaments";
import { Gallery } from "@/components/gallery";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { MobileBookBar } from "@/components/mobile-book-bar";

/**
 * Section order is deliberately a rhythm rather than a list: a full-bleed
 * photographic hero, a low band of moving text, two light sections on the
 * page background, a raised booking band, then photography again. The
 * previous build ran nine visually identical sections back to back, which is
 * what made a perfectly correct page feel like a template.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <Highlights />
        <Training />
        <Branches />
        <Booking />
        <Tournaments />
        <Gallery />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
      <MobileBookBar />
    </>
  );
}
