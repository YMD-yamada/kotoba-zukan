/** 小学館「タッチペンで音が聞ける！はじめてずかん1000 英語つき」への紹介リンク（公式商品） */
export const RECOMMENDED_BOOK = {
  title: 'タッチペンで音が聞ける！はじめてずかん1000 英語つき',
  publisher: '小学館',
  asin: '4099416771',
  isbn: '978-4-09-941677-5',
  /** 公式告知（非アフィリエイト） */
  publisherUrl: 'https://www.shogakukan.co.jp/news/438069',
} as const

const AMAZON_DP = `https://www.amazon.co.jp/dp/${RECOMMENDED_BOOK.asin}`

/** AmazonアソシエイトID（英数字とハイフンのみ。URL注入防止） */
const ASSOCIATE_TAG_RE = /^[a-zA-Z0-9-]{1,64}$/

function sanitizeAssociateTag(raw?: string): string {
  const tag = (raw ?? import.meta.env.VITE_AMAZON_ASSOCIATE_TAG ?? '').trim()
  if (!tag || !ASSOCIATE_TAG_RE.test(tag)) return ''
  return tag
}

/**
 * Amazonアソシエイトリンクを組み立てる。
 * タグ未設定・形式不正時は通常の商品ページ（トラッキングなし）を返す。
 * 利用時は Amazonアソシエイト・プログラム運営規約と景表法の表示義務に従うこと。
 */
export function buildAmazonBookUrl(associateTag?: string): string {
  const tag = sanitizeAssociateTag(associateTag)
  if (!tag) return AMAZON_DP
  const url = new URL(AMAZON_DP)
  url.searchParams.set('tag', tag)
  return url.toString()
}

export function hasAffiliateTag(): boolean {
  return Boolean(sanitizeAssociateTag())
}
