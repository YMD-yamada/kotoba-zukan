import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { lettersFor, SCRIPT_META, speakPhraseFor, type LetterItem, type LetterScript } from '../data/letters'
import { speakText } from '../lib/speech'
import { useAppStore } from '../store/useAppStore'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function useLetterSpeak() {
  const gentle = useAppStore((s) => s.gentleVoice)
  const voiceJa = useAppStore((s) => s.voiceJaURI)
  const voiceEn = useAppStore((s) => s.voiceEnURI)
  return useCallback(
    (item: LetterItem) => {
      const phrase = speakPhraseFor(item)
      speakText(phrase.text, phrase.lang, {
        gentle,
        preferredVoiceURI: phrase.lang === 'ja' ? voiceJa : voiceEn,
      })
    },
    [gentle, voiceJa, voiceEn],
  )
}

function TracePad({ guide }: { guide: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#1d7a6f'
    ctx.lineWidth = 10
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize, guide])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)
  }, [guide])

  const pos = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    const ctx = e.currentTarget.getContext('2d')
    if (!ctx) return
    const p = pos(e)
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
  }

  const onMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const ctx = e.currentTarget.getContext('2d')
    if (!ctx) return
    const p = pos(e)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
  }

  const onUp = () => {
    drawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)
  }

  return (
    <div className="trace-wrap">
      <div className="trace-guide" aria-hidden>
        {guide}
      </div>
      <canvas
        ref={canvasRef}
        className="trace-canvas"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
      <button type="button" className="btn btn--ghost btn--wide" onClick={clear}>
        けす
      </button>
    </div>
  )
}

