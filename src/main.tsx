import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { warmUpVoices } from './lib/speech.ts'

warmUpVoices()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      {/* Electron（file://）では計測しない。Cookie なしの Vercel Web Analytics */}
      {location.protocol.startsWith('http') && <Analytics />}
    </ErrorBoundary>
  </StrictMode>,
)
