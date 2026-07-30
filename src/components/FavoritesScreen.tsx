import { getWordById } from '../data'
import type { WordEntry } from '../data/types'
import { useAppStore } from '../store/useAppStore'
import { WordArt } from './WordArt'

export function FavoritesScreen({ onOpenWord }: { onOpenWord: (w: WordEntry) => void }) {
  const favorites = useAppStore((s) => s.favorites)
  const items = favorites.map((id) => getWordById(id)).filter(Boolean) as WordEntry[]

  return (
    <section className="browse">
      <header className="browse__head">
        <h1>すきなことば</h1>
        <p className="browse__count">{items.length} こ</p>
      </header>
      {items.length === 0 ? (
        <p className="empty">まだすきがありません。ずかんで ♥ をつけてみよう。</p>
      ) : (
        <div className="word-grid">
          {items.map((w) => (
            <button key={w.id} type="button" className="word-tile" onClick={() => onOpenWord(w)}>
              <WordArt word={w} size={72} className="word-tile__art" />
              <span className="word-tile__ja">{w.ja}</span>
              <span className="word-tile__en">{w.en}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
