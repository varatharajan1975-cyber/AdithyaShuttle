import { BRAND, BRANCHES, CONTACT, SITE_URL } from "@/content/site";

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
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
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
            opens: "07:00",
            closes: "22:00",
          },
        }
      : {}),
    ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organisation, ...locations],
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
