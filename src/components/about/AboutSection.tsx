import { Baby, Check, Clock3, Languages, Users } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import type { MediaAsset } from "@/lib/media";
import { DecorativeShape } from "../ui/DecorativeShape";
import { InfoCard } from "../ui/InfoCard";
import { MediaFrame } from "../ui/MediaFrame";
import { Reveal } from "../ui/Reveal";
import { SectionWave } from "../ui/SectionWave";

const facts = [
  { icon: <Users className="size-5" />, value: `${kindergarten.groupCount} топ`, label: "балалар топтары", tone: "lavender" },
  { icon: <Baby className="size-5" />, value: kindergarten.ageRange, label: "балалар жасы", tone: "peach" },
  { icon: <Languages className="size-5" />, value: kindergarten.language, label: "тәрбие тілі", tone: "mint" },
  { icon: <Clock3 className="size-5" />, value: kindergarten.workingHours, label: "жұмыс уақыты", tone: "sun" },
] as const;

const highlights = [
  "Қазақ тіліндегі тәрбие",
  `Күніне ${kindergarten.mealsPerDay} мезгіл тамақтану`,
  `${kindergarten.activities[0]} және ${kindergarten.activities[1].toLowerCase()} үйірмелері`,
];

export function AboutSection({ media }: { media: MediaAsset | null }) {
  return (
    <section id="about" aria-labelledby="about-title" className="section section-screen bg-lavender-soft">
      <SectionWave color="#F5F0FF" />
      <DecorativeShape variant="cloud" color="#FFFFFF" className="right-[3%] top-[6%] hidden h-12 w-20 md:block" />
      <div className="container-site grid items-center gap-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal className="relative order-2 mx-auto w-full max-w-xl lg:order-1">
          <DecorativeShape variant="star" color="#FFD56B" className="-left-1 -top-2 z-10 size-[clamp(1.75rem,3vw,2.75rem)]" />
          <DecorativeShape variant="ring" color="#9C83DD" className="-bottom-4 -right-2 size-[clamp(3rem,6vw,5rem)] max-sm:hidden" />
          <div className="aspect-[4/3] max-h-[min(calc(100svh-var(--header-height)-9rem),30rem)] w-full overflow-hidden rounded-[2rem_4rem_2rem_4rem] shadow-lift ring-[6px] ring-white sm:aspect-[5/4] lg:aspect-auto lg:h-[min(calc(100svh-var(--header-height)-9rem),30rem)]">
            <MediaFrame media={media} variant="about" position="50% 50%" sizes="(min-width: 1024px) 520px, (min-width: 640px) 576px, 100vw" />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="order-1 min-w-0 lg:order-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-bold text-violet-ink ring-1 ring-violet/30">
            <span aria-hidden="true" className="size-2 rounded-full bg-violet" />
            {kindergarten.siteName}
          </p>
          <h2 id="about-title" className="section-title mt-3 text-ink">
            Біз туралы
          </h2>
          <p className="mt-2 text-[clamp(1.1rem,1rem+0.6vw,1.4rem)] font-extrabold leading-snug text-violet-deep text-balance">
            Балаңыздың әр күні қуанышқа толы болсын!
          </p>
          <p className="lead mt-3 max-w-xl">
            {kindergarten.siteName} — {kindergarten.city} қаласында орналасқан, {kindergarten.ageRange.replace(" жас", "")} жас
            аралығындағы балаларға арналған қазақ тіліндегі балабақша.
          </p>
          <ul className="mt-4 hidden flex-wrap gap-2 sm:flex">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.9rem] font-bold text-ink shadow-soft">
                <Check aria-hidden="true" className="size-4 text-mint-deep" strokeWidth={3} />
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
            {facts.map((f) => (
              <li key={f.label} className="min-w-0">
                <InfoCard icon={f.icon} value={f.value} label={f.label} tone={f.tone} className="bg-white! shadow-soft" stackOnMobile />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
