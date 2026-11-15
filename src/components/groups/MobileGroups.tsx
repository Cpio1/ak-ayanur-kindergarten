import { groups, kindergarten } from "@/data/kindergarten";
import { Reveal } from "../ui/Reveal";
import { GroupIllustration } from "./GroupIllustration";
import { groupNote, groupTones } from "./groupTones";

/** Мобильная версия: компактные горизонтальные карточки друг под другом (без карусели и горизонтального скролла). */
export function MobileGroups() {
  return (
    <ul className="mt-5 grid gap-3 md:hidden">
      {groups.map((g, i) => {
        const t = groupTones[g.tone];
        return (
          <li key={g.id}>
            <Reveal delay={i * 0.06} y={14}>
              <article className={`relative flex items-center gap-3 rounded-[1.6rem_1.6rem_1.6rem_0.6rem] p-3 pr-4 ring-1 ring-inset ${t.card} ${t.ring}`}>
                <div className="relative shrink-0 rounded-2xl bg-white/70 p-1">
                  <GroupIllustration n={g.number} className="h-16 w-[4.8rem]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.2rem] font-semibold text-ink">{g.title}</h3>
                  <p className="mt-0.5 text-[0.88rem] font-semibold leading-snug text-ink-soft">
                    <span className="block">{groupNote}</span>
                    <span className="mt-0.5 block text-[0.85rem] font-bold text-ink/70">{kindergarten.workingHours}</span>
                  </p>
                </div>
                <span aria-hidden="true" className={`grid size-9 shrink-0 place-items-center rounded-full font-display font-semibold ${t.badge}`}>
                  {g.number}
                </span>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
