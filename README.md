# Adithya Sports Academy

Marketing site for Adithya Sports Academy — badminton courts and coaching in
Thirumullaivoyal and Madhavaram, Chennai.

Court booking is **not** handled here. It is delegated to Turf Town and Playo,
which already hold the academy's live slot availability and payments; this site
sends people to the right listing.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 |
| Fonts | Sora (display) + Inter (body), self-hosted via `next/font` |
| Icons | Hand-rolled inline SVG — no icon dependency |
| Hosting | Vercel |

Every page is statically prerendered. There is no database, no API route and no
server-side state, which is why the whole site is a single static build.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Where the content lives

**`src/content/site.ts` is the single source of truth** for every address,
link, phone number, programme and gallery entry on the site. Editing copy should
almost never require touching a component.

Anything marked `TODO(owner)` in that file is a real gap. The UI degrades
gracefully around each one — a missing phone number hides the "Call" card rather
than rendering a dead `tel:` link — so the site is safe to ship before they are
filled in.

### Still needed

| Item | Where | Effect while missing |
|---|---|---|
| Phone number | `CONTACT.phone` | No call or WhatsApp option; enquiries fall back to Instagram |
| Email address | `CONTACT.email` | Email card hidden |
| Thirumullaivoyal opening hours | `BRANCHES[0].hours` | Hours line hidden on that branch only |
| Real logo file | save as `public/logo.png`, then set `BRAND.logo` | Uses the interim `/logo.svg` mark |
| Batch timings and fees | `PROGRAMMES` | Training section points people to enquire instead |

### Gallery photos

`public/gallery/` holds six photographs — three per branch — sourced from the
academy's own Turf Town and Playo venue listings, resized to 1400px wide and
re-encoded as progressive JPEG (~50–110 KB each). Every one is an empty court:
no identifiable people appear, so none of them raise a consent question.

To add more, drop the file in `public/gallery/` and add a row to `GALLERY`. Any
tile whose `src` is set back to `null` falls back to the illustrated artwork
named by its `art` field rather than breaking. The lightbox activates
automatically for whichever tiles have real photos.

## Deployment

Pushing to the default branch deploys to production on Vercel. Pull requests get
their own preview URL.

### Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Only with a custom domain | Canonical URLs, sitemap and Open Graph tags |

Without it the site falls back to `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel
injects automatically — so this only needs setting once a real domain is
attached. There are no secrets in this project.

## Notes for whoever picks this up

- **Brand name is inconsistent across platforms.** The logo says "Adithya
  Sports Academy", Turf Town says "Adithya Badminton Academy", Playo says
  "Aditya Sports Academy". Search engines may treat these as different
  businesses. Worth aligning at the source.
- **No stock photography.** Every gallery photo is of the academy's own courts.
  Any tile without a real photo falls back to SVG artwork rather than a picture
  of somebody else's facility.
- **Structured data only emits verified facts.** `src/components/structured-data.tsx`
  omits phone, hours and ratings when they are unknown, rather than inventing
  them — fabricated values are a Google structured-data policy violation.
- **Security headers** are set in `next.config.ts`. A full Content-Security-Policy
  is not set, because Next.js inline bootstrap scripts need per-request nonces
  via proxy/middleware; that can be added later without touching components.
- **Accessibility**: skip link, visible focus rings, landmark sections, locked
  scroll and Escape handling on both overlays, and `prefers-reduced-motion`
  respected. Scroll-reveal animations can never hide content — a `<noscript>`
  rule in `src/app/layout.tsx` forces every revealed element visible.
