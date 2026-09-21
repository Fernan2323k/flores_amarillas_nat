const TONES = {
  sunflower: {
    petal: 'url(#petalGold)',
    inner: 'url(#petalGoldSoft)',
    center: 'url(#centerCore)',
    ring: '#8a6420',
    petals: 18,
  },
  cream: {
    petal: 'url(#petalCream)',
    inner: 'url(#petalCreamSoft)',
    center: 'url(#centerCoreCream)',
    ring: '#a07a2e',
    petals: 20,
  },
  amber: {
    petal: 'url(#petalAmber)',
    inner: 'url(#petalAmberSoft)',
    center: 'url(#amberCenter)',
    ring: '#8a5c16',
    petals: 14,
  },
}

function Petal({ angle, scale = 1, d, fill, delay, className }) {
  return (
    <g transform={`rotate(${angle}) scale(1 ${scale})`}>
      <path
        className={`petal ${className || ''}`}
        style={{ '--pd': `${delay}s` }}
        d={d}
        fill={fill}
      />
    </g>
  )
}

/**
 * Procedural SVG flower. `variant`:
 *  - "sunflower": sunflower / golden radial flower
 *  - "tulip":     classic yellow tulip cup with two pointed front petals
 * Every plant grows on screen (stem → leaves → bloom).
 */
export default function FlowerSVG({
  variant = 'sunflower',
  tone = 'sunflower',
  size = 240,
  tilt = 0,
  bloomDelay = 0,
  swayDuration = 7,
  swayDelay = 0,
  style,
}) {
  const isTulip = variant === 'tulip'
  const t = TONES[tone] || TONES.sunflower
  const step = 360 / t.petals
  const indexes = Array.from({ length: t.petals }, (_, i) => i)

  // shapes (drawn upwards from origin 0,0)
  const OUTER = 'M0 0 C-9 -16 -17 -52 -14 -88 C-13 -100 -6 -107 0 -109 C6 -107 13 -100 14 -88 C17 -52 9 -16 0 0 Z'
  const INNER = 'M0 0 C-6 -12 -12 -34 -10 -58 C-8 -65 -4 -69 0 -70 C4 -69 8 -65 10 -58 C12 -34 6 -12 0 0 Z'
  const SEPAL = 'M0 0 C-8 -10 -10 -27 -7 -40 C-4 -45 4 -45 7 -40 C10 -27 8 -10 0 0 Z'

  const SUNFLOWER_TULIP_HEAD = isTulip ? (
    <>
      {/* bell cup */}
      <path
        className="petal tulip-bell"
        style={{ '--pd': '0.45s' }}
        d="M0 0 C -26 -8 -32 -34 -20 -50 C -11 -58 11 -58 20 -50 C 32 -34 26 -8 0 0 Z"
        fill="url(#tulipOuter)"
        stroke="#d29a34"
        strokeWidth="1.5"
      />
      {/* stamens hint inside the opening */}
      <ellipse className="petal petal-circle tulip-core" style={{ '--pd': '0.62s' }} cx="0" cy="-47" rx="5" ry="2.6" fill="#6b451f" opacity="0.85" />
      {/* left front petal + vein */}
      <path
        className="petal tulip-front"
        style={{ '--pd': '0.7s' }}
        d="M -3 0 C -24 -8 -28 -30 -9 -52 C -3 -56 2 -56 5 -52 C 14 -42 16 -28 5 -6 C 4 -2 2 -1 1 0 Z"
        fill="url(#tulipInner)"
        stroke="#e0b254"
        strokeWidth="1"
      />
      <path
        className="petal tulip-front"
        style={{ '--pd': '0.76s' }}
        d="M 1 0 C -1 -12 -3 -30 -2 -44"
        fill="none"
        stroke="#d9a544"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* right front petal + vein */}
      <path
        className="petal tulip-front"
        style={{ '--pd': '0.74s' }}
        d="M 3 0 C 24 -8 28 -30 9 -52 C 3 -56 -2 -56 -5 -52 C -14 -42 -16 -28 -5 -6 C -4 -2 -2 -1 -1 0 Z"
        fill="url(#tulipInner)"
        stroke="#e0b254"
        strokeWidth="1"
      />
      <path
        className="petal tulip-front"
        style={{ '--pd': '0.8s' }}
        d="M -1 0 C 1 -12 3 -30 2 -44"
        fill="none"
        stroke="#d9a544"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </>
  ) : (
    <>
      {/* sepals behind (follow the head pop — invisible anyway) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`s${i}`} transform={`rotate(${i * 72 - 36}) scale(1 1.55)`}>
          <path d={SEPAL} fill="url(#sepalGrad)" />
        </g>
      ))}

      {/* outer petals — the ones that visibly bloom, staggered */}
      {indexes.map((i) => (
        <Petal
          key={`o${i}`}
          angle={i * step}
          d={OUTER}
          fill={t.petal}
          delay={0.45 + i * 0.022}
        />
      ))}

      {/* inner petals + center appear with the head pop (cheap) */}
      {indexes.map((i) => (
        <g key={`i${i}`} transform={`rotate(${i * step + step / 2}) scale(1 0.62)`}>
          <path d={INNER} fill={t.inner} />
        </g>
      ))}
      <circle r="30.5" fill={t.center} stroke={t.ring} strokeWidth="2" />
      <circle r="30.5" fill="url(#seeds)" opacity="0.5" />
      <circle r="30.5" fill="url(#centerShine)" />
    </>
  )

  return (
    <svg
      viewBox="-10 0 300 322"
      width={size}
      height={(size * 322) / 300}
      className="flower-svg"
      aria-hidden="true"
      style={{ '--swayDur': `${swayDuration}s`, '--swayDelay': `${swayDelay}s`, '--bloomDelay': `${bloomDelay}s`, ...style }}
    >
      <g className="fs-sway">
        {/* stem */}
        <path
          className="fs-stem"
          d="M140 322 C138 286 142 250 140 220 C139 196 140 170 141 150"
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth={isTulip ? 7.5 : 8.5}
          strokeLinecap="round"
        />
        {isTulip ? (
          <>
            <g className="fs-leaf fs-leaf-l">
              <path
                d="M140 306 C 116 306 96 296 83 274 C 101 263 126 269 140 281 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M139 281 C 118 274 100 270 83 274"
                fill="none"
                stroke="#6aa94b"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
            <g className="fs-leaf fs-leaf-r">
              <path
                d="M140 294 C 166 293 187 283 199 262 C 181 252 157 258 140 269 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M141 269 C 160 262 179 258 199 262"
                fill="none"
                stroke="#6aa94b"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          </>
        ) : (
          <>
            {/* leaves */}
            <g className="fs-leaf fs-leaf-l">
              <path
                d="M140 212 C 110 198 82 201 62 214 C 77 232 114 233 140 215 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M140 213 C 112 207 86 207 62 214"
                fill="none"
                stroke="#6aa94b"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
            <g className="fs-leaf fs-leaf-r">
              <path
                d="M140 196 C 170 182 198 185 218 198 C 203 216 166 217 140 199 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M140 197 C 168 191 194 191 218 198"
                fill="none"
                stroke="#6aa94b"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          </>
        )}

        {/* flower head */}
        <g transform={`translate(140 124) rotate(${tilt})`}>
          <g className="fs-head">{SUNFLOWER_TULIP_HEAD}</g>
        </g>
      </g>
    </svg>
  )
}