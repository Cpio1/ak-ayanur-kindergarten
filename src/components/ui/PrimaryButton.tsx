import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "whatsapp" | "outline" | "sun" | "ghost";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  icon?: ReactNode;
  size?: "md" | "sm";
  external?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-violet-deep text-white shadow-[0_10px_24px_-10px_rgb(93_69_173/0.7)] hover:bg-violet-ink",
  whatsapp: "bg-[#1f8f4e] text-white shadow-[0_10px_24px_-10px_rgb(31_143_78/0.7)] hover:bg-[#187a41]",
  sun: "bg-sun text-ink shadow-[0_10px_24px_-12px_rgb(200_140_0/0.7)] hover:bg-[#ffcb45]",
  outline: "bg-white text-ink ring-2 ring-inset ring-violet/45 hover:ring-violet-deep hover:text-violet-ink",
  ghost: "bg-white/70 text-ink ring-1 ring-inset ring-ink/10 hover:bg-white",
};

/** Кнопка-ссылка: всегда реальное действие (якорь, tel:, wa.me, внешняя ссылка). */
export function PrimaryButton({ variant = "primary", icon, size = "md", external, className = "", children, ...rest }: Props) {
  const sizing = size === "sm" ? "min-h-11 px-4 text-[0.95rem]" : "min-h-12 px-6 text-base";
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-[background-color,box-shadow,transform,color] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${sizing} ${variants[variant]} ${className}`}
    >
      {icon ? <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}
