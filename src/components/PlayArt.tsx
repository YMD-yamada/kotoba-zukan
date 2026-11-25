/** あそびコーナーの絵（きせかえの子・スープのなべ）。外部画像を使わずSVGで描く。 */

const INK = '#243447'
const SKIN = '#ffd8b5'
const HAIR = '#5b3a29'

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)))
  const r = c((n >> 16) & 255)
  const g = c((n >> 8) & 255)
  const b = c(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function DressFigure({
  top,
  bottom,
  acc,
}: {
  top: { id: string; color: string }
  bottom: { id: string; color: string }
  acc: { id: string; color: string }
}) {
  const stroke = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
  const longSleeve = top.id !== 't1'
  const showLegsTop = bottom.id === 'b1' ? 192 : bottom.id === 'b3' ? 162 : 168

  return (
    <svg viewBox="0 0 160 224" className="dress-figure" aria-hidden>
      {/* かげ */}
      <ellipse cx="80" cy="214" rx="42" ry="6" fill="rgba(36,52,71,0.12)" />

      {/* あし・くつ */}
      <path d={`M68 ${showLegsTop - 4}V200`} stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
      <path d={`M92 ${showLegsTop - 4}V200`} stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
      <path d="M58 200h17a5 5 0 0 1 5 5v2H56v-2a5 5 0 0 1 2-5z" fill="#e76f51" {...stroke} />
      <path d="M85 200h17a5 5 0 0 1 2 5v2H80v-2a5 5 0 0 1 5-5z" fill="#e76f51" {...stroke} />

      {/* した */}
      {bottom.id === 'b1' && (
        <path d="M56 136h48l4 60H86l-6-40-6 40H52z" fill={bottom.color} {...stroke} />
      )}
      {bottom.id === 'b2' && (
        <path d="M58 134h44l16 38c-24 8-52 8-76 0z" fill={bottom.color} {...stroke} />
      )}
      {bottom.id === 'b2' && (
        <path d="M66 140l-6 30M80 140v32M94 140l6 30" stroke={shade(bottom.color, -40)} strokeWidth="2" opacity="0.5" />
      )}
      {bottom.id === 'b3' && (
        <path d="M56 136h48l4 32H84l-4-14-4 14H52z" fill={bottom.color} {...stroke} />
      )}

      {/* うで */}
      <path d="M54 92L38 140" stroke={SKIN} strokeWidth="12" strokeLinecap="round" />
      <path d="M106 92l16 48" stroke={SKIN} strokeWidth="12" strokeLinecap="round" />
      <circle cx="37" cy="143" r="7" fill={SKIN} {...stroke} strokeWidth={2.5} />
      <circle cx="123" cy="143" r="7" fill={SKIN} {...stroke} strokeWidth={2.5} />

      {/* うえ（そで） */}
      {longSleeve ? (
        <>
          <path d="M56 86L36 134l12 4 16-36z" fill={top.color} {...stroke} />
          <path d="M104 86l20 48-12 4-16-36z" fill={top.color} {...stroke} />
        </>
      ) : (
        <>
          <path d="M56 86l-14 22 12 6 10-14z" fill={top.color} {...stroke} />
          <path d="M104 86l14 22-12 6-10-14z" fill={top.color} {...stroke} />
        </>
      )}
      {/* うえ（どう） */}
      <path d="M58 84h44c4 0 6 3 6 6v50H52V90c0-3 2-6 6-6z" fill={top.color} {...stroke} />
      {top.id === 't2' && (
        <path d="M54 132h52M54 126h52" stroke={shade(top.color, -50)} strokeWidth="2.5" opacity="0.55" />
      )}
      {top.id === 't3' && (
        <>
          <path d="M70 84l10 12 10-12" fill="#fff" {...stroke} strokeWidth={2.5} />
          <circle cx="80" cy="106" r="2.4" fill={INK} />
          <circle cx="80" cy="118" r="2.4" fill={INK} />
          <circle cx="80" cy="130" r="2.4" fill={INK} />
        </>
      )}
      {top.id === 't1' && <path d="M70 84c3 7 17 7 20 0" fill="none" {...stroke} strokeWidth={2.5} />}

      {/* くび・あたま */}
      <rect x="73" y="74" width="14" height="12" rx="4" fill={SKIN} />
      <circle cx="80" cy="50" r="28" fill={SKIN} {...stroke} />
      <path d="M52 48c0-20 14-30 28-30s28 10 28 30c-8-8-18-12-28-12-6 0-12 2-16 6-4-2-8-1-12 6z" fill={HAIR} {...stroke} />
      <circle cx="70" cy="54" r="3.2" fill={INK} />
      <circle cx="90" cy="54" r="3.2" fill={INK} />
      <circle cx="64" cy="62" r="4.5" fill="#ff8fa3" opacity="0.55" />
      <circle cx="96" cy="62" r="4.5" fill="#ff8fa3" opacity="0.55" />
      <path d="M73 64c4 5 10 5 14 0" fill="none" {...stroke} strokeWidth={2.5} />

      {/* みにつけるもの */}
      {acc.id === 'a1' && (
        <>
          <path d="M52 40c0-16 12-24 28-24s28 8 28 24z" fill={acc.color} {...stroke} />
          <path d="M100 40h20c2 0 2 6-2 6H98z" fill={shade(acc.color, -30)} {...stroke} />
          <circle cx="80" cy="15" r="4" fill={shade(acc.color, -30)} {...stroke} strokeWidth={2} />
        </>
      )}
      {acc.id === 'a2' && (
        <g fill="rgba(255,255,255,0.35)" stroke={acc.color} strokeWidth="3.2">
          <circle cx="70" cy="54" r="9" />
          <circle cx="90" cy="54" r="9" />
          <path d="M79 54h2M61 52l-8-3M99 52l8-3" fill="none" />
        </g>
      )}
      {acc.id === 'a3' && (
        <>
          <path d="M60 78c6 8 34 8 40 0l4 8c-8 10-40 10-48 0z" fill={acc.color} {...stroke} />
          <path d="M88 86l4 26h-12l-2-24z" fill={acc.color} {...stroke} />
          <path d="M82 110h10" stroke={shade(acc.color, -40)} strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

export function SoupPot({ colors, ready }: { colors: string[]; ready: boolean }) {
  const broth = ready && colors.length ? shade(colors[0], 30) : '#d6ecfb'
  const pieces = colors.flatMap((c, i) =>
    [0, 1].map((k) => ({ c, x: 56 + ((i * 37 + k * 53) % 88), y: 72 + ((i * 5 + k * 3) % 7), r: 5 + ((i + k) % 3) })),
  )

  return (
    <svg viewBox="0 0 200 150" className={`soup-pot-art${ready ? ' is-ready' : ''}`} aria-hidden>
      {ready && (
        <g className="soup-steam" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.9">
          <path d="M72 50c-8-10 8-16 0-28" />
          <path d="M100 46c-8-10 8-16 0-28" />
          <path d="M128 50c-8-10 8-16 0-28" />
        </g>
      )}
      <ellipse cx="100" cy="140" rx="70" ry="7" fill="rgba(36,52,71,0.14)" />
      {/* とって */}
      <path d="M26 82c-14 0-14 18 0 18" fill="none" stroke="#1d7a6f" strokeWidth="8" strokeLinecap="round" />
      <path d="M174 82c14 0 14 18 0 18" fill="none" stroke="#1d7a6f" strokeWidth="8" strokeLinecap="round" />
      {/* なべ */}
      <path d="M24 72h152v34c0 20-18 30-40 30H64c-22 0-40-10-40-30z" fill="#2aa89a" stroke="#1d7a6f" strokeWidth="4" />
      <path d="M36 100c6 14 20 20 34 20" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" />
      {/* スープ */}
      <ellipse cx="100" cy="72" rx="78" ry="15" fill="#34c3b2" stroke="#1d7a6f" strokeWidth="3" />
      <ellipse cx="100" cy="73" rx="68" ry="11" fill="#1d7a6f" />
      <ellipse cx="100" cy="75" rx="64" ry="9" fill={broth} className="soup-broth" />
      {pieces.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} stroke="rgba(36,52,71,0.35)" strokeWidth="1.5" className="soup-piece" style={{ animationDelay: `${i * 0.13}s` }} />
      ))}
    </svg>
  )
}
