import type { ReactNode } from "react";

export type Tone = "lavender" | "sun" | "mint" | "peach" | "rose";

const tones: Record<Tone, { bg: string; icon: string }> = {
  lavender: { bg: "bg-lavender", icon: "bg-violet text-white" },
  sun: { bg: "bg-sun-soft", icon: "bg-sun text-ink" },
  mint: { bg: "bg-mint-soft", icon: "bg-mint text-mint-deep" },
  peach: { bg: "bg-peach-soft", icon: "bg-peach text-ink" },
  rose: { bg: "bg-rose", icon: "bg-white text-peach-deep" },
};

type Props = { icon: ReactNode; value: ReactNode; label: string; tone: Tone; className?: string; stackOnMobile?: boolean };

/** Компактная карточка-показатель. */
export function InfoCard({ icon, value, label, tone, className = "", stackOnMobile = false }: Props) {
  const t = tones[tone];
  return (
    <div className={`flex min-w-0 gap-3 rounded-[1.4rem_1.4rem_1.4rem_0.6rem] p-3 ${stackOnMobile ? "flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3" : "items-center"} ${t.bg} ${className}`}>
      <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-2xl ${t.icon}`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className={`block whitespace-nowrap leading-tight text-ink ${stackOnMobile ? "text-[1.05rem] font-extrabold sm:font-display sm:text-[1.02rem] sm:font-semibold" : "font-display text-[1.02rem] font-semibold"}`}>{value}</span>
        <span className="block text-[0.85rem] font-semibold leading-snug text-ink-soft">{label}</span>
      </span>
    </div>
  );
}
