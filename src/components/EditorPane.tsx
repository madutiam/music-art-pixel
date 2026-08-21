import { useEffect, useMemo, useState } from 'react'
import type { Phase } from '../engine/useTimeline'

type Token = { c: string; t: string }
type Line = Token[]

// O código que aparece "sendo digitado" no editor (meta: é a própria timeline!)
const CODE: Line[] = [
  [{ c: 'kw', t: 'import' }, { c: 'pl', t: ' { ' }, { c: 'var', t: 'memory' }, { c: 'pl', t: ' } ' }, { c: 'kw', t: 'from' }, { c: 'str', t: " './engine'" }],
  [{ c: 'kw', t: 'import' }, { c: 'pl', t: ' { ' }, { c: 'var', t: 'LYRICS' }, { c: 'pl', t: ' } ' }, { c: 'kw', t: 'from' }, { c: 'str', t: " './lyrics'" }],
  [],
  [{ c: 'kw', t: 'export' }, { c: 'pl', t: ' ' }, { c: 'kw', t: 'const' }, { c: 'pl', t: ' ' }, { c: 'var', t: 'AUDIO_START' }, { c: 'pl', t: ' = ' }, { c: 'num', t: '140' }, { c: 'cm', t: '  // 2:20 — o refrão' }],
  [],
  [{ c: 'kw', t: 'export' }, { c: 'pl', t: ' ' }, { c: 'kw', t: 'const' }, { c: 'pl', t: ' ' }, { c: 'var', t: 'memories' }, { c: 'pl', t: ' = [' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'perfil.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '5.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'comecando.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '9.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'recebe-a-msg.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '13.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'chorachora.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '21.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'direita.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '25.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'esquerda.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '29.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'comeco-do-desespero.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '33.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'desespero.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '37.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'ferrou-tudo.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '41.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'imersa-no-desespero.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '45.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'indo-embora.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '49.5' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: '  ' }, { c: 'fn', t: 'memory' }, { c: 'pl', t: '(' }, { c: 'str', t: "'choro-no-pc.mp4'" }, { c: 'pl', t: ', ' }, { c: 'num', t: '54.0' }, { c: 'pl', t: '),' }],
  [{ c: 'pl', t: ']' }],
  [],
  [{ c: 'cm', t: '// Todavía amo cuando éramos nosotros.' }],
  [{ c: 'cm', t: '// right person, wrong timing ♪' }],
]

const lineLen = (l: Line) => l.reduce((n, tk) => n + tk.t.length, 0)

export default function EditorPane({ phase }: { phase: Phase }) {
  const totals = useMemo(() => CODE.map(lineLen), [])
  const totalChars = useMemo(() => totals.reduce((a, b) => a + b + 1, 0), [totals])
  const [chars, setChars] = useState(phase === 'idle' ? Math.floor(totalChars * 0.45) : 0)

  useEffect(() => {
    if (phase !== 'running') return
    setChars(0)
    const iv = setInterval(() => {
      setChars(c => (c >= totalChars ? c : c + 1))
    }, 32)
    return () => clearInterval(iv)
  }, [phase, totalChars])

  let budget = chars
  const rendered = CODE.map((line, i) => {
    const len = totals[i]
    if (budget <= 0) return null
    const take = Math.min(budget, len)
    budget -= len + 1
    const isCursorLine = take < len || budget <= 0
    let remaining = take
    return (
      <div className="code-line" key={i}>
        <span className="line-no">{i + 1}</span>
        <span className="line-text">
          {line.map((tk, j) => {
            if (remaining <= 0) return null
            const t = tk.t.slice(0, remaining)
            remaining -= tk.t.length
            return <span key={j} className={`tk-${tk.c}`}>{t}</span>
          })}
          {isCursorLine && <span className="code-cursor" />}
        </span>
      </div>
    )
  })

  return (
    <div className="editor-pane">
      <div className="tabs">
        <div className="tab active">
          <span className="file-icon ts">TS</span> timeline.ts
          <span className="tab-dot">●</span>
        </div>
        <div className="tab">
          <span className="file-icon ts">TS</span> lyrics.ts
        </div>
        <div className="tab">
          <span className="file-icon tsx">TS</span> App.tsx
        </div>
      </div>
      <div className="breadcrumb">src <span className="crumb-sep">›</span> config <span className="crumb-sep">›</span> <span className="file-icon ts">TS</span> timeline.ts</div>
      <div className="editor-code">{rendered}</div>
    </div>
  )
}
