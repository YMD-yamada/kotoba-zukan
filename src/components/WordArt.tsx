import type { CSSProperties } from 'react'
import type { CategoryId, WordEntry } from '../data/types'

const FRAME: Record<CategoryId, string> = {
  animals: '#f4a261',
  birds: '#4cc9f0',
  bugs: '#90be6d',
  sea: '#48cae4',
  vehicles: '#ef476f',
  food: '#ffb703',
  fruitveg: '#06d6a0',
  body: '#ff8fab',
  home: '#c9b6e4',
  nature: '#52b788',
  play: '#fb8500',
  colors: '#5dade2',
  feelings: '#f78fb3',
  places: '#5b8def',
}

/**
 * 図鑑の絵：分かる絵文字＋カテゴリ色のオリジナル枠。
 * 抽象図形だけだと「いぬ」が犬に見えない問題が起きるため。
 */
export function WordArt({
  word,
  size = 96,
  className = '',
}: {
  word: WordEntry
  size?: number
  className?: string
}) {
  const stroke = FRAME[word.category] ?? '#2aa89a'
  const fontSize = Math.round(size * 0.52)

  return (
    <div
      className={`word-art ${className}`}
      style={{ width: size, height: size, '--frame': stroke } as CSSProperties}
      role="img"
      aria-label={word.ja}
    >
      <span className="word-art__emoji" style={{ fontSize }} aria-hidden>
        {word.emoji}
      </span>
    </div>
  )
}

export function CategoryArt({
  emoji,
  color,
  size = 56,
}: {
  emoji: string
  color: string
  size?: number
}) {
  return (
    <div
      className="word-art word-art--cat"
      style={{ width: size, height: size, '--frame': color } as CSSProperties}
      aria-hidden
    >
      <span className="word-art__emoji" style={{ fontSize: Math.round(size * 0.5) }}>
        {emoji}
      </span>
    </div>
  )
}
