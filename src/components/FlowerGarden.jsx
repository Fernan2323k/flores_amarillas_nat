import { useMemo } from 'react'
import FlowerSVG from './FlowerSVG'

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const TONE_POOL = ['sunflower', 'sunflower', 'sunflower', 'cream', 'amber']

const LAYERS = {
  desktop: [
    { depth: 0, count: 7, min: 92, max: 138, pf: 0.5, blur: 1.1, opacity: 0.8, bottom: 24 },
    { depth: 1, count: 6, min: 152, max: 215, pf: 1.0, blur: 0, opacity: 0.96, bottom: 4 },
    { depth: 2, count: 4, min: 255, max: 330, pf: 1.7, blur: 0, opacity: 1, bottom: -6 },
  ],
  mobile: [
    { depth: 1, count: 3, min: 128, max: 175, pf: 1.0, blur: 0, opacity: 0.95, bottom: 6 },
    { depth: 2, count: 3, min: 205, max: 265, pf: 1.6, blur: 0, opacity: 1, bottom: -6 },
  ],
}

export default function FlowerGarden({ phase, mobile }) {
  const blooming = phase !== 'intro'
  const final = phase === 'final'

  const flowers = useMemo(() => {
    const rnd = mulberry32(20240920)
    const layers = mobile ? LAYERS.mobile : LAYERS.desktop
    const list = []
    layers.forEach((L, li) => {
      for (let i = 0; i < L.count; i += 1) {
        const tone = TONE_POOL[Math.floor(rnd() * TONE_POOL.length)]
        list.push({
          id: `${li}-${i}`,
          x: 4 + rnd() * 92,
          depth: L.depth,
          size: L.min + rnd() * (L.max - L.min),
          pf: L.pf,
          opacity: L.opacity,
          blur: L.blur,
          bottom: L.bottom,
          tilt: (rnd() - 0.5) * 16,
          swayDur: 5.5 + rnd() * 3.5,
          swayDelay: -rnd() * 8,
          tone,
        })
      }
    })
    // yellow tulips framing the center of the garden (~half screen tall)
    const tulips = mobile ? 2 : 4
    for (let i = 0; i < tulips; i += 1) {
      list.push({
        id: `tulip-${i}`,
        x: 40 + rnd() * 20,
        depth: 1,
        size: mobile ? 315 + rnd() * 55 : 400 + rnd() * 60,
        pf: 1.1,
        opacity: 0.98,
        bottom: mobile ? 6 : 2,
        tilt: (rnd() - 0.5) * 6,
        swayDur: 6 + rnd() * 3,
        swayDelay: -rnd() * 8,
        tone: 'sunflower',
        variant: 'tulip',
      })
    }
    list.sort((a, b) => (a.depth !== b.depth ? a.depth - b.depth : a.x - b.x))
    list.forEach((f, i) => {
      // horizontal "sweep" of growth, left → right, plus jitter
      f.bloomDelay = 0.15 + (i / list.length) * 3.5 + rnd() * 0.4
    })
    return list
  }, [mobile])

  const orbs = useMemo(
    () =>
      Array.from({ length: mobile ? 3 : 6 }, (_, i) => ({
        id: i,
        x: (i * 17 + 9) % 100,
        y: 50 + ((i * 23) % 42),
        s: 170 + (i % 3) * 95,
        d: 7 + (i % 4),
        o: 0.5 + (i % 3) * 0.18,
      })),
    [mobile],
  )

  return (
    <div className={`garden ${blooming ? 'garden--bloom' : ''} ${final ? 'garden--final' : ''}`}>
      <div className="garden-glow garden-glow--horizon" />
      <div className="nebula nebula--1" style={{ '--nebDur': '26s' }} />
      <div className="nebula nebula--2" style={{ '--nebDur': '32s' }} />
      {orbs.map((o) => (
        <div
          key={`gb${o.id}`}
          className="glow-orb"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.s,
            height: o.s,
            opacity: o.o,
            '--orbDur': `${o.d}s`,
          }}
        />
      ))}

      {flowers.map((f) => {
        return (
          <div
            key={f.id}
            className={`flower flower--d${f.depth}`}
            style={{
              left: `${f.x}%`,
              bottom: `${f.bottom}%`,
              '--pf': f.pf,
              '--fh': `${Math.round(f.size * 0.95)}px`,
              opacity: f.opacity,
              zIndex: 10 + f.depth * 10,
            }}
          >
            <div className="flower-parallax">
              <div className="flower-halo" />
              <FlowerSVG
                tone={f.tone}
                variant={f.variant}
                size={f.size}
                tilt={f.tilt}
                swayDuration={f.swayDur}
                swayDelay={f.swayDelay}
                bloomDelay={f.bloomDelay}
              />
            </div>
          </div>
        )
      })}

      <div className="garden-ground" />
    </div>
  )
}