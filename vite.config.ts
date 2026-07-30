import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Electron file:// 読み込み用。Web デプロイでは Vercel が相対パスで問題なし
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og.png'],
      manifest: {
        name: 'ちいさなことばずかん',
        short_name: 'ことばずかん',
        description:
          'こども向けオリジナルことば図鑑。タッチで読み上げ、もじ練習、クイズ。オフラインでも使えます。',
        theme_color: '#5bb8e8',
        background_color: '#9ad7f5',
        display: 'standalone',
        lang: 'ja',
        start_url: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
})
