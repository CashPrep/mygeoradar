// Inline SVG of the GeoRadar brand mark — G shape with concentric radar rings
// Color inherits via `color` prop (defaults to site accent #7c3aed)

interface GeoRadarLogoProps {
  className?: string
  size?: number
  color?: string
}

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
      {/* Outer G arc — top and left arc of the G */}
      <path
        d="M 50 8
           A 42 42 0 1 0 92 57
           L 92 50
           L 58 50
           L 58 58
           L 82 58
           A 34 34 0 1 1 50 16
           Z"
        fill={color}
      />
      {/* Radar ring 1 */}
      <path
        d="M 50 26 A 24 24 0 0 0 26 50 A 24 24 0 0 0 50 74 A 24 24 0 0 0 74 50"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Radar ring 2 */}
      <path
        d="M 50 36 A 14 14 0 0 0 36 50 A 14 14 0 0 0 50 64 A 14 14 0 0 0 64 50"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Radar ring 3 */}
      <path
        d="M 50 43 A 7 7 0 0 0 43 50 A 7 7 0 0 0 50 57 A 7 7 0 0 0 57 50"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={color} />
    </svg>
  )
}

export default GeoRadarLogo
