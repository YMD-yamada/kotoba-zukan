import { DressFigure, SoupPot } from './PlayArt'
import { useState, type CSSProperties } from 'react'
import { words } from '../data'
import { WordArt } from './WordArt'
import { useSpeakJa } from '../hooks/useSpeakJa'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SoundQuizScreen({ onBack }: { onBack: () => void }) {
  const speakJa = useSpeakJa()
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [locked, setLocked] = useState(false)
  const [fb, setFb] = useState<'ok' | 'ng' | null>(null)
  const [question, setQuestion] = useState(() => {
    const answer = words[Math.floor(Math.random() * words.length)]
    const choices = shuffle([answer, ...shuffle(words.filter((w) => w.id !== answer.id)).slice(0, 2)])
    return { answer, choices }
  })

  const nextQ = () => {
    const answer = words[Math.floor(Math.random() * words.length)]
    const choices = shuffle([answer, ...shuffle(words.filter((w) => w.id !== answer.id)).slice(0, 2)])
    setQuestion({ answer, choices })
  }

  const play = () => speakJa(question.answer.ja)

  const choose = (id: string) => {
    if (locked) return
    setLocked(true)
    const ok = id === question.answer.id
    setFb(ok ? 'ok' : 'ng')
    if (ok) {
      setScore((s) => s + 1)
      speakJa('せいかい！')
    } else speakJa(`せいかいは ${question.answer.ja}`)
    window.setTimeout(() => {
      setFb(null)
      setLocked(false)
      setRound((r) => r + 1)
      nextQ()
    }, 1100)
  }

  return (
    <section className="quiz">
      <button type="button" className="back" onClick={onBack}>
        ← あそびにもどる
      </button>
      <header className="quiz__head">
        <h1>おとあて</h1>
        <p>
          スコア <strong>{score}</strong> ／ {round} もんめ
        </p>
      </header>
      <div className="quiz__prompt">
        <p className="play-hub__lead">おとをきいて、ただしいえをタッチ！</p>
        <button type="button" className="btn btn--primary" onClick={play}>
          おとをきく
        </button>
      </div>
      <div className="quiz__choices sound-choices">
        {question.choices.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`sound-choice${fb && w.id === question.answer.id ? ' is-correct' : ''}`}
            onClick={() => choose(w.id)}
            disabled={locked}
            aria-label={w.ja}
          >
            <WordArt word={w} size={88} />
          </button>
        ))}
      </div>
      {fb === 'ok' && <p className="quiz__fb is-ok">せいかい！</p>}
      {fb === 'ng' && <p className="quiz__fb is-ng">ざんねん…</p>}
    </section>
  )
}

const VEG = [
  { id: 'carrot', ja: 'にんじん', color: '#fb8500' },
  { id: 'tomato', ja: 'トマト', color: '#e63946' },
  { id: 'corn', ja: 'とうもろこし', color: '#ffd166' },
  { id: 'broccoli', ja: 'ブロッコリー', color: '#2a9d8f' },
  { id: 'onion', ja: 'たまねぎ', color: '#c9ada7' },
  { id: 'potato', ja: 'じゃがいも', color: '#dda15e' },
]
const SEASONING = [
  { id: 'salt', ja: 'しお', color: '#f8f9fa' },
  { id: 'soy', ja: 'しょうゆ', color: '#6f1d1b' },
  { id: 'butter', ja: 'バター', color: '#ffe066' },
]

export function SoupPlayScreen({ onBack }: { onBack: () => void }) {
  const speakJa = useSpeakJa()
  const [veg, setVeg] = useState<string[]>([])
  const [seas, setSeas] = useState<string[]>([])
  const [stirred, setStirred] = useState(false)

  const toggleVeg = (id: string) => {
    setStirred(false)
    setVeg((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id)
      if (cur.length >= 3) return cur
      return [...cur, id]
    })
  }
  const toggleSeas = (id: string) => {
    setStirred(false)
    setSeas((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id)
      if (cur.length >= 2) return cur
      return [...cur, id]
    })
  }

  const mix = () => {
    if (veg.length < 1) {
      speakJa('やさいをいれてね')
      return
    }
    setStirred(true)
    const names = [...veg, ...seas]
      .map((id) => [...VEG, ...SEASONING].find((x) => x.id === id)?.ja)
      .filter(Boolean)
      .join('、')
    speakJa(`${names}のスープができたよ。おいしいね`)
  }

  return (
    <section className="mini-play">
      <button type="button" className="back" onClick={onBack}>
        ← あそびにもどる
      </button>
      <h1>スープをつくろう</h1>
      <p className="play-hub__lead">やさいを3つまで、ちょうみりょうを2つまでえらんでまぜよう。</p>
      <div className="soup-stage">
        <SoupPot
          ready={stirred}
          colors={veg.map((id) => VEG.find((v) => v.id === id)?.color).filter((c): c is string => Boolean(c))}
        />
        <p className="soup-caption">{stirred ? 'できた！ おいしそう' : veg.length ? 'まぜてみよう' : 'やさいを えらんでね'}</p>
      </div>
      <h2 className="section-title">やさい</h2>
      <div className="chip-row wrap">
        {VEG.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`chip chip--swatch${veg.includes(v.id) ? ' is-on' : ''}`}
            style={{ '--swatch': v.color } as CSSProperties}
            onClick={() => {
              toggleVeg(v.id)
              speakJa(v.ja)
            }}
          >
            <span className="chip__swatch" aria-hidden />
            {v.ja}
          </button>
        ))}
      </div>
      <h2 className="section-title">ちょうみりょう</h2>
      <div className="chip-row wrap">
        {SEASONING.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`chip chip--swatch${seas.includes(v.id) ? ' is-on' : ''}`}
            style={{ '--swatch': v.color } as CSSProperties}
            onClick={() => {
              toggleSeas(v.id)
              speakJa(v.ja)
            }}
          >
            <span className="chip__swatch" aria-hidden />
            {v.ja}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn--primary btn--wide" onClick={mix}>
        まぜる！
      </button>
    </section>
  )
}

