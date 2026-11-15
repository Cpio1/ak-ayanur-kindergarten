/** Тематические мини-иллюстрации для карточек групп (без смысловой нагрузки). */
export function GroupIllustration({ n, className = "" }: { n: 1 | 2 | 3; className?: string }) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" focusable="false" className={className}>
      {n === 1 ? (
        <g>
          <circle cx="60" cy="48" r="34" fill="#EDE5FF" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x="57" y="12" width="6" height="12" rx="3" fill="#FFD56B" transform={`rotate(${i * 36} 60 46)`} />
          ))}
          <circle cx="60" cy="46" r="18" fill="#FFD56B" />
          <path d="M28 78 c-10 0-11-13-2-15 c1-11 16-13 20-5 c5-8 21-5 20 6 c10 1 10 14 0 14 Z" fill="#fff" stroke="#9C83DD" strokeWidth="2.5" />
          <circle cx="54" cy="44" r="2.2" fill="#302B42" />
          <circle cx="66" cy="44" r="2.2" fill="#302B42" />
          <path d="M54 51 q6 5 12 0" stroke="#302B42" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      ) : n === 2 ? (
        <g>
          <circle cx="60" cy="48" r="34" fill="#FFEAE3" />
          <path d="M60 84 V52" stroke="#2F6B3A" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 70 C48 70 42 62 42 56 C52 56 60 62 60 70 Z" fill="#A9D9B0" />
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cx="60" cy="27" rx="8" ry="12" fill="#FFB9A5" transform={`rotate(${i * 60} 60 40)`} />
          ))}
          <circle cx="60" cy="40" r="7.5" fill="#FFD56B" />
          <path d="M92 26 l2 5 5 .5 -4 3.5 1.5 5 -4.5 -3 -4.5 3 1.5 -5 -4 -3.5 5 -.5 Z" fill="#9C83DD" />
        </g>
      ) : (
        <g>
          <circle cx="60" cy="48" r="34" fill="#E5F5E7" />
          <g fill="none" strokeLinecap="round" strokeWidth="7">
            <path d="M28 74 A32 32 0 0 1 92 74" stroke="#9C83DD" />
            <path d="M38 74 A22 22 0 0 1 82 74" stroke="#FFB9A5" />
            <path d="M48 74 A12 12 0 0 1 72 74" stroke="#FFD56B" />
          </g>
          <path d="M60 14 l4 9 10 1 -7.5 6.5 2.5 9.5 -9 -5.5 -9 5.5 2.5 -9.5 -7.5 -6.5 10 -1 Z" fill="#FFD56B" stroke="#E0A800" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="94" cy="40" r="3" fill="#A9D9B0" />
          <circle cx="26" cy="36" r="2.5" fill="#9C83DD" />
        </g>
      )}
    </svg>
  );
}
