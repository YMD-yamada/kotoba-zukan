import type { CSSProperties } from 'react'

export type PlayId = 'quiz' | 'sound' | 'soup' | 'dress' | 'music' | 'letters'

const PLAYS: { id: PlayId; title: string; desc: string; tint: string; picture: string }[] = [
  { id: 'letters', title: 'もじれんしゅう', desc: 'あいうえお・ABC', tint: '#2aa89a', picture: '✏️' },
  { id: 'quiz', title: 'なにのことば？', desc: 'えをみてえらぶ', tint: '#f4a261', picture: '🃏' },
  { id: 'sound', title: 'おとあて', desc: 'おとをきいてえらぶ', tint: '#4cc9f0', picture: '👂' },
  { id: 'soup', title: 'スープをつくろう', desc: 'やさいをいれる', tint: '#ffb703', picture: '🥣' },
  { id: 'dress', title: 'おきがえしよう', desc: 'ふくをきる', tint: '#ff6b6b', picture: '👕' },
  { id: 'music', title: 'えんそうしよう', desc: 'がっきであそぶ', tint: '#f78fb3', picture: '🎵' },
]

export function PlayHubScreen({
  onOpen,
}: {
  onOpen: (id: PlayId) => void
}) {
  return (
    <section className="play-hub">
      <h1>あそびコーナー</h1>
      <p className="play-hub__lead">大きな絵をタッチしてあそぼう</p>
      <div className="play-hub__grid">
        {PLAYS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="play-card play-card--pic"
            style={{ '--tint': p.tint } as CSSProperties}
            onClick={() => onOpen(p.id)}
            aria-label={p.title}
          >
            <span className="play-card__pic" aria-hidden>
              {p.picture}
            </span>
            <span className="play-card__title">{p.title}</span>
            <span className="play-card__desc">{p.desc}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
