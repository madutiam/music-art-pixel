// ═══════════════════════════════════════════════════════════════════
//  TIMELINE — o cérebro do vídeo. É AQUI que você edita tudo, Duda!
//
//  O vídeo dura ~1 minuto e o relógio é A MÚSICA: ela começa a tocar
//  em AUDIO_START (segundos do .wav) e os eventos abaixo usam o tempo
//  DO VÍDEO (0 = momento do play).
//
//  time   = segundo do vídeo em que o evento acontece
//  log    = linha que aparece no terminal (embaixo)
//           kind: 'cmd' | 'ok' | 'info' | 'dim' | 'warn' | 'ready'
//  video  = animação que entra flutuando como LEMBRANÇA e some
//           x     = posição horizontal (0 a 65, em % da tela)
//           rot   = inclinação em graus (-4 a 4 fica bonito)
//           drift = segundos que ela leva pra atravessar e sumir
//  camera = zoom (1 = normal), x/y deslocam, dur = duração do movimento
//  glitch = piscada de glitch
//  done   = fim — congela pra você cortar a gravação
//
//  (a LETRA fica no arquivo lyrics.ts, do lado deste!)
// ═══════════════════════════════════════════════════════════════════

export type CameraMove = { zoom?: number; x?: number; y?: number; dur?: number }

export type LogKind = 'cmd' | 'ok' | 'info' | 'dim' | 'warn' | 'ready'

export type TimelineEvent = {
  time: number
  log?: string
  kind?: LogKind
  typed?: boolean
  video?: string
  x?: number
  rot?: number
  drift?: number
  lyric?: string
  camera?: CameraMove
  glitch?: boolean
  done?: boolean
}

export const SONG = {
  artist: 'teo glacier',
  title: 'close with desires',
  tag: 'right person, wrong timing',
}

// Segundo da MÚSICA em que o vídeo começa.
// 140 = 2:20 → a reta final, com o refrão mais intenso (2:23–2:48)
// e terminando junto com o fim da música (3:21). Ajuste à vontade!
export const AUDIO_START = 140

export const timeline: TimelineEvent[] = [
  // ─────────────────────── boot (rapidinho) ───────────────────────
  { time: 0.2, log: 'initializing...', kind: 'dim' },
  { time: 0.7, log: 'loading memories...', kind: 'dim' },
  { time: 1.4, log: 'npm run dev', kind: 'cmd', typed: true },
  { time: 2.6, log: 'VITE v7.1.9  ready in 341 ms', kind: 'ok' },
  { time: 2.9, log: '✓ server running on localhost:3000', kind: 'ok' },
  { time: 3.4, log: `♪ now playing: ${SONG.artist} — ${SONG.title}`, kind: 'info' },
  { time: 3.9, log: '✓ 13 memories loaded', kind: 'ok' },

  // ──────────────── as lembranças (uma a cada ~4s) ────────────────
  { time: 5.5, video: 'perfil.mp4', x: 12, rot: -2, camera: { zoom: 1.03, dur: 3 } },
  { time: 9.5, video: 'comecando.mp4', x: 50, rot: 2 },
  { time: 13.1, log: '✉ new message received (1 unread)', kind: 'info' },
  { time: 13.5, video: 'recebe-a-msg.mp4', x: 24, rot: -1, glitch: true },
  { time: 21.5, video: 'chorachora.mp4', x: 14, rot: -3 },
  { time: 25.5, video: 'direita.mp4', x: 48, rot: 1, camera: { zoom: 1.02, x: 12, dur: 3 } },
  { time: 29.0, log: 'warn: emotions.exe using 98% cpu', kind: 'warn' },
  { time: 29.5, video: 'esquerda.mp4', x: 22, rot: -2, camera: { zoom: 1.02, x: -12, dur: 3 } },
  { time: 33.2, log: '⚠ emotions.exe is not responding', kind: 'warn' },
  { time: 33.5, video: 'comeco-do-desespero.mp4', x: 52, rot: 3, glitch: true },
  { time: 37.5, video: 'desespero.mp4', x: 26, rot: -2, glitch: true, camera: { zoom: 1.09, y: -25, dur: 1 } },
  { time: 38.6, glitch: true },
  { time: 41.2, log: '✗ build failed — everything broke', kind: 'warn' },
  { time: 41.5, video: 'ferrou-tudo.mp4', x: 55, rot: -3, glitch: true, camera: { zoom: 1.12, y: -30, dur: 0.9 } },
  { time: 42.7, glitch: true },
  { time: 45.5, video: 'imersa-no-desespero.mp4', x: 15, rot: 2, camera: { zoom: 1.05, y: -10, dur: 2.5 } },
  { time: 49.0, log: 'cleaning up... exit code 0', kind: 'dim' },
  { time: 49.5, video: 'indo-embora.mp4', x: 45, rot: 1, camera: { zoom: 1.0, x: 0, y: 0, dur: 4 } },

  // ───────────────────────── final ────────────────────────────────
  // a última lembrança: ela debruçada no PC
  { time: 54.0, video: 'choro-no-pc.mp4', x: 32, rot: 0, drift: 12, camera: { zoom: 1.05, y: -15, dur: 2.5 } },

  { time: 55.4, log: '> todavía amo cuando éramos nosotros.', kind: 'dim' },
  { time: 56.5, log: 'rendering complete', kind: 'ok' },
  { time: 57.3, log: '✓ memories rendered', kind: 'ok' },
  { time: 58.1, log: '✓ build completed', kind: 'ok' },
  { time: 59.2, log: 'ready', kind: 'ready' },

  { time: 61.4, done: true },
]