function ReadMode({ script }: { script: LetterScript }) {
  const list = lettersFor(script)
  const speak = useLetterSpeak()
  const [idx, setIdx] = useState(0)
  const item = list[idx]

  useEffect(() => {
    setIdx(0)
  }, [script])

  useEffect(() => {
    if (item) speak(item)
  }, [item, speak])

  return (
    <div className="letter-mode">
      <button
        type="button"
        className="letter-hero letter-hero--cue"
        onClick={() => speak(item)}
        aria-label={`${item.char}、${item.word}をきく`}
      >
        <span className="letter-hero__emoji" aria-hidden>
          {item.emoji}
        </span>
        <span className="letter-hero__char">{item.char}</span>
        <span className="letter-hero__word">{item.word}</span>
      </button>
      <p className="play-hub__lead">
        {idx + 1} / {list.length}　絵と文字をセットでおぼえよう
      </p>
      <div className="letter-nav">
        <button
          type="button"
          className="btn btn--ghost"
          disabled={idx <= 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
        >
          ← まえ
        </button>
        <button
          type="button"
          className="btn btn--primary"
          disabled={idx >= list.length - 1}
          onClick={() => setIdx((i) => Math.min(list.length - 1, i + 1))}
        >
          つぎ →
        </button>
      </div>
      <div className="letter-grid letter-grid--cue">
        {list.map((L, i) => (
          <button
            key={L.id}
            type="button"
            className={`letter-chip letter-chip--cue${i === idx ? ' is-on' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`${L.char} ${L.word}`}
          >
            <span className="letter-chip__emoji" aria-hidden>
              {L.emoji}
            </span>
            <span className="letter-chip__char">{L.char}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function WriteMode({ script }: { script: LetterScript }) {
  const list = lettersFor(script)
  const speak = useLetterSpeak()
  const [idx, setIdx] = useState(0)
  const item = list[idx]

  useEffect(() => {
    setIdx(0)
  }, [script])

  return (
    <div className="letter-mode">
      <div className="letter-write-cue" aria-hidden>
        <span className="letter-write-cue__emoji">{item.emoji}</span>
        <span className="letter-write-cue__word">{item.word}</span>
      </div>
      <p className="play-hub__lead">うすい字をなぞって書いてみよう</p>
      <div className="letter-nav">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            speak(item)
          }}
        >
          きく
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={idx <= 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
        >
          ←
        </button>
        <strong>
          {idx + 1}/{list.length}
        </strong>
        <button
          type="button"
          className="btn btn--primary"
          disabled={idx >= list.length - 1}
          onClick={() => setIdx((i) => Math.min(list.length - 1, i + 1))}
        >
          →
        </button>
      </div>
      <TracePad guide={item.char} />
    </div>
  )
}

function QuizMode({ script }: { script: LetterScript }) {
  const list = lettersFor(script)
  const speak = useLetterSpeak()
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [locked, setLocked] = useState(false)
  const [fb, setFb] = useState<'ok' | 'ng' | null>(null)
  const [q, setQ] = useState(() => makeQ(list))

  function makeQ(pool: LetterItem[]) {
    const answer = pool[Math.floor(Math.random() * pool.length)]
    const choices = shuffle([answer, ...shuffle(pool.filter((x) => x.id !== answer.id)).slice(0, 2)])
    return { answer, choices }
  }

  useEffect(() => {
    setQ(makeQ(lettersFor(script)))
    setScore(0)
    setRound(1)
    setFb(null)
    setLocked(false)
  }, [script])

  useEffect(() => {
    speak(q.answer)
  }, [q.answer, speak, round])

  const choose = (id: string) => {
    if (locked) return
    setLocked(true)
    const ok = id === q.answer.id
    setFb(ok ? 'ok' : 'ng')
    if (ok) {
      setScore((s) => s + 1)
      speakText('せいかい！', 'ja', { gentle: true })
    } else {
      speakText(`正解は ${q.answer.char}、${q.answer.word}`, 'ja', { gentle: true })
    }
    window.setTimeout(() => {
      setFb(null)
      setLocked(false)
      setRound((r) => r + 1)
      setQ(makeQ(list))
    }, 1000)
  }

  return (
    <div className="letter-mode">
      <p className="play-hub__lead">
        おとをきいて、絵と文字のセットをタッチ！　スコア {score} / {round}もんめ
      </p>
      <button type="button" className="btn btn--primary btn--wide" onClick={() => speak(q.answer)}>
        もういちどきく
      </button>
      <div className="letter-quiz-choices">
        {q.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`letter-quiz-btn letter-quiz-btn--cue${fb && c.id === q.answer.id ? ' is-correct' : ''}`}
            disabled={locked}
            onClick={() => choose(c.id)}
            aria-label={`${c.char} ${c.word}`}
          >
            <span className="letter-quiz-btn__emoji" aria-hidden>
              {c.emoji}
            </span>
            <span className="letter-quiz-btn__char">{c.char}</span>
            <span className="letter-quiz-btn__word">{c.word}</span>
          </button>
        ))}
      </div>
      {fb === 'ok' && <p className="quiz__fb is-ok">せいかい！</p>}
      {fb === 'ng' && <p className="quiz__fb is-ng">ざんねん…</p>}
    </div>
  )
}

type Mode = 'read' | 'write' | 'quiz'

export function LettersScreen({ onBack }: { onBack: () => void }) {
  const [script, setScript] = useState<LetterScript | null>(null)
  const [mode, setMode] = useState<Mode>('read')

  if (!script) {
    return (
      <section className="play-hub">
        <button type="button" className="back" onClick={onBack}>
          ← あそびにもどる
        </button>
        <h1>もじれんしゅう</h1>
        <p className="play-hub__lead">ひらがな・カタカナ・すうじ・アルファベットを、よんだりかいたりしてあそぼう。</p>
        <div className="play-hub__grid">
          {SCRIPT_META.map((s) => (
            <button
              key={s.id}
              type="button"
            className="play-card play-card--pic"
            style={{ '--tint': s.tint } as CSSProperties}
            onClick={() => {
              setScript(s.id)
              setMode('read')
            }}
            aria-label={s.title}
          >
            <span className="play-card__pic play-card__pic--letter" aria-hidden>
              {s.picture}
            </span>
            <span className="play-card__title">{s.title}</span>
            <span className="play-card__desc">{s.desc}</span>
          </button>
          ))}
        </div>
      </section>
    )
  }

  const meta = SCRIPT_META.find((s) => s.id === script)!

  return (
    <section className="mini-play">
      <button
        type="button"
        className="back"
        onClick={() => setScript(null)}
      >
        ← もじメニュー
      </button>
      <h1>{meta.title}</h1>
      <div className="chip-row wrap" role="tablist" aria-label="れんしゅうモード">
        {(
          [
            ['read', 'よむ', '👂'],
            ['write', 'かく', '✏️'],
            ['quiz', 'クイズ', '❓'],
          ] as const
        ).map(([id, label, pic]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={`chip chip--pic${mode === id ? ' is-on' : ''}`}
            onClick={() => setMode(id)}
          >
            <span aria-hidden>{pic}</span> {label}
          </button>
        ))}
      </div>
      {mode === 'read' && <ReadMode script={script} />}
      {mode === 'write' && <WriteMode script={script} />}
      {mode === 'quiz' && <QuizMode script={script} />}
    </section>
  )
}
