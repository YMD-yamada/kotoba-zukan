import { useEffect, type CSSProperties } from 'react'
import type { WordEntry } from '../data/types'
import { categories } from '../data'
import { speakText, stopSpeaking, canSpeak } from '../lib/speech'
import { useAppStore } from '../store/useAppStore'
import { WordArt } from './WordArt'

export function WordScreen({
  word,
  onBack,
}: {
  word: WordEntry
  onBack: () => void
}) {
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

      <div className="word-detail__card" style={{ '--cat': cat?.color ?? '#2aa89a' } as CSSProperties}>
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
              英語できく
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
          <p className="hint">この端末では音声読み上げが使えません。文字でおぼえましょう。</p>
        )}
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={englishOn}
          onChange={(e) => setEnglishOn(e.target.checked)}
        />
        英語も表示する
      </label>
    </section>
  )
}
