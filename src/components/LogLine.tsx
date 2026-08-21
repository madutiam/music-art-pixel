import { useEffect, useState } from 'react'
import type { LogKind } from '../config/timeline'

export function useTypewriter(text: string, enabled: boolean, cps = 32) {
  const [n, setN] = useState(enabled ? 0 : text.length)
  useEffect(() => {
    if (!enabled) {
      setN(text.length)
      return
    }
    setN(0)
    const iv = setInterval(() => {
      setN(k => {
        if (k >= text.length) {
          clearInterval(iv)
          return k
        }
        return k + 1
      })
    }, 1000 / cps)
    return () => clearInterval(iv)
  }, [text, enabled, cps])
  return { shown: text.slice(0, n), typing: n < text.length }
}

export default function LogLine({ text, kind, typed }: { text: string; kind: LogKind; typed: boolean }) {
  const { shown, typing } = useTypewriter(text, typed)

  if (kind === 'cmd') {
    return (
      <div className="log-line">
        <span className="prompt">➜</span>
        <span className="prompt-path">music-art-pixel</span>
        <span className="prompt-git">git:(main)</span>
        <span className="tk-pl"> {shown}</span>
        {typing && <span className="block-cursor" />}
      </div>
    )
  }

  return (
    <div className={`log-line log-${kind}`}>
      <span>{shown}</span>
      {kind === 'ready' && <span className="block-cursor blink" />}
    </div>
  )
}
