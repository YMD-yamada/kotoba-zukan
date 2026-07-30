/** オリジナルマスコット「ずかんくん」— 市販図鑑とは無関係の独自キャラ */
export function Mascot({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 180"
      role="img"
      aria-label="ずかんくん"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="168" rx="52" ry="8" fill="rgba(29,53,87,0.12)" />
      {/* body book */}
      <path
        d="M48 48c0-10 8-18 18-18h68c10 0 18 8 18 18v88c0 8-6 14-14 14H62c-8 0-14-6-14-14V48z"
        fill="#fff8e8"
        stroke="#1d6b5f"
        strokeWidth="4"
      />
      <path d="M100 30v120" stroke="#1d6b5f" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M58 58h30M58 78h26M58 98h28M112 58h30M112 78h26M112 98h22"
        stroke="#7ec8a3"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* smiling face sticker */}
      <circle cx="100" cy="86" r="28" fill="#ffd166" stroke="#e09f3e" strokeWidth="3" />
      <circle cx="90" cy="82" r="3.5" fill="#1d3557" />
      <circle cx="110" cy="82" r="3.5" fill="#1d3557" />
      <path
        d="M90 96c4 6 16 6 20 0"
        fill="none"
        stroke="#1d3557"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* ears / page flaps */}
      <path d="M42 70c-10 4-14 16-8 24" fill="none" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" />
      <path d="M158 70c10 4 14 16 8 24" fill="none" stroke="#4cc9f0" strokeWidth="5" strokeLinecap="round" />
      {/* sparkles */}
      <circle cx="36" cy="40" r="4" fill="#ffd166" className="mascot-spark" />
      <circle cx="168" cy="48" r="3.5" fill="#4cc9f0" className="mascot-spark" />
      <circle cx="154" cy="28" r="2.5" fill="#ff6b6b" className="mascot-spark" />
    </svg>
  )
}
