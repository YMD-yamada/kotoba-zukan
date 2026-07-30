import type { CategoryId, WordEntry } from './types'
import { words } from './words'
import { categories } from './categories'

export { words, categories }
export type { CategoryId, WordEntry }

export function getWordsByCategory(categoryId: CategoryId | 'all'): WordEntry[] {
  if (categoryId === 'all') return words
  return words.filter((w) => w.category === categoryId)
}

export function getWordById(id: string): WordEntry | undefined {
  return words.find((w) => w.id === id)
}

export function searchWords(query: string): WordEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return words
  return words.filter(
    (w) =>
      w.ja.includes(q) ||
      w.en.toLowerCase().includes(q) ||
      (w.jaReading?.includes(q) ?? false),
  )
}

export const TOTAL_WORDS = words.length
