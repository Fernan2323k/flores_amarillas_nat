import { useEffect, useRef } from 'react'

const GOLD = [255, 214, 118]
const WHITE = [255, 244, 214]

/**
 * Full-screen ambient canvas: slow ascending golden dust,
 * gentle attraction to the cursor and a sparkle burst on click.
 * `intensity` scales particle count / brightness across the story.
 */
export default function Particles({ intensity = 0.5, reduced = false }) {
  const canvasRef = useRef(null)
  const intensityRef = useRef(intensity)

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let cw = 0
    let ch = 0
    let parts = []
    const mouse = { x: -9999, y: -9999 }

    const BASE = reduced ? 16 : 46

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      cw = window.innerWidth
      ch = window.innerHeight
      canvas.width = cw * dpr
      canvas.height = ch * dpr
      canvas.style.width = `${cw}px`
      canvas.style.height = `${ch}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const make = (fromClick) => {
      const bigChance = fromClick ? 0.28 : 0.09
      return {
        x: fromClick ? mouse.x : Math.random() * cw,
        y: fromClick ? mouse.y : ch + 40 + Math.random() * ch,
        big: Math.random() < bigChance,
        r: 0.5 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.06 + Math.random() * 0.28),
        tw: Math.random() * Math.PI * 2,
        tws: 0.015 + Math.random() * 0.05,
        burst: fromClick
          ? { vx: (Math.random() - 0.5) * 3.4, vy: (Math.random() - 0.5) * 3.4 - 1, life: 1, decay: 0.02 + Math.random() * 0.02 }
          : null,
        color: fromClick && Math.random() < 0.4 ? WHITE : GOLD,
      }
    }

    const seed = () => {
      const target = parseInt(BASE * (0.45 + intensityRef.current * 0.95), 10)
      parts = Array.from({ length: target }, () => make(false))
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onClick = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const n = reduced ? 6 : 12
      for (let i = 0; i < n; i += 1) parts.push(make(true))
    }

    // gentle ambient aperture: not used, keeps API simple
    const active = () => intensityRef.current

    let last = 0
    const loop = (t) => {
      if (document.hidden) {
        raf = requestAnimationFrame(loop)
        return
      }
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016)
      last = t
      const alphaMul = 0.4 + active() * 0.75
      ctx.clearRect(0, 0, cw, ch)

      // top-down soft deepening gradient (very subtle)
      ctx.fillStyle = 'transparent'

      // intensifying current dust pool
      const target = parseInt(BASE * (0.45 + intensityRef.current * 0.95), 10)
      if (parts.length < target && Math.random() < 0.4) parts.push(make(false))

      for (let i = 0; i < parts.length; i += 1) {
        const p = parts[i]
        p.tw += p.tws
        p.x += p.vx * dt * 60 + Math.sin(p.tw) * 0.12
        p.y += p.vy * dt * 60
        if (p.y < -20) {
          p.y = ch + 20
          p.x = Math.random() * cw
        }
        if (p.x < -20) p.x = cw + 20
        if (p.x > cw + 20) p.x = -20

        if (p.burst) {
          p.x += p.burst.vx
          p.y += p.burst.vy
          p.burst.vy *= 0.985
          p.burst.life -= p.burst.decay
          if (p.burst.life <= 0) {
            parts.splice(i, 1)
            i -= 1
            continue
          }
        }

        // mouse attraction
        if (!reduced) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 120 * 120 && d2 > 1) {
            const d = Math.sqrt(d2)
            p.x += (dx / d) * (1.6 - d / 80) * 0.35
            p.y += (dy / d) * (1.6 - d / 80) * 0.35
          }
        }

        const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(p.tw))
        const a = (p.big ? 0.34 : 0.55) * tw * Math.min(1, alphaMul) * (p.burst ? Math.max(0, p.burst.life) : 1)
        const [r, g, b] = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.big ? p.r * 2.4 : p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fill()
        if (p.big) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.12})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(loop)
    }

    resize()
    seed()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClick, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="particles"
      style={{ opacity: 0.9 }}
    />
  )
}