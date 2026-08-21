import type { CSSProperties } from 'react'
import type { MemoryItem } from '../engine/useTimeline'

const BASE = import.meta.env.BASE_URL

// As "lembranças": vídeos e versos que sobem flutuando por cima
// do código e somem, no ritmo da música.
function Memory({ m }: { m: MemoryItem }) {
  const style = {
    left: `${m.x}%`,
    animationDuration: `${m.drift}s`,
    '--rot': `${m.rot}deg`,
  } as CSSProperties

  if (m.kind === 'video') {
    return (
      <div className="memory" style={style}>
        <div className="memory-sway">
          <div className="memory-meta">▸ animations/{m.name}</div>
          <div className="memory-frame">
            <video src={`${BASE}animations/${m.name}`} autoPlay muted loop playsInline />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="memory" style={style}>
      <div className="memory-sway">
        <div className="memory-lyric">
          <span className="lyric-note">♪</span>
          <span>{m.text}</span>
        </div>
      </div>
    </div>
  )
}

export default function MemoryLayer({ memories }: { memories: MemoryItem[] }) {
  return (
    <div className="memory-layer">
      {memories.map(m => <Memory key={m.id} m={m} />)}
    </div>
  )
}
