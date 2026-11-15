import { Music2, Zap } from "lucide-react";
import { activities } from "@/data/kindergarten";
import { DecorativeShape } from "../ui/DecorativeShape";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionWave } from "../ui/SectionWave";
import { DanceIllustration, TaekwondoIllustration } from "./ActivityIllustrations";

const styles = {
  dance: {
    card: "bg-gradient-to-br from-peach-soft to-lavender rounded-[2.5rem_1rem_2.5rem_2.5rem]",
    art: "bg-white/55",
    chip: "bg-white text-violet-ink",
    icon: <Music2 className="size-5" />,
    iconBg: "bg-violet-deep text-white",
    Art: DanceIllustration,
    shape: "sparkle" as const,
    shapeColor: "#9C83DD",
  },
  sport: {
    card: "bg-gradient-to-br from-mint-soft to-sun-soft rounded-[1rem_2.5rem_2.5rem_2.5rem]",
    art: "bg-white/55",
    chip: "bg-white text-mint-deep",
    icon: <Zap className="size-5" />,
    iconBg: "bg-mint-deep text-white",
    Art: TaekwondoIllustration,
    shape: "star" as const,
    shapeColor: "#FFD56B",
  },
};

export function ActivitiesSection() {
  return (
    <section id="activities" aria-labelledby="activities-title" className="section section-screen bg-[#FFF1EC]">
      <SectionWave color="#FFF1EC" flip />
      <DecorativeShape variant="squiggle" color="#FFB9A5" className="right-[4%] top-[9%] hidden h-8 w-24 md:block" />
      <DecorativeShape variant="flower" color="#A9D9B0" accent="#FFD56B" className="bottom-[7%] left-[3%] hidden size-10 md:block" />
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="activities-title"
            eyebrow="Үйірмелер"
            tone="peach"
            align="center"
            title="Қосымша үйірмелер"
            subtitle="Қимыл, ырғақ және шығармашылық — балалар қуанып айналысатын бағыттар"
          />
        </Reveal>
        <ul className="mx-auto mt-[clamp(1.25rem,4vh,2.5rem)] grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
          {activities.map((a, i) => {
            const s = styles[a.tone];
            const Art = s.Art;
            return (
              <li key={a.id} className="min-w-0">
                <Reveal delay={i * 0.1} className="h-full">
                  <article className={`group relative isolate flex h-full flex-col overflow-hidden p-3 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-4 ${s.card}`}>
                    <DecorativeShape variant={s.shape} color={s.shapeColor} className="right-5 top-5 size-5" />
                    <div className={`grid h-[clamp(4.5rem,12vh,9.5rem)] place-items-center overflow-hidden rounded-[1.75rem] ${s.art}`}>
                      <Art className="h-[88%] w-auto max-w-full transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:px-3">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-2xl ${s.iconBg}`}>
                          {s.icon}
                        </span>
                        <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.6rem)] font-semibold text-ink">{a.title}</h3>
                      </div>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{a.description}</p>
                      <ul className="mt-auto flex flex-wrap gap-2 pt-4" aria-label="Бағыттың ерекшеліктері">
                        {a.tags.map((t) => (
                          <li key={t} className={`rounded-full px-3 py-1 text-[0.85rem] font-bold ${s.chip}`}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
