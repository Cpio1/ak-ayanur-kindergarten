/** Хореография: лента в движении, ноты и звёздочки. */
export function DanceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 160" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="xMidYMid meet">
      <path d="M10 120 C60 60 100 150 150 96 C200 42 240 130 310 60" fill="none" stroke="#9C83DD" strokeWidth="14" strokeLinecap="round" />
      <path d="M10 120 C60 60 100 150 150 96 C200 42 240 130 310 60" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14" />
      <path d="M30 70 C70 40 110 90 160 52" fill="none" stroke="#FFB9A5" strokeWidth="8" strokeLinecap="round" />
      <g fill="#5D45AD">
        <ellipse cx="226" cy="36" rx="9" ry="7" transform="rotate(-20 226 36)" />
        <rect x="232" y="2" width="4" height="34" rx="2" />
        <path d="M234 2 q16 6 14 20 q-4 -10 -14 -10 Z" />
      </g>
      <g fill="#FF8F70">
        <ellipse cx="96" cy="140" rx="7" ry="5.5" transform="rotate(-20 96 140)" />
        <rect x="101" y="114" width="3.5" height="26" rx="1.75" />
      </g>
      <path d="M270 120 l4 10 11 1 -8 7 3 11 -10 -6 -10 6 3 -11 -8 -7 11 -1 Z" fill="#FFD56B" />
      <path d="M56 20 c2 10 5 13 15 15 c-10 2 -13 5 -15 15 c-2 -10 -5 -13 -15 -15 c10 -2 13 -5 15 -15 Z" fill="#fff" />
    </svg>
  );
}

/** Таэквондо: пояс с узлом и динамичные линии движения. */
export function TaekwondoIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 160" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="xMidYMid meet">
      <g stroke="#2F6B3A" strokeOpacity=".35" strokeWidth="6" strokeLinecap="round">
        <path d="M20 40 H90" />
        <path d="M34 62 H110" />
        <path d="M14 84 H70" />
        <path d="M250 112 H306" />
        <path d="M232 132 H292" />
      </g>
      {/* пояс */}
      <path d="M70 70 C120 56 200 56 250 70 L246 92 C200 80 120 80 74 92 Z" fill="#FFD56B" stroke="#C99400" strokeWidth="2" />
      <path d="M144 62 h32 v30 h-32 Z" rx="6" fill="#F5BC2E" stroke="#C99400" strokeWidth="2" />
      <path d="M150 90 L126 150 L146 152 L162 96 Z" fill="#FFD56B" stroke="#C99400" strokeWidth="2" strokeLinejoin="round" />
      <path d="M170 90 L198 148 L216 140 L178 92 Z" fill="#FFD56B" stroke="#C99400" strokeWidth="2" strokeLinejoin="round" />
      <path d="M128 140 L146 144" stroke="#2F6B3A" strokeWidth="4" />
      <path d="M196 138 L212 132" stroke="#2F6B3A" strokeWidth="4" />
      {/* искры энергии */}
      <path d="M264 30 l6 12 -10 -2 8 18" fill="none" stroke="#5D45AD" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="124" r="9" fill="#A9D9B0" />
      <circle cx="290" cy="80" r="5" fill="#FFB9A5" />
    </svg>
  );
}
