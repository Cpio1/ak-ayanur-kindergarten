import Image from "next/image";
import type { ImageAsset } from "@/lib/media";
import { kindergarten } from "@/data/kindergarten";

/**
 * Логотип: если в /public есть logo.png (или .webp/.jpg) — используется он
 * (прозрачность сохраняется, без подложки). Иначе — типографический знак.
 */
export function Logo({ logo, compact = false }: { logo: ImageAsset | null; compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {logo ? (
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt=""
          priority
          sizes="48px"
          className={`${compact ? "h-9" : "h-11"} w-auto shrink-0`}
        />
      ) : (
        <SunMark className={compact ? "size-9" : "size-10"} />
      )}
      <span className="min-w-0 leading-none">
        <span className={`block font-display font-semibold tracking-[-0.02em] text-ink ${compact ? "text-[1.12rem]" : "text-[1.22rem]"}`}>
          {kindergarten.name}
        </span>
        <span className="mt-1 block text-[0.74rem] font-bold text-ink-soft">балабақшасы</span>
      </span>
    </span>
  );
}

/** Знак-солнышко из лепестков — фирменный мотив «шуақ», а не официальный логотип. */
export function SunMark({ className = "size-10" }: { className?: string }) {
  const petals = ["#9C83DD", "#FFB9A5", "#A9D9B0", "#FFD56B", "#9C83DD", "#FFB9A5", "#A9D9B0", "#FFD56B"];
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>
      {petals.map((c, i) => (
        <ellipse key={i} cx="24" cy="9.5" rx="5" ry="8" fill={c} transform={`rotate(${i * 45} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="9" fill="#FFF9F0" />
      <circle cx="24" cy="24" r="6.5" fill="#FFD56B" />
    </svg>
  );
}
