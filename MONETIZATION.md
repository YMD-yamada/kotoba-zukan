# Monetization — ちいさなことばずかん (kotoba-zukan)

> テンプレ元: `DevHub/_standards/templates/MONETIZATION.md`  
> **本物のキーを invent しない。** 子ども向けのためデータ収集・広告は慎重。

更新: 2026-07-30

## Chosen pattern（1つ以上）

- [x] Affiliate（Amazon 等・人間がタグ投入後）
- [ ] Tips / sponsorship
- [ ] IAP (App Store / Play)
- [ ] Ads（子ども向けでは原則避ける / ホスティング解析も原則無効維持）
- [ ] Freemium / Stripe Checkout
- [ ] Other: ___

## Status

- Implementation: スタブ / フラグ OFF（タグ未設定時はアフィリエイト非表示でよい）
- Feature flag: `MONETIZATION_ENABLED=false` 相当（アフィリエイトタグ未設定＝無効）
- UI stub: 本選び比較など既存導線に「紹介リンク」枠を将来接続
- 本番: https://kotoba-zukan.vercel.app （公開済・HP掲載済）

## Cost vs revenue

| 項目 | 見積（月） | メモ |
|---|---|---|
| Hosting | ¥0 (Vercel free) | |
| External APIs | ¥0 | TTS は端末/ブラウザ優先 |
| Store fees | 将来 Windows/ストア時 | |
| **Total cost** | ¥0 | |
| **Revenue plan** | 関連書籍アフィリエイト → 任意 Tips | 子ども向け広告は使わない方針 |

## Env placeholders

```env
MONETIZATION_ENABLED=false
# AMAZON_ASSOCIATE_TAG=
```

## Checklist before paid dependency

- [ ] User approved any paid spend
- [x] Monetization path documented
- [ ] HANDOFF Monetization 節を更新（タグ投入時）
- [x] No secrets committed
- [x] Kids privacy: 解析は原則無効のまま

## Next (agent)

1. publish-drafts 維持（再告知用）
2. 人間がアソシエイトタグを入れたら UI 接続
3. ShortSync Product 登録は P2 で
