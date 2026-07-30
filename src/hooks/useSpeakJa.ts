import { speakText } from '../lib/speech'
import { useAppStore } from '../store/useAppStore'

export function useSpeakJa() {
  const gentleVoice = useAppStore((s) => s.gentleVoice)
  const voiceJaURI = useAppStore((s) => s.voiceJaURI)
  return (text: string) =>
    speakText(text, 'ja', { gentle: gentleVoice, preferredVoiceURI: voiceJaURI })
}
