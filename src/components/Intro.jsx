export default function Intro({ onStart, hidden }) {
  return (
    <div className={`intro ${hidden ? 'intro--hidden' : ''}`}>
      <div className="intro-glow" />
      <h1 className="intro-name serif">Natalia...</h1>
      <p className="intro-line intro-line--sub">Tengo algo que quiero regalarte.</p>
      <button type="button" className="cta" onClick={onStart}>
        <span className="cta-text">Descúbrelo</span>
        <span className="cta-star">✨</span>
      </button>
      <p className="intro-hint">prepara los auriculares</p>
    </div>
  )
}