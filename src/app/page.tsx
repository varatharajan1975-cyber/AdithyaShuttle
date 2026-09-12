import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { Training } from "@/components/training";
import { Branches } from "@/components/branches";
import { Booking } from "@/components/booking";
import { Tournaments } from "@/components/tournaments";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { Divider } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <Highlights />
        <Divider />
        <Training />
        <Divider />
        <Branches />
        <Booking />
        <Divider />
        <Tournaments />
        <Divider />
        <Gallery />
        <Divider />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
