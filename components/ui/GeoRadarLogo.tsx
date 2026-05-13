interface GeoRadarLogoProps {
  className?: string
  size?: number
  color?: string
}

/**
 * Pixel-accurate recreation of the MyGeoRadar brand mark.
 * Structure (from the reference image):
 *  - Thick outer C/G ring: open gap at top-right (~45deg notch cut diagonally)
 *  - Right crossbar: solid rectangle extending from ~center to right edge
 *  - 3 concentric arcs inside the hollow, each a ~270deg arc opening to top-right
 *  - Small circle dot at center
 */
export function GeoRadarLogo({ className, size = 20, color = '#7c3aed' }: GeoRadarLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyGeoRadar logo"
    >
      {/*
        All math on a 200x200 canvas, center = (100,100).

        OUTER RING (G body):
          outer radius = 90, inner radius = 60 => stroke thickness = 30
          Gap is a diagonal cut from top-right — the ring runs from
          ~120deg to ~30deg going clockwise (i.e. 270deg of arc).
          In SVG (0=right, angles go clockwise):
            start = 120deg => x=100+90*cos(120)=100-45=55,   y=100+90*sin(120)=100+77.9=177.9
            end   =  30deg => x=100+90*cos(30)=100+77.9=177.9, y=100+90*sin(30)=100+45=145  -- no

          Actually looking at the logo: gap is at TOP-RIGHT, diagonal slice ~45deg.
          The arc starts just below the gap (top-right) and sweeps almost all the way around.
          Let gap center = 45deg (top-right diagonal).
          Gap half-width = ~20deg, so:
            arc from 65deg to 25deg going clockwise = 320deg of arc.

          65deg: x=100+90*cos(65deg)=100+38.0=138.0, y=100+90*sin(65deg)=100+81.6=181.6  -- bottom right area
          Hmm let me use standard math angles then convert.
          Standard: 0=right, 90=up, going counterclockwise.
          SVG: 0=right, 90=DOWN, going clockwise.

          In the logo, gap is at roughly 1-2 o'clock position (top right, tilted).
          1 o'clock = 60deg from top = -30deg standard = 330deg SVG... let me just use visual estimates.

          I'll define:
            gapStart = 315deg SVG (top-right, ~10:30 direction)
            gapEnd   =  45deg SVG (going clockwise from gapStart skipping ~90deg gap)
          So the G arc goes from 45deg to 315deg clockwise = 270deg.

          45deg SVG:  x=100+90*cos(45)=100+63.6=163.6,  y=100+90*sin(45)=100+63.6=163.6
          315deg SVG: x=100+90*cos(315)=100+63.6=163.6, y=100+90*sin(315)=100-63.6=36.4

          inner radius 60:
          45deg:  x=100+60*cos(45)=100+42.4=142.4,  y=100+60*sin(45)=100+42.4=142.4
          315deg: x=100+60*cos(315)=100+42.4=142.4,  y=100+60*sin(315)=100-42.4=57.6

          Path: move to outer-start(45deg), arc clockwise 270deg to outer-end(315deg),
                line to inner-end(315deg), arc counter-clockwise 270deg back to inner-start(45deg),
                close.
      */}

      {/* OUTER G RING - 270deg donut arc */}
      <path d="
        M 163.6 163.6
        A 90 90 0 1 1 163.6 36.4
        L 142.4 57.6
        A 60 60 0 1 0 142.4 142.4
        Z
      " />

      {/* CROSSBAR - horizontal bar on right side, vertically centered */}
      {/* Sits between x=100 and x=190, vertically from y=86 to y=114 (28px tall) */}
      <rect x="100" y="86" width="88" height="28" rx="4" />

      {/* RADAR ARC 1 - outermost inner arc, r=52, same gap direction */}
      <path
        d="M 136.8 136.8 A 52 52 0 1 1 136.8 63.2"
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* RADAR ARC 2 - middle arc, r=36 */}
      <path
        d="M 125.5 125.5 A 36 36 0 1 1 125.5 74.5"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* RADAR ARC 3 - innermost arc, r=20 */}
      <path
        d="M 114.1 114.1 A 20 20 0 1 1 114.1 85.9"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* CENTER DOT */}
      <circle cx="100" cy="100" r="7" />
    </svg>
  )
}

export default GeoRadarLogo
