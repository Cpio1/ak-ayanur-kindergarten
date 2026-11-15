import { Baby, Users, UtensilsCrossed } from "lucide-react";
import { heroStats } from "@/data/kindergarten";

export const heroIcons = {
  groups: <Users className="size-5" />,
  age: <Baby className="size-5" />,
  meals: <UtensilsCrossed className="size-5" />,
} as const;

export { heroStats };

/** Заголовок h1 — один и тот же текст для обеих версий. */
export function HeroTitle({ className = "" }: { className?: string }) {
  return (
    <h1 className={`display text-ink ${className}`}>
      <span className="block text-violet-deep">Ақ-Аянұр</span>
      <span className="mt-1 block text-[0.6em] tracking-[-0.025em]">балабақшасы</span>
    </h1>
  );
}

export function HeroSlogan({ className = "" }: { className?: string }) {
  return (
    <p className={`font-extrabold leading-snug tracking-[-0.015em] text-ink text-balance ${className}`}>
      Бақытты балалық шақтың <span className="sun-underline">шуақты</span> мекені!
    </p>
  );
}

/** Одинаковый sizes для desktop и mobile → браузер выбирает один и тот же файл (без двойной загрузки). */
export const HERO_SIZES = "(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 576px, 100vw";
