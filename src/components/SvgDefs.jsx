export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* petals store gold -> amber */}
        <linearGradient id="petalGold" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#ffdf8e" />
          <stop offset="0.55" stopColor="#f6c34f" />
          <stop offset="1" stopColor="#d99f24" />
        </linearGradient>
        <linearGradient id="petalGoldSoft" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="1" stopColor="#f6cc6a" />
        </linearGradient>

        {/* softer cream variant */}
        <linearGradient id="petalCream" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#ffe9b0" />
          <stop offset="0.55" stopColor="#f3c95c" />
          <stop offset="1" stopColor="#cfa427" />
        </linearGradient>
        <linearGradient id="petalCreamSoft" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="1" stopColor="#f7d77e" />
        </linearGradient>

        {/* deep amber variant */}
        <linearGradient id="petalAmber" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#ffc46b" />
          <stop offset="0.55" stopColor="#efad33" />
          <stop offset="1" stopColor="#bd7f18" />
        </linearGradient>
        <linearGradient id="petalAmberSoft" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#ffe6ad" />
          <stop offset="1" stopColor="#f0bf52" />
        </linearGradient>

        {/* stems & leaves */}
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#547c3a" />
          <stop offset="1" stopColor="#1e3a1c" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#35602c" />
          <stop offset="1" stopColor="#6faa4f" />
        </linearGradient>
        <linearGradient id="sepalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d8f43" />
          <stop offset="1" stopColor="#2e5424" />
        </linearGradient>

        {/* flower center */}
        <radialGradient id="centerCore" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#8a6426" />
          <stop offset="0.5" stopColor="#68471e" />
          <stop offset="1" stopColor="#35240d" />
        </radialGradient>
        <radialGradient id="centerCoreCream" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#9c7630" />
          <stop offset="0.55" stopColor="#6b4a1f" />
          <stop offset="1" stopColor="#2e2008" />
        </radialGradient>
        <pattern id="seeds" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
          <circle cx="3.5" cy="3.5" r="2.7" fill="#241604" />
          <circle cx="10.5" cy="10.5" r="2.7" fill="#241604" />
          <circle cx="7" cy="7" r="1.7" fill="#54360f" opacity="0.85" />
        </pattern>
        <radialGradient id="centerShine" cx="0.4" cy="0.35" r="0.85">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="amberCenter" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#7a5a20" />
          <stop offset="0.55" stopColor="#573b14" />
          <stop offset="1" stopColor="#291c07" />
        </radialGradient>

        {/* tulip cup */}
        <linearGradient id="tulipOuter" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f3bf4a" />
          <stop offset="0.55" stopColor="#ffd97a" />
          <stop offset="1" stopColor="#efab3a" />
        </linearGradient>
        <linearGradient id="tulipInner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffeab1" />
          <stop offset="1" stopColor="#f6c45c" />
        </linearGradient>
      </defs>
    </svg>
  )
}