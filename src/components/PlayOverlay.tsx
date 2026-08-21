import { SONG } from '../config/timeline'

const BASE = import.meta.env.BASE_URL

export default function PlayOverlay({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="play-overlay" onClick={onPlay}>
      <div className="play-card">
        <div className="play-avatar">
          <video src={`${BASE}animations/perfil.mp4`} autoPlay muted loop playsInline />
        </div>
        <h1 className="play-title">music-art-pixel</h1>
        <p className="play-song">♪ {SONG.artist} — {SONG.title} · {SONG.tag}</p>
        <button className="play-btn" type="button">▶ PLAY 🔊</button>
        <p className="play-hints">espaço = play · R = reiniciar · F = tela cheia</p>
      </div>
    </div>
  )
}
