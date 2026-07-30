import { useCallback, useEffect, useRef, useState } from 'react'
import { words } from '../data'
import type { WordEntry } from '../data/types'
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

function makeQuestion(pool: WordEntry[]): { answer: WordEntry; choices: WordEntry[] } | null {
  if (pool.length === 0) return null
  const answer = pool[Math.floor(Math.random() * pool.length)]
  const others = pool.filter((w) => w.id !== answer.id)
  const distractors = shuffle(others).slice(0, Math.min(2, others.length))
  const choices = shuffle([answer, ...distractors])
  return { answer, choices }
}

export function QuizScreen() {
  const markHeard = useAppStore((s) => s.markHeard)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [feedback, setFeedback] = useState<'ok' | 'ng' | null>(null)
  const [locked, setLocked] = useState(false)
  const [question, setQuestion] = useState(() => makeQuestion(words))
  const nextTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (nextTimer.current !== null) window.clearTimeout(nextTimer.current)
    }
  }, [])

  const next = useCallback(() => {
    setFeedback(null)
    setLocked(false)
    setRound((r) => r + 1)
    setQuestion(makeQuestion(words))
  }, [])

  const playHint = () => {
    if (!question) return
    speakText(question.answer.ja, 'ja')
    markHeard(question.answer.id)
  }

  const choose = (w: WordEntry) => {
    if (locked || !question) return
    setLocked(true)
    const ok = w.id === question.answer.id
    setFeedback(ok ? 'ok' : 'ng')
    if (ok) {
      setScore((s) => s + 1)
      speakText('せいかい！', 'ja')
    } else {
      speakText(`正解は ${question.answer.ja}`, 'ja')
    }
    nextTimer.current = window.setTimeout(next, 1200)
  }

  if (!question) {
    return (
      <section className="quiz">
        <header className="quiz__head">
          <h1>なにのことば？</h1>
        </header>
        <p className="empty">クイズに使えることばがありません。ずかんをひらいてみよう。</p>
      </section>
    )
  }

  return (
    <section className="quiz">
      <header className="quiz__head">
        <h1>なにのことば？</h1>
        <p>
          スコア <strong>{score}</strong> ／ {round} もんめ
        </p>
      </header>

      <div className="quiz__prompt" aria-live="polite">
        <span className="quiz__emoji" aria-hidden>
          {question.answer.emoji}
        </span>
        <button type="button" className="btn btn--ghost" onClick={playHint}>
          ヒント（おと）
        </button>
      </div>

      <div className="quiz__choices">
        {question.choices.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`quiz__choice${
              feedback && w.id === question.answer.id ? ' is-correct' : ''
            }${feedback === 'ng' && w.id !== question.answer.id ? ' is-dim' : ''}`}
            onClick={() => choose(w)}
            disabled={locked}
          >
            {w.ja}
          </button>
        ))}
      </div>

      {feedback === 'ok' && <p className="quiz__fb is-ok">せいかい！</p>}
      {feedback === 'ng' && (
        <p className="quiz__fb is-ng">ざんねん… こたえは「{question.answer.ja}」</p>
      )}
    </section>
  )
}
