import { MapPin } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import type { MediaAsset } from "@/lib/media";
import { DecorativeShape } from "../ui/DecorativeShape";
import { MediaFrame } from "../ui/MediaFrame";
import { PrimaryButton } from "../ui/PrimaryButton";
import { HERO_SIZES, HeroSlogan, HeroTitle, heroIcons, heroStats } from "./HeroParts";

/**
 * Отдельная мобильная композиция: сначала текст и кнопки (всегда в первом экране),
 * затем фото ограниченной высоты (svh) и компактные показатели поверх нижнего края.
 */
export function MobileHero({ media }: { media: MediaAsset | null }) {
  return (
    <div className="container-site relative pb-6 pt-3 sm:pt-8 lg:hidden">
      <DecorativeShape variant="sun" className="right-0 top-2 size-14 opacity-90 xs:size-16" />
      <DecorativeShape variant="sparkle" color="#9C83DD" className="right-[4.5rem] top-14 hidden size-4 xs:block" />

      <div className="mx-auto max-w-xl sm:text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.8rem] font-bold text-ink-soft shadow-soft">
          <MapPin aria-hidden="true" className="size-3.5 text-peach-deep" />
          {kindergarten.city}, Шұғыла
        </p>
        <HeroTitle className="mt-3 text-[clamp(2.05rem,9.6vw,3.2rem)]" />
        <HeroSlogan className="mt-2.5 text-[clamp(1.08rem,4.6vw,1.35rem)]" />
        <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{kindergarten.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mx-auto sm:max-w-md">
          <PrimaryButton href="#about" data-nav="about" size="sm" className="w-full">
            Біз туралы
          </PrimaryButton>
          <PrimaryButton href="#contacts" data-nav="contacts" variant="outline" size="sm" className="w-full">
            Байланысу
          </PrimaryButton>
        </div>
      </div>

      <div className="relative mx-auto mt-4 max-w-xl">
        <DecorativeShape variant="petal" color="#A9D9B0" className="-left-1 -top-3 z-10 size-7 rotate-[-25deg]" />
        <div className="h-[clamp(8.5rem,28svh,20rem)] overflow-hidden rounded-[1.75rem_3rem_1.75rem_3rem] shadow-lift ring-4 ring-white">
          <MediaFrame media={media} variant="hero" priority sizes={HERO_SIZES} />
        </div>
        <ul className="relative z-10 -mt-7 grid grid-cols-3 gap-1.5 px-1.5 xs:gap-2 xs:px-2.5">
          {heroStats.map((s, i) => (
            <li
              key={s.key}
              className={`flex min-w-0 flex-col items-center rounded-2xl px-1 py-2 text-center shadow-soft ring-2 ring-white ${
                ["bg-lavender", "bg-peach-soft", "bg-mint-soft"][i]
              }`}
            >
              <span aria-hidden="true" className="text-violet-ink">{heroIcons[s.key]}</span>
              <span className="mt-0.5 font-display text-[0.92rem] font-semibold leading-tight text-ink xs:text-[1rem]">{s.value}</span>
              <span className="text-[0.72rem] font-semibold leading-tight text-ink-soft xs:text-[0.78rem]">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
