export type CategoryId =
  | 'animals'
  | 'birds'
  | 'bugs'
  | 'sea'
  | 'vehicles'
  | 'food'
  | 'fruitveg'
  | 'body'
  | 'home'
  | 'nature'
  | 'play'
  | 'colors'
  | 'feelings'
  | 'places'

export type WordEntry = {
  id: string
  ja: string
  jaReading?: string
  en: string
  emoji: string
  category: CategoryId
}

export type Category = {
  id: CategoryId
  label: string
  emoji: string
  color: string
}
