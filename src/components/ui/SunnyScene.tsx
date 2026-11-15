/**
 * Авторская векторная иллюстрация «шуақты әлем».
 * Показывается, пока в /public нет подготовленной фотографии —
 * чтобы не оставлять пустую рамку и не подставлять чужие фото.
 */
export function SunnyScene({ variant = "hero", className = "" }: { variant?: "hero" | "about"; className?: string }) {
  const hero = variant === "hero";
  return (
    <svg
      viewBox="0 0 480 400"
      role="img"
      aria-label="Күн, бұлттар мен гүлдер бейнеленген балалар суреті"
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hero ? "#EDE5FF" : "#FFF1C9"} />
          <stop offset="1" stopColor={hero ? "#FFE3E8" : "#FFEAE3"} />
        </linearGradient>
      </defs>
      <rect width="480" height="400" fill={`url(#sky-${variant})`} />
      {/* солнце с лучами */}
      <g transform={hero ? "translate(340 110)" : "translate(120 105)"}>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x="-5" y="-86" width="10" height="26" rx="5" fill="#FFD56B" transform={`rotate(${i * (360 / 14)})`} />
        ))}
        <circle r="50" fill="#FFD56B" />
        <circle cx="-16" cy="-6" r="5" fill="#302B42" />
        <circle cx="16" cy="-6" r="5" fill="#302B42" />
        <circle cx="-28" cy="10" r="7" fill="#FFB9A5" opacity=".8" />
        <circle cx="28" cy="10" r="7" fill="#FFB9A5" opacity=".8" />
        <path d="M-14 14 Q0 28 14 14" stroke="#302B42" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      {/* облака */}
      <path d="M40 120 c-22 0-26-28-6-32 c0-24 32-30 42-12 c10-20 46-14 44 12 c22 0 24 32 0 32 Z" fill="#fff" opacity=".95" transform={hero ? "" : "translate(250 -30)"} />
      <path d="M300 220 c-16 0-18-20-4-23 c0-17 23-21 30-8 c7-14 33-10 31 8 c16 0 17 23 0 23 Z" fill="#fff" opacity=".85" transform={hero ? "translate(-120 10)" : "translate(40 -60)"} />
      {/* холмы */}
      <path d="M0 300 C90 250 170 262 250 292 C330 322 410 276 480 262 V400 H0 Z" fill="#A9D9B0" />
      <path d="M0 336 C110 304 200 318 290 342 C370 362 430 330 480 322 V400 H0 Z" fill="#8CCB97" />
      {/* радуга-дуга */}
      <g fill="none" strokeLinecap="round" strokeWidth="12" transform={hero ? "translate(110 300)" : "translate(350 300)"}>
        <path d="M-70 0 A70 70 0 0 1 70 0" stroke="#9C83DD" />
        <path d="M-52 0 A52 52 0 0 1 52 0" stroke="#FFB9A5" />
        <path d="M-34 0 A34 34 0 0 1 34 0" stroke="#FFD56B" />
      </g>
      {/* цветы */}
      {[
        [64, 352, "#FFB9A5"],
        [190, 362, "#9C83DD"],
        [300, 372, "#FFD56B"],
        [420, 352, "#FFE3E8"],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 V26" stroke="#2F6B3A" strokeWidth="4" strokeLinecap="round" />
          {Array.from({ length: 5 }).map((_, j) => (
            <ellipse key={j} cx="0" cy="-10" rx="7" ry="10" fill={c as string} transform={`rotate(${j * 72})`} />
          ))}
          <circle r="5.5" fill="#FFF9F0" />
        </g>
      ))}
      {/* звёздочки */}
      <path d="M200 60 l5 13 14 1 -11 9 4 14 -12 -8 -12 8 4 -14 -11 -9 14 -1 Z" fill="#fff" opacity=".9" />
      <path d="M430 230 l3 8 9 1 -7 6 3 9 -8 -5 -8 5 3 -9 -7 -6 9 -1 Z" fill="#9C83DD" opacity=".7" />
    </svg>
  );
}
