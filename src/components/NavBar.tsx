export type Screen = 'home' | 'browse' | 'word' | 'quiz' | 'favorites' | 'book' | 'about'

export function NavBar({
  screen,
  onNavigate,
}: {
  screen: Screen
  onNavigate: (s: Screen) => void
}) {
  const items: { id: Screen; label: string; icon: string }[] = [
    { id: 'home', label: 'ホーム', icon: '⌂' },
    { id: 'browse', label: 'ずかん', icon: '◇' },
    { id: 'quiz', label: 'クイズ', icon: '?' },
    { id: 'favorites', label: 'すき', icon: '♥' },
    { id: 'book', label: 'ほん', icon: '▣' },
  ]

  return (
    <nav className="nav" aria-label="メインメニュー">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav__btn${screen === item.id ? ' is-active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-current={screen === item.id ? 'page' : undefined}
          aria-label={item.label}
        >
          <span className="nav__icon" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
