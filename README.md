# ちいさなことばずかん

**公開URL:** https://kotoba-zukan.vercel.app/

子ども向けオリジナルことば図鑑（Web / PWA）。タッチで日本語・英語を読み上げ、もじ練習・クイズ・あそび、オフライン利用に対応します。アカウント不要・個人情報のサーバー送信なし。

小学館『はじめてずかん1000』の公式アプリではありません。紙の図鑑は「おすすめの本」から正規販売ページへ紹介します（アフィリエイト可）。

## いますぐ使う

1. ブラウザで開く → https://kotoba-zukan.vercel.app/
2. 対応ブラウザなら「アプリをインストール」（PWA）でホーム画面追加・オフライン利用
3. Windows なら `npm run dist:win` で portable EXE（`release/`）

## 開発

```bash
npm install
npm run dev          # Web 開発
npm run build
npm run preview
npm run smoke
npm run electron:dev   # ローカル窓で開発
npm run dist:win       # Windows インストーラ / portable を release/ に出力
```

### アフィリエイト

```bash
cp .env.example .env
# VITE_AMAZON_ASSOCIATE_TAG=yourtag-22
```

詳細は [LEGAL.md](./LEGAL.md)。

## 技術

- Vite + React + TypeScript
- vite-plugin-pwa
- zustand（おきにいり等は localStorage）
- Web Speech API / Electron（Windows）
