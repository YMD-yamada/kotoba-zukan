import { useRef, useState } from 'react'
import type { CategoryId, WordEntry } from './data/types'
import { useAppStore } from './store/useAppStore'
import { NavBar, type Screen } from './components/NavBar'
import { HomeScreen } from './components/HomeScreen'
import { BrowseScreen } from './components/BrowseScreen'
import { WordScreen } from './components/WordScreen'
import { QuizScreen } from './components/QuizScreen'
import { FavoritesScreen } from './components/FavoritesScreen'
import { BookScreen } from './components/BookScreen'
import { AboutScreen } from './components/AboutScreen'
import { PlayHubScreen, type PlayId } from './components/PlayHubScreen'
import {
  DressPlayScreen,
  MusicPlayScreen,
  SoundQuizScreen,
  SoupPlayScreen,
} from './components/PlayScreens'
import { LettersScreen } from './components/LettersScreen'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selected, setSelected] = useState<WordEntry | null>(null)
  const wordBackRef = useRef<Screen>('browse')
  const setCategory = useAppStore((s) => s.setCategory)

  const navigate = (next: Screen, opts?: { category?: string }) => {
    if (opts?.category) {
      setCategory(opts.category as CategoryId)
    }
    setSelected(null)
    setScreen(next)
  }

  const openWord = (w: WordEntry, from: Screen = 'browse') => {
    wordBackRef.current = from
    setSelected(w)
    setScreen('word')
  }

  const closeWord = () => {
    setSelected(null)
    setScreen(wordBackRef.current)
  }

  const openPlay = (id: PlayId) => {
    setScreen(id)
  }

  const backToPlay = () => setScreen('play')

  return (
    <div className="app-shell">
      <div className="app-bg" aria-hidden />
      <main className="app-main">
        {screen === 'home' && <HomeScreen onNavigate={navigate} />}
        {screen === 'browse' && <BrowseScreen onOpenWord={(w) => openWord(w, 'browse')} />}
        {screen === 'word' &&
          (selected ? (
            <WordScreen word={selected} onBack={closeWord} />
          ) : (
            <section className="empty">
              <p>ことばが見つかりませんでした。</p>
              <button type="button" className="btn btn--ghost" onClick={() => setScreen('browse')}>
                ずかんにもどる
              </button>
            </section>
          ))}
        {screen === 'play' && <PlayHubScreen onOpen={openPlay} />}
        {screen === 'quiz' && (
          <section>
            <button type="button" className="back" onClick={backToPlay}>
              ← あそびにもどる
            </button>
            <QuizScreen />
          </section>
        )}
        {screen === 'sound' && <SoundQuizScreen onBack={backToPlay} />}
        {screen === 'soup' && <SoupPlayScreen onBack={backToPlay} />}
        {screen === 'dress' && <DressPlayScreen onBack={backToPlay} />}
        {screen === 'music' && <MusicPlayScreen onBack={backToPlay} />}
        {screen === 'letters' && <LettersScreen onBack={backToPlay} />}
        {screen === 'favorites' && (
          <FavoritesScreen onOpenWord={(w) => openWord(w, 'favorites')} />
        )}
        {screen === 'book' && <BookScreen />}
        {screen === 'about' && <AboutScreen />}
      </main>
      {screen !== 'word' && (
        <NavBar
          screen={screen === 'about' ? 'home' : screen}
          onNavigate={navigate}
        />
      )}
      <footer className="app-foot">
        <button type="button" className="linkish" onClick={() => navigate('about')}>
          このアプリについて・権利表示
        </button>
        <nav className="app-foot__legal" aria-label="ほうりつ">
          <a
            className="btn btn--ghost btn--legal"
            href="https://ymd-portfolio-site.pages.dev/legal/privacy"
            rel="noopener noreferrer"
          >
            プライバシー
          </a>
          <a
            className="btn btn--secondary btn--legal"
            href="https://ymd-portfolio-site.pages.dev/legal/terms"
            rel="noopener noreferrer"
          >
            やくそく
          </a>
          <a
            className="btn btn--ghost btn--legal"
            href="https://ymd-portfolio-site.pages.dev/legal/support"
            rel="noopener noreferrer"
          >
            サポート
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default App
