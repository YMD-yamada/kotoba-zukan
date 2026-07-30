import { useMemo, useState } from 'react'
import {
  buildAmazonCoverUrl,
  buildAmazonUrlForAsin,
  hasAffiliateTag,
  RECOMMENDED_BOOKS,
  type RecommendedBook,
} from '../lib/affiliate'

type PurposeId =
  | 'all'
  | 'first'
  | 'names'
  | 'talk'
  | 'outing'
  | 'english'
  | 'compact'
  | 'volume'

const PURPOSES: {
  id: PurposeId
  label: string
  pic: string
  hint: string
  match: (b: RecommendedBook) => boolean
}[] = [
  {
    id: 'all',
    label: 'すべて',
    pic: '📚',
    hint: '一覧で見比べる',
    match: () => true,
  },
  {
    id: 'first',
    label: 'はじめて',
    pic: '🌱',
    hint: '初めての一冊・入門',
    match: (b) => b.id === 'zukan415' || b.id === 'zukan1000',
  },
  {
    id: 'names',
    label: 'ものの名前',
    pic: '🦁',
    hint: 'どうぶつ・のりものなど',
    match: (b) => b.id === 'zukan1000' || b.id === 'zukan415' || b.id === 'zukan415plus',
  },
  {
    id: 'talk',
    label: '会話・あそび',
    pic: '💬',
    hint: 'あいさつ・気持ち・ゲーム',
    match: (b) => b.id === 'kotoba1500',
  },
  {
    id: 'outing',
    label: 'おでかけ',
    pic: '🚃',
    hint: '外出先のシーン',
    match: (b) => b.id === 'zukan415plus',
  },
  {
    id: 'english',
    label: '英語多め',
    pic: '🔤',
    hint: '英語のことばを増やしたい',
    match: (b) => b.id === 'english5000' || b.id === 'zukan1000',
  },
  {
    id: 'compact',
    label: 'コンパクト',
    pic: '📦',
    hint: '語数すくなめ（〜415）',
    match: (b) => b.id === 'zukan415' || b.id === 'zukan415plus',
  },
  {
    id: 'volume',
    label: 'たっぷり',
    pic: '📖',
    hint: '1000語以上・ボリューム',
    match: (b) => b.id === 'zukan1000' || b.id === 'kotoba1500' || b.id === 'english5000',
  },
]

