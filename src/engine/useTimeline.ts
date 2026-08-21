import { useCallback, useEffect, useRef, useState } from 'react'
import { AUDIO_START, timeline, type CameraMove, type LogKind, type TimelineEvent } from '../config/timeline'
import { LYRICS_RAW, LYRIC_TIMES, LYRIC_GAP } from '../config/lyrics'

export type FeedItem = { id: number; text: string; kind: LogKind; typed: boolean }

export type MemoryItem = {
  id: number
  kind: 'video' | 'lyric'
  name?: string
  text?: string
  x: number
  rot: number
  drift: number
  expiresAt: number
}

export type Phase = 'idle' | 'running' | 'done'

export type CameraState = Required<CameraMove>

const CAMERA_HOME: CameraState = { zoom: 1, x: 0, y: 0, dur: 2 }

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/close-with-desires.wav`

// posições/inclinações usadas quando o evento não define as suas
const LYRIC_X = [8, 50, 28, 56, 14, 40]
const LYRIC_ROT = [-1.5, 1.5, -0.8, 2, -2, 1]

function buildEvents(): TimelineEvent[] {
  const lines = LYRICS_RAW
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.includes('cole a letra aqui'))

  const lyricEvents: TimelineEvent[] = lines.map((text, i) => ({
    time: LYRIC_TIMES[i] ?? (LYRIC_TIMES[LYRIC_TIMES.length - 1] ?? 16) + LYRIC_GAP * (i - LYRIC_TIMES.length + 1),
    lyric: text,
    x: LYRIC_X[i % LYRIC_X.length],
    rot: LYRIC_ROT[i % LYRIC_ROT.length],
  }))

  const hint: TimelineEvent[] = lines.length === 0
    ? [{ time: 7, log: 'letra: cole em src/config/lyrics.ts e aperte R', kind: 'dim' }]
    : []

  return [...timeline, ...lyricEvents, ...hint].sort((a, b) => a.time - b.time)
}

export function useTimeline() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [camera, setCamera] = useState<CameraState>(CAMERA_HOME)
  const [glitchNonce, setGlitchNonce] = useState(0)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [playNonce, setPlayNonce] = useState(0)

  const rafRef = useRef(0)
  const nextIdx = useRef(0)
  const idRef = useRef(0)
  const eventsRef = useRef<TimelineEvent[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioBlocked = useRef(false)
  const fallbackT0 = useRef(0)

  const getTime = useCallback(() => {
    const a = audioRef.current
    if (a && !a.error && !audioBlocked.current && a.readyState > 0) return a.currentTime - AUDIO_START
    return (performance.now() - fallbackT0.current) / 1000
  }, [])

  const fire = useCallback((ev: TimelineEvent, now: number) => {
    if (ev.glitch) setGlitchNonce(n => n + 1)
    if (ev.camera) setCamera(c => ({ ...c, dur: 1.2, ...ev.camera }))

    if (ev.log !== undefined) {
      const item: FeedItem = {
        id: idRef.current++,
        text: ev.log,
        kind: ev.kind ?? 'info',
        typed: ev.typed ?? ev.kind === 'cmd',
      }
      setFeed(f => [...f, item])
    }

    if (ev.video) {
      const drift = ev.drift ?? 16
      const mem: MemoryItem = {
        id: idRef.current++,
        kind: 'video',
        name: ev.video,
        x: ev.x ?? 30,
        rot: ev.rot ?? 0,
        drift,
        expiresAt: now + drift + 0.5,
      }
      setMemories(m => [...m, mem])
      setCurrentVideo(ev.video)
      const log: FeedItem = { id: idRef.current++, text: `▸ memory: animations/${ev.video}`, kind: 'dim', typed: false }
      setFeed(f => [...f, log])
    }

    if (ev.lyric) {
      const drift = ev.drift ?? 13
      const mem: MemoryItem = {
        id: idRef.current++,
        kind: 'lyric',
        text: ev.lyric,
        x: ev.x ?? 20,
        rot: ev.rot ?? 0,
        drift,
        expiresAt: now + drift + 0.5,
      }
      setMemories(m => [...m, mem])
    }

    if (ev.done) setPhase('done')
  }, [])

  const play = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    eventsRef.current = buildEvents()
    nextIdx.current = 0
    idRef.current = 0
    setFeed([])
    setMemories([])
    setCurrentVideo(null)
    setCamera(CAMERA_HOME)
    setGlitchNonce(0)
    setPhase('running')
    setPlayNonce(n => n + 1)
    fallbackT0.current = performance.now()

    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_SRC)
      audioRef.current.preload = 'auto'
    }
    const audio = audioRef.current
    audioBlocked.current = false
    audio.currentTime = AUDIO_START
    void audio.play().then(() => {
      audioBlocked.current = false
    }).catch(() => {
      // navegador bloqueou o autoplay ou o arquivo sumiu:
      // o relógio interno assume pra experiência nunca travar
      audioBlocked.current = true
      fallbackT0.current = performance.now()
    })

    const loop = () => {
      const t = getTime()
      const evs = eventsRef.current
      let sawDone = false
      while (nextIdx.current < evs.length && evs[nextIdx.current].time <= t) {
        const ev = evs[nextIdx.current++]
        fire(ev, t)
        if (ev.done) sawDone = true
      }
      setMemories(m => (m.some(x => x.expiresAt <= t) ? m.filter(x => x.expiresAt > t) : m))
      if (sawDone) {
        audio.pause()
        return
      }
      if (nextIdx.current >= evs.length) {
        setPhase('done')
        audio.pause()
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [fire, getTime])

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    audioRef.current?.pause()
  }, [])

  return { phase, feed, memories, camera, glitchNonce, currentVideo, playNonce, getTime, play }
}
