# CURSOR_HANDOFF — kotoba-zukan

更新: 2026-07-30

## 概要

子ども向けオリジナル図鑑 PWA「ちいさなことばずかん」。市販『はじめてずかん1000』に近い体験（カテゴリ・タッチ読み上げ・クイズ）を**独自コンテンツ**で実装。紙の本は Amazon / 出版社リンクで紹介（アフィリエイト可）。公式アプリではない。

## 正本パス

`C:\Users\cz7\Projects\kotoba-zukan`

## 状態（完成 v1）

- Vite + React + TS + PWA（オフライン可）
- 語彙 245 / 14 カテゴリ、日英 TTS（Web Speech）
- 画面: ホーム / ずかん / 詳細 / クイズ / すき / おすすめ本 / について
- 法務: LEGAL.md、非公式明示、アフィリエイト開示、タグ検証、CSP、.env gitignore
-  hardening: ErrorBoundary、TTS 二重読み対策、クイズ空プール、お気に入り戻り
- UI/UX: 大きなタッチターゲット、ブランド先行ホーム、focus-visible
- Windows ARM: `overrides.rollup` → `@rollup/wasm-node`
- スモーク: `npm run smoke` 通過

## 収益化（人間作業）

1. Amazonアソシエイト登録
2. `.env` に `VITE_AMAZON_ASSOCIATE_TAG=yourtag-22`
3. 公開時はホスティング側の子ども向けトラッキング（Vercel Analytics 等）を無効のまま

## 次の任意拡張

- 語彙を一般語のみで拡充（〜1000）
- Vercel デプロイ / personal-site・ポートフォリオ登録
- Google Fonts のセルフホスト（第三者接続削減）

## コマンド

`npm run dev` / `npm run build` / `npm run preview` / `npm run smoke`
