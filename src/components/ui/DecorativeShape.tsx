import type { CSSProperties } from "react";

export type ShapeVariant =
  | "sun"
  | "star"
  | "sparkle"
  | "petal"
  | "flower"
  | "cloud"
  | "squiggle"
  | "blob"
  | "ring"
  | "rays";

type Props = {
  variant: ShapeVariant;
  color?: string;
  accent?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Небольшие декоративные фигуры. Всегда aria-hidden и pointer-events: none.
 * Размер и положение задаются через className/style (clamp()).
 */
export function DecorativeShape({ variant, color = "#FFD56B", accent = "#FFB9A5", className = "", style }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      className={`deco ${className}`}
      style={style}
    >
      {renderShape(variant, color, accent)}
    </svg>
  );
}

function renderShape(variant: ShapeVariant, color: string, accent: string) {
  switch (variant) {
    case "sun":
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="47"
              y="4"
              width="6"
              height="17"
              rx="3"
              fill={color}
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="22" fill={color} />
          <circle cx="43" cy="46" r="2.6" fill="#302B42" opacity=".75" />
          <circle cx="57" cy="46" r="2.6" fill="#302B42" opacity=".75" />
          <path d="M42 55 Q50 62 58 55" stroke="#302B42" strokeOpacity=".75" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      );
    case "rays":
      return (
        <g stroke={color} strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M50 10 V30" />
          <path d="M22 22 L35 35" />
          <path d="M78 22 L65 35" />
          <path d="M10 50 H28" />
          <path d="M90 50 H72" />
        </g>
      );
    case "star":
      return (
        <path
          d="M50 6 L61 37 L94 38 L68 58 L77 90 L50 71 L23 90 L32 58 L6 38 L39 37 Z"
          fill={color}
          stroke={color}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      );
    case "sparkle":
      return <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill={color} />;
    case "petal":
      return <path d="M50 6 C78 22 86 60 50 94 C14 60 22 22 50 6 Z" fill={color} />;
    case "flower":
      return (
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="26" rx="15" ry="22" fill={color} transform={`rotate(${i * 60} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="13" fill={accent} />
        </g>
      );
    case "cloud":
      return (
        <path
          d="M24 74 C10 74 6 56 20 52 C18 36 38 30 46 42 C52 26 78 28 78 48 C94 48 96 74 78 74 Z"
          fill={color}
        />
      );
    case "squiggle":
      return (
        <path
          d="M4 60 C16 36 28 36 36 56 C44 76 56 76 64 54 C72 32 84 32 96 52"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "blob":
      return (
        <path
          d="M52 6 C74 6 94 22 94 46 C94 72 76 94 50 94 C24 94 6 76 8 50 C10 24 30 6 52 6 Z"
          fill={color}
        />
      );
    case "ring":
      return <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="9" strokeDasharray="2 16" strokeLinecap="round" fill="none" />;
  }
}
