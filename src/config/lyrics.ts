// ═══════════════════════════════════════════════════════════════════
//  LETRA DA MÚSICA — Duda, é aqui que você cola a letra! 🎵
//
//  O vídeo tem ~1 minuto e toca a música a partir de AUDIO_START
//  (veja timeline.ts — hoje: 140s = 2:20, reta final com o refrão).
//
//  1) Cola AQUI dentro das crases a parte da letra que toca nesse
//     trecho (ex.: o refrão). Pode colar com linhas em branco —
//     o site ignora vazias e divide os versos sozinho.
//  2) Cada linha vira uma "lembrança" flutuando na tela.
//  3) Os tempos ficam em LYRIC_TIMES (segundos DO VÍDEO, não da
//     música inteira). Ajuste ouvindo e apertando R!
// ═══════════════════════════════════════════════════════════════════

export const LYRICS_RAW = `
We go back and forth like it's nothing (nothing)
Seems that we already hit the summit (already hit the summit)
I could try to chase you up but I already tried (I already tried)
Ain't worth my time (ain't worth my time)
Ain't worth my-

Time and time again babe (time and time again)
Messages on read babe (messages on read)
I can't read between the lines, the lines (I can't read)
And I gave you my best babe (I gave you my best)
You still up and left babe (you still up and left)
Maybe right pеrson wrong timing (timing)

But I can't be stuck on someone who don't lovе me no more (love me no more)
Trust me no more (trust me no more)
Want me no more (want me no more)
And I can't be falling for somebody new, if I can't (new, if I can't)
Forget about the past, forget what we had
And I can't be stuck on someone who don't love me no more (love me no more)
`

// Momento (em segundos do vídeo) em que cada verso entra, na ordem
// de LYRICS_RAW. Versos além da lista entram de LYRIC_GAP em
// LYRIC_GAP segundos após o último.
export const LYRIC_TIMES: number[] = [
  3.5, 7, 10.5, 14, 17.5,          // estrofe 1
  21, 24.5, 28, 31.5, 35, 38.5,    // estrofe 2
  42, 45.5, 49, 52.5, 55.5, 58,    // refrão
]

export const LYRIC_GAP = 4.5
