import type { GalleryItem } from "@/content/site";

/**
 * On-brand placeholder artwork for gallery tiles that do not yet have a real
 * photograph.
 *
 * Using stock photos of someone else's facility would misrepresent the
 * academy, so these illustrated tiles stand in until real photos arrive. Each
 * is pure SVG — no network request, no layout shift.
 */
export function CourtArt({ art }: { art: GalleryItem["art"] }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`bg-${art}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#101018" />
          <stop offset="100%" stopColor="#07070a" />
        </linearGradient>
        <linearGradient id={`line-${art}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4971b" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#f2cb5b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d4971b" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id={`glow-${art}`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#e8b22e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e8b22e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#bg-${art})`} />
      <rect width="400" height="300" fill={`url(#glow-${art})`} />

      <g
        fill="none"
        stroke={`url(#line-${art})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {art === "court" ? <CourtLines /> : null}
        {art === "net" ? <NetLines /> : null}
        {art === "shuttle" ? <ShuttleLines /> : null}
        {art === "rally" ? <RallyLines /> : null}
      </g>
    </svg>
  );
}

/** Badminton court drawn in perspective. */
function CourtLines() {
  return (
    <>
      <path d="M60 250 130 70h140l70 180H60Z" />
      <path d="M95 250 148 90h104l53 160" />
      <path d="M75 205h250M110 145h180M200 70v180" />
      <path d="M130 250v-45M270 250v-45" />
    </>
  );
}

/** Net and posts, seen square on. */
function NetLines() {
  const left = 62;
  const right = 338;
  const top = 84;
  const bottom = 176;
  const columns = 22;
  const rows = 7;

  return (
    <>
      <path d={`M${left} 66v186M${right} 66v186`} />
      <path d={`M${left} ${top}h${right - left}M${left} ${bottom}h${right - left}`} />
      {Array.from({ length: columns - 1 }, (_, i) => {
        const x = left + ((i + 1) * (right - left)) / columns;
        return (
          <path key={`v${i}`} d={`M${x} ${top}v${bottom - top}`} strokeWidth="0.6" />
        );
      })}
      {Array.from({ length: rows - 1 }, (_, i) => {
        const y = top + ((i + 1) * (bottom - top)) / rows;
        return (
          <path key={`h${i}`} d={`M${left} ${y}h${right - left}`} strokeWidth="0.6" />
        );
      })}
      <path d="M28 252h344" />
    </>
  );
}

/** Shuttlecock, enlarged — cork base with a flared feather skirt. */
function ShuttleLines() {
  return (
    <>
      {/* Feather rim and skirt. */}
      <ellipse cx="200" cy="66" rx="92" ry="24" />
      <path d="M108 66 170 202M292 66 230 202" />
      {/* Cork base — a quadratic curve, so the bulge direction is explicit. */}
      <path d="M170 202h60" />
      <path d="M170 202Q200 244 230 202" />
      {/* Binding thread and feather ribs. */}
      <path d="M154 146h92" strokeWidth="0.9" />
      <path d="M200 202V42" strokeWidth="0.7" />
      <path d="M181 202 152 54M219 202l29-148" strokeWidth="0.7" />
      <path d="M163 201 126 60M237 201l37-141" strokeWidth="0.55" />
    </>
  );
}

/** Abstract rally arcs. */
function RallyLines() {
  return (
    <>
      <path d="M40 230C110 90 290 90 360 230" />
      <path d="M70 240C130 130 270 130 330 240" strokeWidth="0.9" />
      <path d="M100 248C150 165 250 165 300 248" strokeWidth="0.7" />
      <circle cx="200" cy="128" r="7" />
      <path d="M200 121v14M193 128h14" strokeWidth="0.8" />
      <path d="M30 262h340" />
    </>
  );
}
