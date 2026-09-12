import { ImageResponse } from "next/og";
import { BRAND } from "@/content/site";

/**
 * Link preview card, used whenever the site is shared on WhatsApp, Instagram
 * DMs or search results. Generated at build time — no asset to maintain.
 *
 * ImageResponse supports flexbox only; grid and most modern CSS is unavailable.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND.name} — badminton courts and coaching in Chennai`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#07070a",
          backgroundImage:
            "radial-gradient(circle at 22% 18%, rgba(212,151,27,0.30), transparent 55%), radial-gradient(circle at 88% 92%, rgba(232,178,46,0.16), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 22,
            letterSpacing: "0.28em",
            color: "#e8b22e",
            fontWeight: 700,
          }}
        >
          <div style={{ width: 56, height: 3, backgroundColor: "#d4971b" }} />
          ADITHYA SPORTS ACADEMY
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#f4f5f7" }}>Own every</span>
          <span style={{ color: "#f2cb5b" }}>rally.</span>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 30,
            color: "#b8bdc8",
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          Badminton courts and coaching in Thirumullaivoyal &amp; Madhavaram,
          Chennai.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 24,
            color: "#8f95a3",
          }}
        >
          Book on Turf Town &amp; Playo
        </div>
      </div>
    ),
    size,
  );
}
