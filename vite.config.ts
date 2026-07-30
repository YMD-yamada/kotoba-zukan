import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'ちいさなことばずかん',
        short_name: 'ことばずかん',
        description: 'こども向けオリジナルことば図鑑。タッチで日本語・英語の読み上げ。オフラインでも使えます。',
        theme_color: '#2f9e8f',
        background_color: '#fff8ef',
        display: 'standalone',
        lang: 'ja',
        start_url: '/',
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
        navigateFallback: '/index.html',
      },
    }),
  ],
})
