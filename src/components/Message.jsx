export default function Message({ stage }) {
  return (
    <div className={`message ${stage >= 1 ? 'message--on' : ''}`}>
      <p className={`msg-line msg-1 serif ${stage >= 1 ? 'msg-1--show' : ''}`}>
        Natalia, estas flores son para ti.
      </p>
      <p className={`msg-line msg-2 serif ${stage >= 2 ? 'msg-2--show' : ''}`}>
        Porque algunas personas llegan a nuestra vida
        <br />
        y hacen que todo se sienta un poquito más bonito.
      </p>
      <p className={`msg-line msg-3 ${stage >= 3 ? 'msg-3--show' : ''}`}>
        Espero que estas flores puedan sacarte una sonrisa. 💛
      </p>
    </div>
  )
}