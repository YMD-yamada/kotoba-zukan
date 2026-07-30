import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CategoryId } from '../data/types'

type AppState = {
  favorites: string[]
  heard: string[]
  category: CategoryId | 'all'
  query: string
  englishOn: boolean
  gentleVoice: boolean
  voiceJaURI: string | null
  voiceEnURI: string | null
  toggleFavorite: (id: string) => void
  markHeard: (id: string) => void
  setCategory: (id: CategoryId | 'all') => void
  setQuery: (q: string) => void
  setEnglishOn: (on: boolean) => void
  setGentleVoice: (on: boolean) => void
  setVoiceJaURI: (uri: string | null) => void
  setVoiceEnURI: (uri: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      heard: [],
      category: 'all',
      query: '',
      englishOn: true,
      gentleVoice: true,
      voiceJaURI: null,
      voiceEnURI: null,
      toggleFavorite: (id) => {
        const cur = get().favorites
        set({
          favorites: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        })
      },
      markHeard: (id) => {
        const cur = get().heard
        if (!cur.includes(id)) set({ heard: [...cur, id] })
      },
      setCategory: (category) => set({ category }),
      setQuery: (query) => set({ query }),
      setEnglishOn: (englishOn) => set({ englishOn }),
      setGentleVoice: (gentleVoice) => set({ gentleVoice }),
      setVoiceJaURI: (voiceJaURI) => set({ voiceJaURI }),
      setVoiceEnURI: (voiceEnURI) => set({ voiceEnURI }),
    }),
    {
      name: 'kotoba-zukan-v1',
      partialize: (s) => ({
        favorites: s.favorites,
        heard: s.heard,
        englishOn: s.englishOn,
        gentleVoice: s.gentleVoice,
        voiceJaURI: s.voiceJaURI,
        voiceEnURI: s.voiceEnURI,
      }),
    },
  ),
)
