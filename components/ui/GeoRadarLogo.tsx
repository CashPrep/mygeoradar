interface GeoRadarLogoProps {
  className?: string
  size?: number
  color?: string
}

/**
 * Accurate recreation of the MyGeoRadar brand mark:
 * - A bold capital G formed by two concentric circles (thick ring) + horizontal crossbar
 * - Inside the G curve: 3 concentric arc rings + center dot (all in the same color)
 * - Transparent background, single color, scalable SVG
 */
export function GeoRadarLogo({ className, size = 20, color = '#7c3aed' }: GeoRadarLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyGeoRadar logo"
    >
      {/*
        The G shape:
        Strategy — use fill-rule="evenodd" so the inner circle punches out the donut,
        then add back the crossbar as a separate rect.
        Outer circle r=47, inner circle r=30 → thick ring.
        The ring is clipped to a 270° arc (open on top-right, matching the G gap).
        Crossbar: horizontal bar on the right half at middle height.
      */}

      {/* ── Outer G ring (donut arc, open at ~30°–90° = top-right gap) ── */}
      {/*
        We draw the G as:
        1. A filled donut (evenodd) clipped to 270° using a clipPath
        2. Plus a filled crossbar rect
      */}

      <defs>
        {/* Clip to bottom-left 270° sector — removes top-right 90° to create the G opening */}
        <clipPath id="gClip">
          {/*
            Sector from 80° to 360° (280° sweep) — slightly past top going clockwise,
            leaving a gap at top-right. Drawn as a polygon fan from center.
            Using degrees: start=75deg, end=360deg (going clockwise).
            In SVG arc terms (x-axis=right, y-axis=down):
              0° = right, 90° = bottom, 180° = left, 270° = top
            G opening is at top-right (~330°–30° i.e. a 60° gap).
            We clip FROM 30° TO 330° (300° arc, clockwise).
          */}
          <path d="
            M 50 50
            L 93.3 75
            A 50 50 0 1 0 75 6.7
            Z
          " />
        </clipPath>
      </defs>

      {/* Donut ring clipped to G arc shape */}
      <g clipPath="url(#gClip)">
        <path
          fillRule="evenodd"
          fill={color}
          d="
            M 50 3 A 47 47 0 1 1 49.999 3 Z
            M 50 27 A 23 23 0 1 0 50.001 27 Z
          "
        />
      </g>

      {/* Crossbar — horizontal bar on right side of G, vertically centered */}
      <rect x="52" y="44" width="41" height="13" rx="2" fill={color} />

      {/* ── Radar rings inside the G curve (left/inner half) ── */}
      {/* Ring 3 — outermost inner ring */}
      <path
        d="M 50 31 A 19 19 0 0 0 31 50 A 19 19 0 0 0 50 69 A 19 19 0 0 0 69 50"
        stroke={color}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ring 2 */}
      <path
        d="M 50 38 A 12 12 0 0 0 38 50 A 12 12 0 0 0 50 62 A 12 12 0 0 0 62 50"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ring 1 — innermost */}
      <path
        d="M 50 43.5 A 6.5 6.5 0 0 0 43.5 50 A 6.5 6.5 0 0 0 50 56.5 A 6.5 6.5 0 0 0 56.5 50"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="50" cy="50" r="2.5" fill={color} />
    </svg>
  )
}

export default GeoRadarLogo
