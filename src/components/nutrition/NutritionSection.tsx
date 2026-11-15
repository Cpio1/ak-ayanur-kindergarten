import { Apple, Coffee, Milk, Soup, Sprout } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { DecorativeShape } from "../ui/DecorativeShape";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionWave } from "../ui/SectionWave";

/**
 * 5 приёмов пищи — только нейтральные подписи «1-мезгіл»…«5-мезгіл»
 * (конкретное меню и время не подтверждены). Иконки — символические.
 */
const meals = [
  { icon: Coffee, bg: "bg-white", plate: "bg-sun", text: "text-ink" },
  { icon: Apple, bg: "bg-white", plate: "bg-peach", text: "text-ink" },
  { icon: Soup, bg: "bg-white", plate: "bg-mint", text: "text-mint-deep" },
  { icon: Sprout, bg: "bg-white", plate: "bg-lavender", text: "text-violet-ink" },
  { icon: Milk, bg: "bg-white", plate: "bg-rose", text: "text-peach-deep" },
];

// Смещения по вертикали — элементы выстраиваются по дуге «пути солнца» через день.
const arc = ["md:translate-y-10", "md:translate-y-3", "md:translate-y-0", "md:translate-y-3", "md:translate-y-10"];

export function NutritionSection() {
  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="section section-screen bg-[#FFF4D6]">
      <SectionWave color="#FFF4D6" />
      <DecorativeShape variant="rays" color="#FFD56B" className="left-[3%] top-[10%] hidden size-14 md:block" />
      <DecorativeShape variant="petal" color="#A9D9B0" className="bottom-[8%] right-[4%] hidden size-10 -rotate-12 md:block" />
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="nutrition-title"
            eyebrow="Тамақтану"
            tone="sun"
            align="center"
            title={"Дұрыс тамақтану\u00A0— денсаулық кепілі"}
            subtitle={
              <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <span className="grid size-[2.6rem] place-items-center rounded-full bg-sun font-display text-xl font-semibold text-ink shadow-soft">
                  {kindergarten.mealsPerDay}
                </span>
                <span className="font-extrabold text-ink">Күніне {kindergarten.mealsPerDay} мезгіл тамақтану</span>
              </span>
            }
          />
        </Reveal>

        <div className="relative mx-auto mt-[clamp(1.5rem,4vh,2.75rem)] max-w-5xl">
          {/* пунктирная дуга дня — только на широких экранах */}
          <svg aria-hidden="true" viewBox="0 0 1000 160" preserveAspectRatio="none" className="deco inset-x-[6%] top-[18%] hidden h-[45%] w-[88%] md:block">
            <path d="M10 150 Q500 -60 990 150" fill="none" stroke="#E0A800" strokeOpacity=".45" strokeWidth="3" strokeDasharray="4 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:grid md:grid-cols-5 md:gap-5 md:pb-10">
            {meals.map((m, i) => {
              const Icon = m.icon;
              return (
                <li key={i} className={`w-[calc((100%-1.5rem)/3)] max-w-[9rem] md:w-auto md:max-w-none ${arc[i]}`}>
                  <Reveal delay={i * 0.07} y={16} className="group flex flex-col items-center text-center">
                    <span className="relative grid aspect-square w-full max-w-[7.5rem] place-items-center rounded-full bg-white shadow-soft ring-[5px] ring-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3 md:max-w-[clamp(6rem,10vw,8.5rem)]">
                      <span className={`grid size-[72%] place-items-center rounded-full ${m.plate}`}>
                        <Icon aria-hidden="true" className={`size-[42%] ${m.text}`} strokeWidth={1.8} />
                      </span>
                      <span aria-hidden="true" className="absolute -right-1 top-1 grid size-6 place-items-center rounded-full bg-violet-deep text-[0.72rem] font-extrabold text-white md:size-7 md:text-xs">
                        {i + 1}
                      </span>
                    </span>
                    <span className="mt-2 font-display text-[0.95rem] font-semibold text-ink md:text-[1.05rem]">{i + 1}-мезгіл</span>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
