import { groups, kindergarten } from "@/data/kindergarten";
import { DecorativeShape } from "../ui/DecorativeShape";
import { Reveal } from "../ui/Reveal";
import { GroupIllustration } from "./GroupIllustration";
import { groupNote, groupTones } from "./groupTones";

const radii = ["rounded-[2rem_2rem_2rem_0.75rem]", "rounded-[2.5rem_0.75rem_2.5rem_2.5rem]", "rounded-[0.75rem_2rem_2rem_2rem]"];
const shapes = ["sparkle", "flower", "star"] as const;

export function DesktopGroups() {
  return (
    <ul className="mt-[clamp(1.5rem,4vh,2.75rem)] hidden gap-[clamp(1rem,2vw,1.75rem)] md:grid md:grid-cols-3">
      {groups.map((g, i) => {
        const t = groupTones[g.tone];
        return (
          <li key={g.id} className="min-w-0">
            <Reveal delay={i * 0.08} className="h-full">
              <article
                className={`group relative isolate flex h-full flex-col items-center overflow-hidden p-[clamp(1.25rem,2.4vw,2rem)] text-center ring-1 ring-inset transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-lift ${t.card} ${t.ring} ${radii[i]}`}
              >
                <DecorativeShape variant={shapes[i]} color={t.accent} accent="#FFD56B" className="right-4 top-4 size-6 opacity-80" />
                <span className={`absolute left-4 top-4 grid size-10 place-items-center rounded-full font-display text-lg font-semibold ${t.badge}`}>
                  {g.number}
                </span>
                <GroupIllustration
                  n={g.number}
                  className="h-[clamp(5.5rem,14vh,8rem)] w-auto transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
                />
                <h3 className="mt-3 font-display text-[clamp(1.3rem,1.8vw,1.6rem)] font-semibold text-ink">{g.title}</h3>
                <p className="mt-1.5 text-[0.95rem] font-semibold text-ink-soft">
                  <span className="block">{groupNote}</span>
                    <span className="mt-0.5 block text-[0.85rem] font-bold text-ink/70">{kindergarten.workingHours}</span>
                </p>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
