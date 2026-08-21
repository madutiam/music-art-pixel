import { useEffect, useState } from 'react'
import { SONG } from '../config/timeline'
import type { Phase } from '../engine/useTimeline'

const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s))
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

export default function StatusBar({ phase, getTime }: { phase: Phase; getTime: () => number }) {
  const [clock, setClock] = useState('00:00')

  useEffect(() => {
    if (phase !== 'running') return
    const iv = setInterval(() => setClock(fmt(getTime())), 250)
    return () => clearInterval(iv)
  }, [phase, getTime])

  return (
    <div className="statusbar">
      <div className="status-left">
        <span className="status-item">⎇ main*</span>
        <span className="status-item">⊘ 0 ⚠ 0</span>
        <span className={`status-item rec${phase === 'running' ? ' on' : ''}`}>
          <span className="rec-dot" /> REC {clock}
        </span>
      </div>
      <div className="status-right">
        <span className="status-item">Ln 21, Col 42</span>
        <span className="status-item">UTF-8</span>
        <span className="status-item">TypeScript React</span>
        <span className="status-item">♪ {SONG.title} · {SONG.tag}</span>
      </div>
    </div>
  )
}
