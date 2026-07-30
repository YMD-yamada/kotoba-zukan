let speakToken = 0

export type SpeakLang = 'ja' | 'en'

function pickVoice(lang: SpeakLang): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  const prefix = lang === 'ja' ? 'ja' : 'en'
  const prefer =
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix) && /google|microsoft|apple/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  return prefer ?? null
}

export function speakText(text: string, lang: SpeakLang): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const token = ++speakToken
  window.speechSynthesis.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang === 'ja' ? 'ja-JP' : 'en-US'
  utter.rate = lang === 'ja' ? 0.92 : 0.95
  utter.pitch = 1.05
  const voice = pickVoice(lang)
  if (voice) utter.voice = voice

  let started = false
  const run = () => {
    if (token !== speakToken || started) return
    started = true
    window.speechSynthesis.speak(utter)
  }

  // Some browsers populate voices asynchronously
  if (window.speechSynthesis.getVoices().length === 0) {
    const onVoices = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices)
      run()
    }
    window.speechSynthesis.addEventListener('voiceschanged', onVoices)
    // Fallback in case event never fires (guarded by `started`)
    window.setTimeout(run, 250)
  } else {
    run()
  }
}

export function stopSpeaking(): void {
  speakToken += 1
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
