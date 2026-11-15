/** Мягкая волна у верхнего края секции — плавный переход цвета от предыдущей секции. */
export function SectionWave({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" className="section-wave w-full" viewBox="0 0 1440 40" preserveAspectRatio="none" style={flip ? { transform: "translateY(calc(-100% + 1px)) scaleX(-1)" } : undefined}>
      <path d="M0 40 V22 C180 4 360 2 540 16 C720 30 900 36 1080 22 C1230 10 1340 8 1440 14 V40 Z" fill={color} />
    </svg>
  );
}
