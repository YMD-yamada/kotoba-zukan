import { useMemo, useState } from 'react'

/**
 * おとなの入口。お子さんが買い物リンクや外部サイトへ進まないよう、
 * かんたんな足し算に答えた人だけ先へ進める（ことばが読めない幼児はまず通れない）。
 */
export function ParentGate({ onPass, onClose }: { onPass: () => void; onClose: () => void }) {
  const q = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 6)
    const b = 2 + Math.floor(Math.random() * 6)
    const answer = a + b
    const set = new Set<number>([answer])
    while (set.size < 4) set.add(answer + Math.floor(Math.random() * 9) - 4)
    const choices = [...set].filter((n) => n > 0).sort(() => Math.random() - 0.5)
    return { a, b, answer, choices }
  }, [])
  const [miss, setMiss] = useState(false)

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__card">
        <p className="gate__kicker">🔒 おとなの方へ</p>
        <h2 id="gate-title" className="gate__title">
          {q.a} たす {q.b} は？
        </h2>
        <p className="gate__lead">
          おすすめの本・設定・お問い合わせは、保護者の方向けのページにあります。答えを選ぶと開きます。
        </p>
        <div className="gate__choices">
          {q.choices.map((n) => (
            <button
              key={n}
              type="button"
              className="btn btn--ghost gate__choice"
              onClick={() => (n === q.answer ? onPass() : setMiss(true))}
            >
              {n}
            </button>
          ))}
        </div>
        {miss ? (
          <p className="gate__miss" role="status">
            ちがうみたい。もういちどえらんでね
          </p>
        ) : null}
        <button type="button" className="btn btn--secondary btn--wide" onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  )
}
