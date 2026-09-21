import { useEffect, useRef, useState } from 'react'

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" rx="1.4" />
    <rect x="14" y="4" width="4" height="16" rx="1.4" />
  </svg>
)

const SpeakerIcon = ({ muted }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6.5 9H3v6h3.5L11 19V5z" />
    {muted ? (
      <>
        <line x1="16" y1="9" x2="22" y2="15" />
        <line x1="22" y1="9" x2="16" y2="15" />
      </>
    ) : (
      <>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 6a9 9 0 0 1 0 12" />
      </>
    )}
  </svg>
)

/**
 * Floating, discreet audio control. Music starts automatically the moment
 * Natalia taps "Descúbrelo ✨" (a user gesture, so autoplay is allowed).
 * Place your track at:  public/assets/musica.mp3
 */
export default function MusicPlayer({ started }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    if (!started || !available) return
    const el = audioRef.current
    if (!el) return
    el.volume = 0.85
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setAvailable(false))
  }, [started, available])

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  const toggleMute = () => {
    const el = audioRef.current
    if (!el) return
    const next = !muted
    el.muted = next
    setMuted(next)
  }

  if (!available) return null

  return (
    <div className={`music ${started ? 'music--on' : ''}`} role="group" aria-label="Controles de música">
      <button type="button" className="music-btn" onClick={togglePlay} aria-label={playing ? 'Pausar música' : 'Reanudar música'} title={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? <PauseIcon /> : <NoteIcon />}
      </button>
      <button
        type="button"
        className={`music-btn music-btn--soft ${muted ? 'music-btn--muted' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Quitar silencio' : 'Silenciar'}
        title={muted ? 'Con sonido' : 'Silenciar'}
      >
        <SpeakerIcon muted={muted} />
      </button>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/musica.mp3`} loop preload="auto" onError={() => setAvailable(false)} />
    </div>
  )
}