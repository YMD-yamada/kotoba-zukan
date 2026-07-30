let speakToken = 0
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null

export type SpeakLang = 'ja' | 'en'

const NATURAL_BONUS =
  /neural|natural|online|premium|enhanced|wavenet|studio|journey|generative|super|one|nanami|haruka|ayumi|ichiro|keita|samantha|karen|moira|kyoko|otoya|google\s*日本語|microsoft\s*(nanami|haruka|ayumi)/i

const LOCAL_PENALTY = /compact|eloquence|espeak|festival|robot|microsoft\s+david|microsoft\s+zira|microsoft\s+mark/i

function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([])
  }
  if (!voicesReady) {
    voicesReady = new Promise((resolve) => {
      const read = () => window.speechSynthesis.getVoices()
      const now = read()
      if (now.length > 0) {
        resolve(now)
        return
      }
      const done = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', done)
        resolve(read())
      }
      window.speechSynthesis.addEventListener('voiceschanged', done)
      window.setTimeout(() => resolve(read()), 800)
    })
  }
  return voicesReady
}

/** アプリ起動時に呼び、Neural 声の読み込みを促す */
export function warmUpVoices(): void {
  void ensureVoices()
}

function scoreVoice(v: SpeechSynthesisVoice, lang: SpeakLang): number {
  const langL = v.lang.toLowerCase()
  const prefix = lang === 'ja' ? 'ja' : 'en'
  if (!langL.startsWith(prefix)) return -1000

  let score = 10
  if (lang === 'ja' && langL.includes('jp')) score += 8
  if (lang === 'en' && (langL.includes('us') || langL.includes('gb'))) score += 5
  if (NATURAL_BONUS.test(v.name)) score += 40
  if (/google/i.test(v.name)) score += 18
  if (/microsoft/i.test(v.name)) score += 12
  if (/apple|siri|kyoko|otoya/i.test(v.name)) score += 14
  if (v.localService === false) score += 22
  if (LOCAL_PENALTY.test(v.name)) score -= 35
  if (/female|woman|girl|nanami|haruka|ayumi|kyoko|samantha|karen|zira|aria|jenny|sonia/i.test(v.name)) {
    score += 10
  }
  return score
}

export function listVoicesFor(lang: SpeakLang): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  return window.speechSynthesis
    .getVoices()
    .filter((v) => scoreVoice(v, lang) > -500)
    .sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))
}

function pickVoice(
  lang: SpeakLang,
  preferredURI?: string | null,
): SpeechSynthesisVoice | null {
  const voices = typeof window !== 'undefined' ? window.speechSynthesis.getVoices() : []
  if (voices.length === 0) return null
  if (preferredURI) {
    const preferred = voices.find((v) => v.voiceURI === preferredURI)
    if (preferred && scoreVoice(preferred, lang) > -500) return preferred
  }
  const ranked = [...voices].sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))
  return ranked[0] && scoreVoice(ranked[0], lang) > -500 ? ranked[0] : null
}

function softBlip(): void {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(660, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.14)
    window.setTimeout(() => void ctx.close(), 200)
  } catch {
    // ignore
  }
}

export type SpeakOptions = {
  preferredVoiceURI?: string | null
  gentle?: boolean
  withBlip?: boolean
}

export function speakText(text: string, lang: SpeakLang, options: SpeakOptions = {}): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const token = ++speakToken
  window.speechSynthesis.cancel()

  const gentle = options.gentle !== false
  const utter = new SpeechSynthesisUtterance(text.trim())
  utter.lang = lang === 'ja' ? 'ja-JP' : 'en-US'
  utter.rate = gentle ? (lang === 'ja' ? 0.84 : 0.88) : lang === 'ja' ? 0.94 : 0.96
  utter.pitch = gentle ? (lang === 'ja' ? 1.12 : 1.08) : 1.02
  utter.volume = 1

  let started = false
  const run = () => {
    if (token !== speakToken || started) return
    started = true
    const voice = pickVoice(lang, options.preferredVoiceURI)
    if (voice) {
      utter.voice = voice
      if (/neural|natural|online/i.test(voice.name)) {
        utter.rate = gentle ? (lang === 'ja' ? 0.9 : 0.92) : 0.96
        utter.pitch = gentle ? 1.06 : 1.0
      }
    }
    if (options.withBlip !== false) softBlip()
    window.setTimeout(() => {
      if (token !== speakToken) return
      window.speechSynthesis.speak(utter)
    }, 50)
  }

  void ensureVoices().then(run)
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

export function bestVoiceLabel(lang: SpeakLang): string {
  const v = pickVoice(lang)
  return v?.name ?? '（端末の標準）'
}
