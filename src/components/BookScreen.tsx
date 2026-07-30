import { buildAmazonBookUrl, hasAffiliateTag, RECOMMENDED_BOOK } from '../lib/affiliate'

export function BookScreen() {
  const amazonUrl = buildAmazonBookUrl()
  const affiliate = hasAffiliateTag()

  return (
    <section className="book">
      <h1>おすすめの本</h1>
      <p className="book__lead">
        このアプリはオリジナルです。タッチペン付きの紙の図鑑でたくさん学びたいときは、定番の一冊を紹介します。
      </p>

      <article className="book__card">
        <p className="book__pub">{RECOMMENDED_BOOK.publisher}</p>
        <h2>{RECOMMENDED_BOOK.title}</h2>
        <p className="book__meta">ISBN {RECOMMENDED_BOOK.isbn}</p>
        <ul className="book__points">
          <li>写真とタッチペンでことばを学べる市販の図鑑です</li>
          <li>本アプリの内容・音声・画面とは別物です（非公式）</li>
          <li>実物の本・ペン体験が好きなお子さんにおすすめ</li>
        </ul>

        <div className="book__actions">
          <a
            className="btn btn--primary"
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            referrerPolicy="no-referrer"
          >
            Amazonで見る
          </a>
          <a
            className="btn btn--ghost"
            href={RECOMMENDED_BOOK.publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
          >
            出版社の紹介を見る
          </a>
        </div>

        <div className="disclosure">
          <h3>広告・アフィリエイト表示</h3>
          {affiliate ? (
            <p>
              当サイトは Amazon のアソシエイトとして適格販売により収入を得る場合があります。リンク経由の購入で価格が変わることはありません。
            </p>
          ) : (
            <p>
              現在、アフィリエイトタグは未設定のため、通常の商品リンクを表示しています。収益化する場合は
              <code>VITE_AMAZON_ASSOCIATE_TAG</code> を設定し、Amazonアソシエイト規約に従ってください。
            </p>
          )}
          <p>
            景品表示法に基づき、広告・PRである旨を明示しています。小学館および当該書籍との公式提携はありません。
          </p>
        </div>
      </article>
    </section>
  )
}
