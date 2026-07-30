import { TOTAL_WORDS } from '../data'
import { VoicePanel } from './VoicePanel'

export function AboutScreen() {
  return (
    <section className="about">
      <h1>このアプリについて</h1>
      <VoicePanel />
      <div className="about__block">
        <h2>できること</h2>
        <ul>
          <li>オリジナル語彙（現在 {TOTAL_WORDS} 語）をカテゴリーで見る</li>
          <li>タッチで日本語・英語を読み上げ（端末の音声機能）</li>
          <li>あそびコーナー（もじれんしゅう・クイズ・おとあて・スープ・おきがえ・えんそう）</li>
          <li>おすすめの類似市販本への紹介リンク</li>
          <li>Windows 向けローカルアプリ（Electron）としても起動可</li>
        </ul>
      </div>
      <div className="about__block">
        <h2>対象・保護者の方へ</h2>
        <p>
          幼児〜低学年向けの学習補助です。アカウント登録は不要で、お子さんの氏名・年齢・位置情報などは取得しません。
        </p>
      </div>
      <div className="about__block">
        <h2>法律・権利について</h2>
        <ul>
          <li>市販図鑑の写真・文章・音声・レイアウトは使用していません</li>
          <li>「はじめてずかん」等の商標をアプリ名にしていません</li>
          <li>絵文字は端末標準の表示であり、書籍のイラストの代替ではありません</li>
          <li>おすすめ本のリンクは紹介目的です。小学館・当該書籍の公式アプリではありません</li>
          <li>Amazon リンクはアフィリエイト（紹介報酬）の場合があります。詳細は「おすすめの本」画面に表示します</li>
        </ul>
      </div>
      <div className="about__block">
        <h2>プライバシー</h2>
        <ul>
          <li>おきにいり・進捗・声の設定はブラウザの localStorage にだけ保存され、この端末から外に送りません</li>
          <li>アクセス解析・広告 SDK・行動トラッキング・ソーシャルログインは組み込んでいません</li>
          <li>音声は端末内の Web Speech API（読み上げ）のみ使用します</li>
          <li>
            見出しフォント取得のため Google Fonts へ接続します。フォント配信以外の目的で利用者を追跡する仕組みは入れていません
          </li>
          <li>外部サイト（Amazon・出版社）へ移動すると、各サイトのプライバシーポリシーが適用されます</li>
        </ul>
      </div>
    </section>
  )
}
