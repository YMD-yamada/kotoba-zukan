export type Screen =
  | 'home'
  | 'browse'
  | 'word'
  | 'play'
  | 'quiz'
  | 'sound'
  | 'soup'
  | 'dress'
  | 'music'
  | 'letters'
  | 'favorites'
  | 'book'
  | 'about'

export function NavBar({
  screen,
  onNavigate,
}: {
  screen: Screen
  onNavigate: (s: Screen) => void
}) {
  const playActive = ['play', 'quiz', 'sound', 'soup', 'dress', 'music', 'letters'].includes(screen)
  const items: { id: Screen; label: string; icon: string; active?: boolean }[] = [
    { id: 'home', label: 'ホーム', icon: '🏠' },
    { id: 'browse', label: 'ずかん', icon: '📖' },
    { id: 'play', label: 'あそび', icon: '🎮', active: playActive },
    { id: 'favorites', label: 'すき', icon: '❤️' },
    { id: 'book', label: 'ほん', icon: '🛍️' },
  ]

  return (
    <nav className="nav" aria-label="メインメニュー">
      {items.map((item) => {
        const isActive = item.active ?? screen === item.id
        return (
          <button
            key={item.id}
            type="button"
            className={`nav__btn${isActive ? ' is-active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            <span className="nav__icon" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
