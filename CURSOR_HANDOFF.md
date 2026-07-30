# CURSOR_HANDOFF — kotoba-zukan

更新: 2026-07-30

## 概要

子ども向けオリジナル図鑑 PWA／Windows アプリ「ちいさなことばずかん」。市販タッチペン図鑑に近い体験を独自コンテンツで実装。

## 正本

`C:\Users\cz7\Projects\kotoba-zukan`

## 公開

- Web: https://kotoba-zukan.vercel.app
- Store hub / Portfolio: 掲載済（要約更新済）
- Windows: `npm run dist:win` → `release/ちいさなことばずかん-1.1.0-x64.exe`（portable）

## 機能

- 語彙 245・分かる絵（絵文字）＋オリジナル枠
- TTS（Neural 優先）・声設定
- もじ: 文字＋絵＋ことば（あ＝あり）で対応づけ学習
- 本選び: 目的フィルタ（はじめて／名前／会話／おでかけ／英語／語数）＋比較表
- Electron ローカルアプリ

## コマンド

`npm run dev` / `npm run smoke` / `npm run electron:dev` / `npm run dist:win`