function Cover({ asin, title }: { asin: string; title: string }) {
  const [failed, setFailed] = useState(false)
  const src = buildAmazonCoverUrl(asin)
  if (failed || !src) {
    return (
      <div className="book-cover book-cover--ph" aria-hidden>
        <span>📖</span>
      </div>
    )
  }
  return (
    <img
      className="book-cover"
      src={src}
      alt={`${title}の表紙`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

function BookCard({ book }: { book: RecommendedBook }) {
  return (
    <article className="book__card book__card--rich">
      <div className="book__row">
        <a
          href={buildAmazonUrlForAsin(book.asin)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          referrerPolicy="no-referrer"
          className="book-cover-link"
          aria-label={`${book.shortTitle}をAmazonで見る`}
        >
          <Cover asin={book.asin} title={book.shortTitle} />
        </a>
        <div className="book__info">
          <p className="book__pub">{book.publisher}</p>
          <h2>{book.shortTitle}</h2>
          <div className="book-tags" aria-label="特長">
            <span className="book-tag">{book.age}</span>
            <span className="book-tag">{book.words}</span>
            <span className="book-tag">{book.highlight}</span>
          </div>
          <p className="book__blurb">{book.blurb}</p>
          <p className="book__why">
            <strong>おすすめ:</strong> {book.bestFor}
          </p>
          <p className="book__scope">
            <strong>カバー範囲:</strong> {book.why}
          </p>
        </div>
      </div>
      <div className="book__actions">
        <a
          className="btn btn--primary"
          href={buildAmazonUrlForAsin(book.asin)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          referrerPolicy="no-referrer"
        >
          Amazonで見る
        </a>
        {book.publisherUrl && (
          <a
            className="btn btn--ghost"
            href={book.publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
          >
            出版社の紹介
          </a>
        )}
      </div>
      <p className="book__meta">ISBN {book.isbn}</p>
    </article>
  )
}

export function BookScreen() {
  const affiliate = hasAffiliateTag()
  const [purpose, setPurpose] = useState<PurposeId>('all')
  const active = PURPOSES.find((p) => p.id === purpose)!
  const filtered = useMemo(
    () => RECOMMENDED_BOOKS.filter((b) => active.match(b)),
    [active],
  )

  const pickHint =
    purpose === 'first'
      ? '初めてなら「ずかん415」か、定番の「1000」が選びやすいです。'
      : purpose === 'names'
        ? 'ものの名前中心なら「1000」。シーンごとなら「415＋」。'
        : purpose === 'talk'
          ? '会話・気持ち・ゲームなら「ことばずかん1500」が向いています。'
          : purpose === 'outing'
            ? 'おでかけシーンなら「415＋（おでかけ）」です。'
            : purpose === 'english'
              ? '英語を増やしたいなら「英語ことば図鑑5000」。触れる英語つきなら「1000」も候補です。'
              : purpose === 'compact'
                ? '少なめの語数で始めたいなら「415」シリーズ。'
                : purpose === 'volume'
                  ? '語数多めは「1000」「1500」「英語5000」です。'
                  : '目的のボタンを押すと、合いそうな本だけ残ります。'

  return (
    <section className="book">
      <h1>おすすめの本</h1>
      <p className="book__lead">
        このアプリはオリジナルです。紙のタッチペン図鑑を選ぶとき用に、目的・範囲で絞り込みます（非公式）。
      </p>

      <div className="book-guide">
        <h2 className="section-title">なにをしたい？</h2>
        <div className="book-purpose-grid" role="tablist" aria-label="目的で選ぶ">
          {PURPOSES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={purpose === p.id}
              className={`book-purpose${purpose === p.id ? ' is-on' : ''}`}
              onClick={() => setPurpose(p.id)}
            >
              <span className="book-purpose__pic" aria-hidden>
                {p.pic}
              </span>
              <span className="book-purpose__label">{p.label}</span>
              <span className="book-purpose__hint">{p.hint}</span>
            </button>
          ))}
        </div>
        <p className="book-guide__pick">{pickHint}</p>
      </div>

      <div className="book-compare" aria-label="本の比較">
        <h2 className="section-title">範囲のちがい</h2>
        <div className="book-compare__scroll">
          <table className="book-compare__table">
            <thead>
              <tr>
                <th>本</th>
                <th>むき</th>
                <th>ことば量</th>
                <th>おもな範囲</th>
              </tr>
            </thead>
            <tbody>
              {RECOMMENDED_BOOKS.map((b) => (
                <tr key={b.id} className={filtered.some((f) => f.id === b.id) ? '' : 'is-dim'}>
                  <td>{b.shortTitle}</td>
                  <td>{b.age}</td>
                  <td>{b.words}</td>
                  <td>{b.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="section-title">
        {active.pic} {active.label}（{filtered.length}冊）
      </h2>
      <div className="book__list">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="disclosure book__card">
        <h3>広告・アフィリエイト表示</h3>
        {affiliate ? (
          <p>
            当サイトは Amazon のアソシエイトとして適格販売により収入を得る場合があります。リンク経由の購入で価格が変わることはありません。
          </p>
        ) : (
          <p>
            現在、アフィリエイトタグは未設定のため、通常の商品リンクを表示しています。収益化する場合は
            <code>VITE_AMAZON_ASSOCIATE_TAG</code> を設定してください。
          </p>
        )}
        <p>
          表紙画像は販売サイト側の商品イメージです。年齢・語数は出版社案内に基づく目安です。公式提携はありません。
        </p>
      </div>
    </section>
  )
}