const TOPS = [
  { id: 't1', ja: 'Tシャツ', color: '#4cc9f0' },
  { id: 't2', ja: 'セーター', color: '#e63946' },
  { id: 't3', ja: 'シャツ', color: '#fff8e8' },
]
const BOTTOMS = [
  { id: 'b1', ja: 'ズボン', color: '#457b9d' },
  { id: 'b2', ja: 'スカート', color: '#f72585' },
  { id: 'b3', ja: 'ハーフパンツ', color: '#2a9d8f' },
]
const ACCESS = [
  { id: 'a1', ja: 'ぼうし', color: '#ffb703' },
  { id: 'a2', ja: 'めがね', color: '#243447' },
  { id: 'a3', ja: 'マフラー', color: '#c77dff' },
]

export function DressPlayScreen({ onBack }: { onBack: () => void }) {
  const speakJa = useSpeakJa()
  const [top, setTop] = useState(TOPS[0])
  const [bottom, setBottom] = useState(BOTTOMS[0])
  const [acc, setAcc] = useState(ACCESS[0])

  const announce = () => speakJa(`${top.ja}と${bottom.ja}と${acc.ja}だよ`)

  return (
    <section className="mini-play">
      <button type="button" className="back" onClick={onBack}>
        ← あそびにもどる
      </button>
      <h1>おきがえしよう</h1>
      <div className="dress-stage">
        <DressFigure top={top} bottom={bottom} acc={acc} />
        <p className="dress-caption">
          {top.ja} ・ {bottom.ja} ・ {acc.ja}
        </p>
      </div>
      <h2 className="section-title">うえ</h2>
      <div className="chip-row wrap">
        {TOPS.map((x) => (
          <button
            key={x.id}
            type="button"
            className={`chip chip--swatch${top.id === x.id ? ' is-on' : ''}`}
            style={{ '--swatch': x.color } as CSSProperties}
            onClick={() => {
              setTop(x)
              speakJa(x.ja)
            }}
          >
            <span className="chip__swatch" aria-hidden />
            {x.ja}
          </button>
        ))}
      </div>
      <h2 className="section-title">した</h2>
      <div className="chip-row wrap">
        {BOTTOMS.map((x) => (
          <button
            key={x.id}
            type="button"
            className={`chip chip--swatch${bottom.id === x.id ? ' is-on' : ''}`}
            style={{ '--swatch': x.color } as CSSProperties}
            onClick={() => {
              setBottom(x)
              speakJa(x.ja)
            }}
          >
            <span className="chip__swatch" aria-hidden />
            {x.ja}
          </button>
        ))}
      </div>
      <h2 className="section-title">みにつけるもの</h2>
      <div className="chip-row wrap">
        {ACCESS.map((x) => (
          <button
            key={x.id}
            type="button"
            className={`chip chip--swatch${acc.id === x.id ? ' is-on' : ''}`}
            style={{ '--swatch': x.color } as CSSProperties}
            onClick={() => {
              setAcc(x)
              speakJa(x.ja)
            }}
          >
            <span className="chip__swatch" aria-hidden />
            {x.ja}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn--secondary btn--wide" onClick={announce}>
        できたコーデをきく
      </button>
    </section>
  )
}

const INSTRUMENTS = [
  { id: 'piano', ja: 'ピアノ', freq: 523.25, pic: '🎹' },
  { id: 'drum', ja: 'たいこ', freq: 120, pic: '🥁' },
  { id: 'flute', ja: 'ふえ', freq: 784, pic: '🎶' },
  { id: 'guitar', ja: 'ギター', freq: 329.63, pic: '🎸' },
  { id: 'bell', ja: 'ベル', freq: 1046.5, pic: '🔔' },
  { id: 'xylophone', ja: 'シロフォン', freq: 659.25, pic: '🎵' },
]

function playTone(freq: number, type: OscillatorType = 'sine', ms = 280) {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.value = 0.0001
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + ms / 1000 + 0.02)
    window.setTimeout(() => void ctx.close(), ms + 80)
  } catch {
    // ignore
  }
}

export function MusicPlayScreen({ onBack }: { onBack: () => void }) {
  const speakJa = useSpeakJa()
  return (
    <section className="mini-play">
      <button type="button" className="back" onClick={onBack}>
        ← あそびにもどる
      </button>
      <h1>えんそうしよう</h1>
      <p className="play-hub__lead">がっきをタッチすると おとがなるよ</p>
      <div className="music-grid">
        {INSTRUMENTS.map((ins) => (
          <button
            key={ins.id}
            type="button"
            className="music-pad"
            onClick={() => {
              speakJa(ins.ja)
              playTone(ins.freq, ins.id === 'drum' ? 'square' : ins.id === 'guitar' ? 'sawtooth' : 'sine')
            }}
          >
            {ins.pic}
            <span>{ins.ja}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
