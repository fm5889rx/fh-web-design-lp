# FH WEB DESIGN 公式サイト

屋号「FH WEB DESIGN」の公式サイトです（現在は『RePace』開発中の案内ページを公開中）。
https://fh-web-design.com

## 技術スタック

- Next.js (App Router) / React / TypeScript / Tailwind CSS
- Cloudflare Workers（[OpenNext](https://opennext.js.org/cloudflare) アダプター）
- お問い合わせメール: [Resend](https://resend.com)（受信は Cloudflare Email Routing）

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run preview    # Cloudflare Workers 実行環境でのローカル確認
```

お問い合わせフォームのメール送信を試す場合は、`.env.example` を参考に `.dev.vars`（Git 管理外）へ `RESEND_API_KEY` を設定します。

## デプロイ

Cloudflare Workers（Workers Builds）で GitHub 連携によるビルド・デプロイを行います。

- ビルド: `npx opennextjs-cloudflare build`
- デプロイ: `npx opennextjs-cloudflare deploy`
- 実行時シークレット: `RESEND_API_KEY`（任意: `CONTACT_TO` / `CONTACT_FROM`）

フォームのスパム対策として、`wrangler.jsonc` の Rate Limiting（IP ごと・宛先アドレスごと）とハニーポットを設定しています。
