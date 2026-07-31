# CURSOR_HANDOFF — kotoba-zukan

更新: 2026-07-30（公開強化）

## 概要

子ども向けオリジナル図鑑 PWA／Windows アプリ「ちいさなことばずかん」。市販タッチペン図鑑に近い体験を独自コンテンツで実装。

## 正本

`C:\Users\cz7\Projects\kotoba-zukan`

## 公開

- Web: https://kotoba-zukan.vercel.app/
- GitHub: https://github.com/YMD-yamada/kotoba-zukan （homepage / topics 設定済）
- Store hub / Portfolio: 掲載・説明更新済（ポートフォリオ先頭寄せ）
- OG/Twitter・robots・sitemap 追加済（`/og.png`）
- Windows: `npm run dist:win` → `release/`（portable）

## 機能

- 語彙 245・分かる絵（絵文字）＋オリジナル枠
- TTS（Neural 優先）・声設定
- もじ: 文字＋絵＋ことば（あ＝あり）で対応づけ学習
- 本選び: 目的フィルタ＋比較表
- Electron ローカルアプリ

## Monetization

- Stub: `MONETIZATION.md`（Affiliate/Tips。子ども向け広告なし）
- 収益優先 #2（`33_Tasks/RELEASE_SNS_PRIORITY.md`）
- Draft: `33_Tasks/publish-drafts/kotoba-zukan.md`

## 拡散メモ

- 共有用URLは本番のみ（相対 base でも OG は絶対URL）
- SNS/親向けコミュニティへの投稿は人間側（エージェントは掲載・SEOまで）

## コマンド

`npm run dev` / `npm run smoke` / `npm run electron:dev` / `npm run dist:win`
