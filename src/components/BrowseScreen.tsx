import { useMemo } from 'react'
import { categories, getWordsByCategory, searchWords } from '../data'
import type { CategoryId, WordEntry } from '../data/types'
import { useAppStore } from '../store/useAppStore'

export function BrowseScreen({ onOpenWord }: { onOpenWord: (w: WordEntry) => void }) {
  const category = useAppStore((s) => s.category)
  const query = useAppStore((s) => s.query)
  const setCategory = useAppStore((s) => s.setCategory)
  const setQuery = useAppStore((s) => s.setQuery)
  const heard = useAppStore((s) => s.heard)
  const favorites = useAppStore((s) => s.favorites)

  const list = useMemo(() => {
    const base = query.trim() ? searchWords(query) : getWordsByCategory(category)
    if (query.trim() && category !== 'all') {
      return base.filter((w) => w.category === category)
    }
    return base
  }, [category, query])

  return (
    <section className="browse">
      <header className="browse__head">
        <h1>ことばずかん</h1>
        <label className="search">
          <span className="sr-only">検索</span>
          <input
            type="search"
            placeholder="ことばをさがす（にほんご／英語）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            enterKeyHint="search"
          />
        </label>
      </header>

      <div className="chip-row" role="tablist" aria-label="カテゴリー">
        <button
          type="button"
          role="tab"
          aria-selected={category === 'all'}
          className={`chip${category === 'all' ? ' is-on' : ''}`}
          onClick={() => setCategory('all')}
        >
          すべて
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            className={`chip${category === c.id ? ' is-on' : ''}`}
            onClick={() => setCategory(c.id as CategoryId)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <p className="browse__count">{list.length} のことば</p>

      <div className="word-grid">
        {list.map((w) => (
          <button key={w.id} type="button" className="word-tile" onClick={() => onOpenWord(w)} aria-label={`${w.ja}（${w.en}）`}>
            <span className="word-tile__emoji" aria-hidden>
              {w.emoji}
            </span>
            <span className="word-tile__ja">{w.ja}</span>
            <span className="word-tile__en">{w.en}</span>
            <span className="word-tile__marks" aria-hidden>
              {favorites.includes(w.id) ? '♥' : ''}
              {heard.includes(w.id) ? '✓' : ''}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
