import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * A full Content-Security-Policy is deliberately not set here: Next.js emits
 * inline bootstrap scripts, so a strict policy needs per-request nonces via
 * proxy/middleware. These headers are the high-value, zero-risk subset and can
 * be tightened later without touching application code.
 */
const securityHeaders = [
  // Stop browsers guessing a response's type — the classic vector for turning
  // an uploaded file into executable script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin, but never the full path, to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site has no reason to be embedded anywhere — blocks click-jacking.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Drop access to hardware APIs the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    /**
     * The only SVG served through the image optimizer is our own /logo.svg.
     * The sandbox CSP below neutralises scripts and external references inside
     * any SVG, which is the documented way to allow them safely.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
    formats: ["image/avif", "image/webp"],

    /**
     * Next.js 16 narrowed the default to `[75]`, and any other value is
     * refused at request time. 82 is here for the hero photograph only: it is
     * the LCP element and a full-bleed dark interior, where 75 shows visible
     * banding in the floodlight gradients. Everything else uses the default.
     */
    qualities: [75, 82],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
