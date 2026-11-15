import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "violet" | "sun" | "peach" | "mint";
  id?: string;
  className?: string;
};

const toneMap = {
  violet: "bg-white/80 text-violet-ink ring-violet/30",
  sun: "bg-white/80 text-sun-deep ring-sun",
  peach: "bg-white/80 text-peach-deep ring-peach/70",
  mint: "bg-white/80 text-mint-deep ring-mint",
};

const dotMap = { violet: "bg-violet", sun: "bg-sun", peach: "bg-peach", mint: "bg-mint" };

export function SectionHeading({ eyebrow, title, subtitle, align = "left", tone = "violet", id, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold ring-1 ${toneMap[tone]}`}
      >
        <span aria-hidden="true" className={`size-2 rounded-full ${dotMap[tone]}`} />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title mt-3 text-ink">
        {title}
      </h2>
      {subtitle ? <p className={`lead mt-3 ${center ? "mx-auto" : ""} max-w-xl`}>{subtitle}</p> : null}
    </div>
  );
}
