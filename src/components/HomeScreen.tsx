import type { CSSProperties } from 'react'
import { categories, TOTAL_WORDS } from '../data'
import { useAppStore } from '../store/useAppStore'
import type { Screen } from './NavBar'

export function HomeScreen({
  onNavigate,
}: {
  onNavigate: (s: Screen, opts?: { category?: string }) => void
}) {
  const heard = useAppStore((s) => s.heard)
  const favorites = useAppStore((s) => s.favorites)

  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__brand-row">
          <span className="home__mark" aria-hidden>
            📖
          </span>
          <h1 className="home__brand">ちいさなことばずかん</h1>
        </div>
        <p className="home__lead">タッチして、ことばをおぼえよう</p>
        <p className="home__sub">
          オリジナルの絵ことば図鑑。日本語と英語を読み上げます。ネットなしでも使えます。
        </p>
        <div className="home__cta">
          <button
            type="button"
            className="btn btn--primary btn--wide"
            onClick={() => onNavigate('browse')}
          >
            ずかんをひらく
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--wide"
            onClick={() => onNavigate('quiz')}
          >
            クイズであそぶ
          </button>
        </div>
      </div>

      <div className="home__stats" aria-label="進捗">
        <div>
          <strong>{heard.length}</strong>
          <span>きいたことば</span>
        </div>
        <div>
          <strong>{favorites.length}</strong>
          <span>おきにいり</span>
        </div>
        <div>
          <strong>{TOTAL_WORDS}</strong>
          <span>ぜんぶ</span>
        </div>
      </div>

      <h2 className="section-title">カテゴリー</h2>
      <div className="cat-grid">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="cat-card"
            style={{ '--cat': c.color } as CSSProperties}
            aria-label={`${c.label}のことばを見る`}
            onClick={() => onNavigate('browse', { category: c.id })}
          >
            <span className="cat-card__emoji" aria-hidden>
              {c.emoji}
            </span>
            <span className="cat-card__label">{c.label}</span>
          </button>
        ))}
      </div>

      <aside className="home__note">
        <p>
          本アプリは小学館の市販図鑑の公式アプリではありません。オリジナルの語彙と画面です。紙の図鑑がほしいときは
          <button type="button" className="linkish" onClick={() => onNavigate('book')}>
            おすすめの本
          </button>
          からどうぞ。
        </p>
      </aside>
    </section>
  )
}
