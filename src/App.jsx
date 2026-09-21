import { useEffect, useRef, useState } from 'react'
import SvgDefs from './components/SvgDefs'
import Particles from './components/Particles'
import Intro from './components/Intro'
import FlowerGarden from './components/FlowerGarden'
import Message from './components/Message'
import FinalMoment from './components/FinalMoment'
import MusicPlayer from './components/MusicPlayer'
import { useMedia } from './hooks'

const INTENSITY = { intro: 0.42, growing: 0.72, message: 0.85, final: 1.15 }

export default function App() {
  const mobile = useMedia('(max-width: 820px)')
  const [phase, setPhase] = useState('intro')
  const [msgStage, setMsgStage] = useState(0)
  const startedRef = useRef(false)

  // smooth mouse parallax (desktop only) → CSS vars driving garden & glow
  useEffect(() => {
    if (mobile) return
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const mx = (e.clientX / window.innerWidth - 0.5) * 2
        const my = (e.clientY / window.innerHeight - 0.5) * 2
        document.documentElement.style.setProperty('--mx', mx.toFixed(3))
        document.documentElement.style.setProperty('--my', my.toFixed(3))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mobile])

  const startExperience = () => {
    if (startedRef.current) return
    startedRef.current = true
    setPhase('growing')
  }

  // cinematic timeline once the experience starts
  useEffect(() => {
    if (phase !== 'growing') return
    const t = []
    t.push(setTimeout(() => setMsgStage(1), 8400))
    t.push(setTimeout(() => setMsgStage(2), 12400))
    t.push(setTimeout(() => setMsgStage(3), 16400))
    t.push(setTimeout(() => setPhase('final'), 21400))
    return () => t.forEach(clearTimeout)
  }, [phase])

  return (
    <div className={`app phase-${phase}`}>
      <SvgDefs />

      <div className="vignette" />
      <div className="grain" />

      <Particles intensity={INTENSITY[phase]} reduced={mobile} />

      <FlowerGarden phase={phase} mobile={mobile} />

      {phase === 'growing' && <div className="bloom-ring" />}

      {phase === 'growing' ? <Message stage={msgStage} /> : null}

      {phase === 'final' && <FinalMoment />}

      {phase === 'intro' ? <Intro onStart={startExperience} /> : null}

      <MusicPlayer started={phase !== 'intro'} />
    </div>
  )
}