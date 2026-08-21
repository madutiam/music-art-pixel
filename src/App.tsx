import { useEffect } from 'react'
import { useTimeline } from './engine/useTimeline'
import Stage from './components/Stage'
import VSCodeShell from './components/VSCodeShell'
import PlayOverlay from './components/PlayOverlay'

export default function App() {
  const tl = useTimeline()
  const { phase, play } = tl

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (phase !== 'running') play()
      }
      if (e.key === 'r' || e.key === 'R') play()
      if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void document.documentElement.requestFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, play])

  return (
    <div className="viewport">
      <Stage camera={tl.camera} glitchNonce={tl.glitchNonce} hideCursor={phase === 'running'}>
        <VSCodeShell
          key={tl.playNonce}
          feed={tl.feed}
          memories={tl.memories}
          phase={phase}
          currentVideo={tl.currentVideo}
          getTime={tl.getTime}
        />
        {phase === 'idle' && <PlayOverlay onPlay={play} />}
      </Stage>
    </div>
  )
}
