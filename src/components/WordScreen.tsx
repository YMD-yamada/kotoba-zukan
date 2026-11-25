import { useEffect, useRef, type CSSProperties } from 'react'
import type { WordEntry } from '../data/types'
import { categories, getWordsByCategory } from '../data'
import { speakText, stopSpeaking, canSpeak } from '../lib/speech'
import { useAppStore } from '../store/useAppStore'
import { WordArt } from './WordArt'

export function WordScreen({
  word,
  onBack,
  onChange,
}: {
  word: WordEntry
  onBack: () => void
  onChange: (w: WordEntry) => void
}) {
  const siblings = getWordsByCategory(word.category)
  const idx = siblings.findIndex((w) => w.id === word.id)
  const prev = idx > 0 ? siblings[idx - 1] : null
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null
  const touchX = useRef<number | null>(null)
  const englishOn = useAppStore((s) => s.englishOn)
  const setEnglishOn = useAppStore((s) => s.setEnglishOn)
  const favorites = useAppStore((s) => s.favorites)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const markHeard = useAppStore((s) => s.markHeard)
  const gentleVoice = useAppStore((s) => s.gentleVoice)
  const voiceJaURI = useAppStore((s) => s.voiceJaURI)
  const voiceEnURI = useAppStore((s) => s.voiceEnURI)
  const cat = categories.find((c) => c.id === word.category)

  const speakOptsJa = { gentle: gentleVoice, preferredVoiceURI: voiceJaURI }
  const speakOptsEn = { gentle: gentleVoice, preferredVoiceURI: voiceEnURI }

  useEffect(() => {
    markHeard(word.id)
    speakText(word.ja, 'ja', speakOptsJa)
    return () => stopSpeaking()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-speak when word changes
  }, [word.id, word.ja, markHeard, gentleVoice, voiceJaURI])

  const playJa = () => {
    markHeard(word.id)
    speakText(word.ja, 'ja', speakOptsJa)
  }
  const playEn = () => {
    markHeard(word.id)
    speakText(word.en, 'en', speakOptsEn)
  }

  return (
    <section className="word-detail">
      <button type="button" className="back" onClick={onBack} aria-label="ずかんにもどる">
        ← もどる
      </button>

      <div
        key={word.id}
        className="word-detail__card page-turn"
        style={{ '--cat': cat?.color ?? '#2aa89a' } as CSSProperties}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const start = touchX.current
          touchX.current = null
          if (start === null) return
          const dx = e.changedTouches[0].clientX - start
          if (dx < -50 && next) onChange(next)
          if (dx > 50 && prev) onChange(prev)
        }}
      >
        <p className="word-detail__cat">
          {cat?.emoji} {cat?.label}
        </p>
        <div className="word-detail__emoji bounce-in" aria-hidden>
          <WordArt word={word} size={168} />
        </div>
        <h1 className="word-detail__ja">{word.ja}</h1>
        {englishOn && <p className="word-detail__en">{word.en}</p>}

        <div className="word-detail__actions">
          <button type="button" className="btn btn--primary" onClick={playJa} disabled={!canSpeak()}>
            にほんごできく
          </button>
          {englishOn && (
            <button type="button" className="btn btn--secondary" onClick={playEn} disabled={!canSpeak()}>
              えいごできく
            </button>
          )}
          <button
            type="button"
            className={`btn btn--ghost${favorites.includes(word.id) ? ' is-fav' : ''}`}
            onClick={() => toggleFavorite(word.id)}
            aria-pressed={favorites.includes(word.id)}
          >
            {favorites.includes(word.id) ? 'すき ♥' : 'すきにする'}
          </button>
        </div>

        {!canSpeak() && (
          <p className="hint">この たんまつでは よみあげが つかえないよ</p>
        )}
      </div>

      <div className="word-pager">
        <button
          type="button"
          className="word-pager__btn"
          onClick={() => prev && onChange(prev)}
          disabled={!prev}
          aria-label={prev ? `まえのことば ${prev.ja}` : 'まえのことばはないよ'}
        >
          ←
        </button>
        <span className="word-pager__count" aria-live="polite">
          {idx + 1} / {siblings.length}
        </span>
        <button
          type="button"
          className="word-pager__btn"
          onClick={() => next && onChange(next)}
          disabled={!next}
          aria-label={next ? `つぎのことば ${next.ja}` : 'つぎのことばはないよ'}
        >
          →
        </button>
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={englishOn}
          onChange={(e) => setEnglishOn(e.target.checked)}
        />
        えいごも だす
      </label>
    </section>
  )
}
