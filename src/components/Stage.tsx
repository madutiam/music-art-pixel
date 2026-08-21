import { useEffect, useState, type ReactNode } from 'react'
import type { CameraState } from '../engine/useTimeline'

// Palco fixo de 1920×1080 (16:9, tela de monitor) que se ajusta à janela.
// A "câmera" é a div interna: zoom e deslocamento vêm da timeline.
export default function Stage({
  camera,
  glitchNonce,
  hideCursor,
  children,
}: {
  camera: CameraState
  glitchNonce: number
  hideCursor: boolean
  children: ReactNode
}) {
  const [scale, setScale] = useState(1)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
      setScale(s > 0 ? s : 1)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    if (glitchNonce === 0) return
    setGlitching(true)
    const t = setTimeout(() => setGlitching(false), 380)
    return () => clearTimeout(t)
  }, [glitchNonce])

  return (
    <div
      className={`stage${glitching ? ' glitching' : ''}${hideCursor ? ' no-cursor' : ''}`}
      style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
    >
      <div
        className="camera"
        style={{
          transform: `scale(${camera.zoom}) translate(${camera.x}px, ${camera.y}px)`,
          transitionDuration: `${camera.dur}s`,
        }}
      >
        {children}
      </div>
      <div className="fx-scanlines" />
      <div className="fx-vignette" />
    </div>
  )
}
