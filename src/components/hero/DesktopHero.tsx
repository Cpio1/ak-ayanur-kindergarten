import { ArrowDown, MapPin } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import type { MediaAsset } from "@/lib/media";
import { DecorativeShape } from "../ui/DecorativeShape";
import { Float } from "../ui/Float";
import { MediaFrame } from "../ui/MediaFrame";
import { PrimaryButton } from "../ui/PrimaryButton";
import { HeroSlogan, HeroTitle, heroIcons, heroStats } from "./HeroParts";
import { InfoCard } from "../ui/InfoCard";
import { Reveal } from "../ui/Reveal";
import { HERO_SIZES } from "./HeroParts";

export function DesktopHero({ media }: { media: MediaAsset | null }) {
  return (
    <div className="container-site hidden lg:grid lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-[clamp(2rem,4vw,4rem)] lg:py-[clamp(1.5rem,4vh,3rem)]">
      <Reveal className="relative min-w-0">
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-ink-soft shadow-soft">
          <MapPin aria-hidden="true" className="size-4 text-peach-deep" />
          {kindergarten.city}, Шұғыла ықшам ауданы
        </p>
        <HeroTitle className="mt-[clamp(0.75rem,2vh,1.25rem)] text-[clamp(2.6rem,4.3vw,4.3rem)]" />
        <HeroSlogan className="mt-[clamp(0.75rem,2vh,1.25rem)] max-w-[30rem] text-[clamp(1.25rem,1.7vw,1.6rem)]" />
        <p className="lead mt-3 max-w-[30rem]">{kindergarten.description}</p>
        <div className="mt-[clamp(1.1rem,3vh,1.75rem)] flex flex-wrap gap-3">
          <PrimaryButton href="#about" data-nav="about" icon={<ArrowDown className="size-5" />}>
            Біз туралы
          </PrimaryButton>
          <PrimaryButton href="#contacts" data-nav="contacts" variant="outline">
            Байланысу
          </PrimaryButton>
        </div>
        <ul className="mt-[clamp(1.25rem,3.5vh,2.25rem)] grid max-w-[34rem] grid-cols-3 gap-3">
          {heroStats.map((s) => (
            <li key={s.key} className="min-w-0">
              <InfoCard icon={heroIcons[s.key]} value={s.value} label={s.label} tone={s.tone} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.12} className="relative mx-auto w-full max-w-[min(100%,34rem)] p-[clamp(1rem,2vw,1.75rem)]">
        {/* Небольшой декор вокруг фото — внутри колонки, без выхода за экран */}
        <Float className="right-0 top-0 z-10 size-[clamp(3.5rem,6vw,5.5rem)]" distance={6} rotate={8}>
          <DecorativeShape variant="sun" className="static size-full" />
        </Float>
        <Float className="bottom-[12%] left-0 z-10 size-[clamp(1.75rem,2.6vw,2.5rem)]" duration={7} delay={1}>
          <DecorativeShape variant="star" color="#9C83DD" className="static size-full" />
        </Float>
        <DecorativeShape variant="flower" color="#FFB9A5" accent="#FFD56B" className="-bottom-1 right-[10%] z-10 size-[clamp(2.25rem,3.4vw,3.25rem)]" />
        <DecorativeShape variant="squiggle" color="#A9D9B0" className="left-[6%] top-1 z-0 h-8 w-24" />
        <div className="deco inset-[8%] -z-10 rounded-[3rem] bg-lavender" style={{ transform: "rotate(-5deg) translate(-10px, 12px)" }} />
        <div className="relative z-[1] h-[min(calc(100svh-var(--header-height)-7rem),35rem)] min-h-[20rem] overflow-hidden blob-frame-soft shadow-lift ring-[6px] ring-white">
          <MediaFrame
            media={media}
            variant="hero"
            position="50% 45%"
            priority
            sizes={HERO_SIZES}
            className="blob-frame-soft"
          />
        </div>
      </Reveal>
    </div>
  );
}
