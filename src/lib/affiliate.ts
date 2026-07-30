export type RecommendedBook = {
  id: string
  title: string
  shortTitle: string
  publisher: string
  asin: string
  isbn: string
  blurb: string
  why: string
  age: string
  words: string
  highlight: string
  bestFor: string
  publisherUrl?: string
}

/** 市販の類似・関連図鑑（紹介のみ。アプリは非公式・コンテンツ非複製） */
export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  {
    id: 'zukan1000',
    title: 'タッチペンで音が聞ける！はじめてずかん1000 英語つき',
    shortTitle: 'はじめてずかん1000',
    publisher: '小学館',
    asin: '4099416771',
    isbn: '978-4-09-941677-5',
    blurb: '身近なものの名前を写真とタッチペンで学べる定番。',
    why: 'ものの名前をたくさん覚えたいとき',
    age: '0歳〜小学校入学前',
    words: '約1000語',
    highlight: '写真＋タッチペン＋英語',
    bestFor: 'ものの名前デビュー',
    publisherUrl: 'https://www.shogakukan.co.jp/news/438069',
  },
  {
    id: 'kotoba1500',
    title: 'タッチペンでいっぱいあそべる！まいにちのことばずかん1500 英語つき',
    shortTitle: 'まいにちのことばずかん1500',
    publisher: '小学館',
    asin: '4099425207',
    isbn: '978-4-09-942520-3',
    blurb: 'あいさつや気持ちなど、毎日のことばと遊びページが豊富。',
    why: '会話やゲーム多めがほしいとき',
    age: '0〜1歳〜小学校入学前',
    words: '約1500語',
    highlight: '遊び・クイズ多め',
    bestFor: '会話・気持ちのことば',
    publisherUrl: 'https://www.shogakukan.co.jp/books/09942520',
  },
  {
    id: 'zukan415plus',
    title: 'はじめてずかん415 +ぷらす 英語つき（おでかけだいすき！）',
    shortTitle: 'ずかん415＋（おでかけ）',
    publisher: '小学館',
    asin: '4092535872',
    isbn: '978-4-09-253587-9',
    blurb: 'おでかけ先のシーンでことばを学べる写真図鑑。',
    why: 'おでかけ・季節のことばを増やしたいとき',
    age: '1歳〜小学校入学前',
    words: '約415語',
    highlight: 'おでかけシーン中心',
    bestFor: '外出先のことば',
    publisherUrl: 'https://www.shogakukan.co.jp/news/164995',
  },
  {
    id: 'zukan415',
    title: 'はじめてずかん415 英語つき',
    shortTitle: 'ずかん415',
    publisher: '小学館',
    asin: '4092535791',
    isbn: '978-4-09-253579-4',
    blurb: 'シリーズ入口として扱いやすい写真ずかん。',
    why: 'はじめての一冊・コンパクトに始めたいとき',
    age: '0歳〜小学校入学前',
    words: '約415語',
    highlight: 'コンパクト入門',
    bestFor: '初めての図鑑',
    publisherUrl: 'https://kotobanomado.jp/dictionaries/1453/',
  },
  {
    id: 'english5000',
    title: '音で学べる！英語ことば図鑑5000 タッチペンつき',
    shortTitle: '英語ことば図鑑5000',
    publisher: '小学館',
    asin: '4099425088',
    isbn: '978-4-09-942508-1',
    blurb: '英語語彙をたっぷり触れるタッチペン図鑑。',
    why: '英語のことばを増やしたいとき',
    age: '幼児〜小学生',
    words: '約5000語',
    highlight: '英語ボリューム大',
    bestFor: '英語に慣らしたい',
    publisherUrl: 'https://www.shogakukan.co.jp/books/09942508',
  },
]

export const RECOMMENDED_BOOK = RECOMMENDED_BOOKS[0]

const ASSOCIATE_TAG_RE = /^[a-zA-Z0-9-]{1,64}$/

function sanitizeAssociateTag(raw?: string): string {
  const tag = (raw ?? import.meta.env.VITE_AMAZON_ASSOCIATE_TAG ?? '').trim()
  if (!tag || !ASSOCIATE_TAG_RE.test(tag)) return ''
  return tag
}

export function buildAmazonUrlForAsin(asin: string, associateTag?: string): string {
  const safeAsin = /^[A-Z0-9]{10}$/i.test(asin) ? asin : ''
  if (!safeAsin) return 'https://www.amazon.co.jp/'
  const url = new URL(`https://www.amazon.co.jp/dp/${safeAsin}`)
  const tag = sanitizeAssociateTag(associateTag)
  if (tag) url.searchParams.set('tag', tag)
  return url.toString()
}

/** Amazon の商品画像（表紙イメージ）。リンク切れ時はUI側でプレースホルダ表示 */
export function buildAmazonCoverUrl(asin: string): string {
  const safeAsin = /^[A-Z0-9]{10}$/i.test(asin) ? asin.toUpperCase() : ''
  if (!safeAsin) return ''
  return `https://images-na.ssl-images-amazon.com/images/P/${safeAsin}.01.LZZZZZZZ.jpg`
}

export function buildAmazonBookUrl(associateTag?: string): string {
  return buildAmazonUrlForAsin(RECOMMENDED_BOOKS[0].asin, associateTag)
}

export function hasAffiliateTag(): boolean {
  return Boolean(sanitizeAssociateTag())
}
