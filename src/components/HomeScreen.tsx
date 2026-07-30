import type { CSSProperties } from 'react'
import { categories, TOTAL_WORDS } from '../data'
import { useAppStore } from '../store/useAppStore'
import type { Screen } from './NavBar'
import { Mascot } from './Mascot'
import { CategoryArt } from './WordArt'

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
        <div className="home__stage">
          <Mascot className="home__mascot" />
          <div className="home__copy">
            <p className="home__kicker">オリジナルえほんずかん</p>
            <h1 className="home__brand">ちいさなことばずかん</h1>
            <p className="home__lead">タッチして、ことばがお話しするよ</p>
          </div>
        </div>
        <div className="home__cta">
          <button
            type="button"
            className="btn btn--primary btn--wide btn--bounce"
            onClick={() => onNavigate('browse')}
          >
            <span aria-hidden>📖 </span>ずかんをひらく
          </button>
          <button
            type="button"
            className="btn btn--secondary btn--wide"
            onClick={() => onNavigate('play')}
          >
            <span aria-hidden>🎮 </span>あそびコーナー
          </button>
        </div>
      </div>

      <div className="home__stats" aria-label="進捗">
        <div className="stat-sticker stat-sticker--a">
          <strong>{heard.length}</strong>
          <span>きいた</span>
        </div>
        <div className="stat-sticker stat-sticker--b">
          <strong>{favorites.length}</strong>
          <span>すき</span>
        </div>
        <div className="stat-sticker stat-sticker--c">
          <strong>{TOTAL_WORDS}</strong>
          <span>ぜんぶ</span>
        </div>
      </div>

      <h2 className="section-title">
        <span aria-hidden>✨</span> すきなばしょをタッチ
      </h2>
      <div className="cat-grid">
        {categories.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`cat-card cat-card--tilt-${(i % 3) + 1}`}
            style={{ '--cat': c.color } as CSSProperties}
            aria-label={`${c.label}のことばを見る`}
            onClick={() => onNavigate('browse', { category: c.id })}
          >
            <span className="cat-card__emoji" aria-hidden>
              <CategoryArt emoji={c.emoji} color={c.color} size={52} />
            </span>
            <span className="cat-card__label">{c.label}</span>
          </button>
        ))}
      </div>

      <aside className="home__note">
        <p>
          市販図鑑の公式アプリではありません。紙の図鑑は
          <button type="button" className="linkish" onClick={() => onNavigate('book')}>
            おすすめの本
          </button>
          から。こえの設定は「このアプリについて」へ。
        </p>
      </aside>
    </section>
  )
}
