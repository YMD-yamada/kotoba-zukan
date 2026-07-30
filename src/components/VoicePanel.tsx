import { useEffect, useState } from 'react'
import {
  bestVoiceLabel,
  listVoicesFor,
  speakText,
  warmUpVoices,
  type SpeakLang,
} from '../lib/speech'
import { useAppStore } from '../store/useAppStore'

export function VoicePanel() {
  const gentleVoice = useAppStore((s) => s.gentleVoice)
  const setGentleVoice = useAppStore((s) => s.setGentleVoice)
  const voiceJaURI = useAppStore((s) => s.voiceJaURI)
  const voiceEnURI = useAppStore((s) => s.voiceEnURI)
  const setVoiceJaURI = useAppStore((s) => s.setVoiceJaURI)
  const setVoiceEnURI = useAppStore((s) => s.setVoiceEnURI)
  const [jaVoices, setJaVoices] = useState(() => listVoicesFor('ja'))
  const [enVoices, setEnVoices] = useState(() => listVoicesFor('en'))

  useEffect(() => {
    warmUpVoices()
    const refresh = () => {
      setJaVoices(listVoicesFor('ja'))
      setEnVoices(listVoicesFor('en'))
    }
    refresh()
    window.speechSynthesis?.addEventListener('voiceschanged', refresh)
    const t = window.setTimeout(refresh, 500)
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', refresh)
      window.clearTimeout(t)
    }
  }, [])

  const preview = (lang: SpeakLang) => {
    const sample = lang === 'ja' ? 'こんにちは。やさしい声だよ。' : 'Hello. This is a gentle voice.'
    speakText(sample, lang, {
      gentle: gentleVoice,
      preferredVoiceURI: lang === 'ja' ? voiceJaURI : voiceEnURI,
      withBlip: true,
    })
  }

  return (
    <section className="voice-panel">
      <h2>こえの設定</h2>
      <p className="voice-panel__hint">
        できるだけ人間に近い声（Neural / Natural）を自動で選びます。Microsoft Edge だと日本語が特に自然なことが多いです。いまのおすすめ:{' '}
        <strong>{bestVoiceLabel('ja')}</strong>
      </p>

      <label className="toggle">
        <input
          type="checkbox"
          checked={gentleVoice}
          onChange={(e) => setGentleVoice(e.target.checked)}
        />
        やさしい読み上げ（ゆっくりめ）
      </label>

      <label className="voice-panel__select">
        <span>日本語の声</span>
        <select
          value={voiceJaURI ?? ''}
          onChange={(e) => setVoiceJaURI(e.target.value || null)}
        >
          <option value="">自動（いちばん自然な声）</option>
          {jaVoices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="btn btn--ghost btn--wide" onClick={() => preview('ja')}>
        日本語をためす
      </button>

      <label className="voice-panel__select">
        <span>英語の声</span>
        <select
          value={voiceEnURI ?? ''}
          onChange={(e) => setVoiceEnURI(e.target.value || null)}
        >
          <option value="">自動（いちばん自然な声）</option>
          {enVoices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="btn btn--ghost btn--wide" onClick={() => preview('en')}>
        英語をためす
      </button>
    </section>
  )
}
