import { BRAND, BRANCHES, CONTACT, FAQS, SITE_URL } from "@/content/site";

/**
 * schema.org markup so Google can show the academy as a local business with
 * both branches, rather than a generic web page.
 *
 * Only facts that are actually published are emitted — no invented phone
 * numbers, ratings or opening hours, which would be both wrong and a
 * structured-data policy violation.
 */
function buildGraph() {
  const organisation = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    description: BRAND.description,
    logo: `${SITE_URL}${BRAND.logo}`,
    sameAs: [CONTACT.instagram],
    // schema.org accepts a repeated `telephone`, so both published lines are
    // emitted rather than only the primary one.
    ...(CONTACT.phones.length > 0 ? { telephone: CONTACT.phones } : {}),
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
  };

  const locations = BRANCHES.map((branch) => ({
    "@type": "SportsActivityLocation",
    "@id": `${SITE_URL}/#${branch.slug}`,
    name: `${BRAND.name} — ${branch.name}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: SITE_URL,
    hasMap: branch.mapsUrl,
    sport: "Badminton",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.addressLines.slice(0, -1).join(", "),
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    amenityFeature: branch.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    // Driven by the branch's own `hours` rather than a second hard-coded copy
    // of 07:00–22:00, so the markup can no longer drift from the visible text.
    ...(branch.hours
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: branch.hours.opens,
            closes: branch.hours.closes,
          },
        }
      : {}),
    ...(CONTACT.phones.length > 0 ? { telephone: CONTACT.phones } : {}),
  }));

  /**
   * Every answer restates something already visible on the page, which is
   * what Google's structured-data policy requires of a FAQPage — markup that
   * answers questions the page itself does not answer is a manual-action risk.
   */
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organisation, ...locations, faqPage],
  };
}

export function StructuredData() {
  // `<` is escaped so the payload can never terminate the surrounding script
  // tag, which is the standard injection vector for inline JSON-LD.
  const json = JSON.stringify(buildGraph()).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
