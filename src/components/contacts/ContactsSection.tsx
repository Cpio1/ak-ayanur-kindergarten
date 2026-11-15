import { Clock3, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { kindergarten } from "@/data/kindergarten";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { DecorativeShape } from "../ui/DecorativeShape";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionWave } from "../ui/SectionWave";
import { MapCard } from "./MapCard";

type Row = { icon: ReactNode; label: string; value: string; href?: string; external?: boolean; tone: string; wide?: boolean };

const rows: Row[] = [
  { icon: <MapPin className="size-5" />, label: "Мекенжай", value: `${kindergarten.address}.`, tone: "bg-peach-soft text-peach-deep", wide: true },
  { icon: <Phone className="size-5" />, label: "Телефон", value: kindergarten.phoneDisplay, href: kindergarten.phoneHref, tone: "bg-lavender text-violet-ink" },
  { icon: <Clock3 className="size-5" />, label: "Жұмыс уақыты", value: kindergarten.workingHours, tone: "bg-sun-soft text-sun-deep" },
  { icon: <InstagramIcon className="size-5" />, label: "Instagram", value: `@${kindergarten.instagram}`, href: kindergarten.instagramHref, external: true, tone: "bg-rose text-peach-deep" },
];

export function ContactsSection() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section section-screen bg-white">
      <SectionWave color="#FFFFFF" />
      <DecorativeShape variant="sparkle" color="#9C83DD" className="right-[4%] top-[8%] hidden size-6 lg:block" />
      <DecorativeShape variant="petal" color="#FFD56B" className="bottom-[6%] left-[2%] hidden size-10 rotate-[30deg] lg:block" />
      <div className="container-site grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <Reveal className="min-w-0">
          <SectionHeading id="contacts-title" eyebrow="Байланыс" tone="peach" title="Бізбен байланысыңыз" subtitle="Сұрақтарыңыз болса, бізге хабарласыңыз!" />
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {rows.map((r) => {
              const inner = (
                <>
                  <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-2xl ${r.tone}`}>
                    {r.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.8rem] font-bold text-ink-soft">{r.label}</span>
                    <span className="block font-bold leading-snug text-ink">{r.value}</span>
                  </span>
                </>
              );
              const cls = "flex h-full min-w-0 items-start gap-3 rounded-[1.25rem] bg-cream p-3 ring-1 ring-inset ring-ink/5";
              return (
                <li key={r.label} className={`min-w-0 ${r.wide ? "sm:col-span-3" : ""}`}>
                  {r.href ? (
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${cls} transition hover:bg-lavender-soft hover:ring-violet/30`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
            <PrimaryButton href={kindergarten.whatsappHref} external variant="whatsapp" icon={<WhatsAppIcon className="size-5" />} className="col-span-2 sm:col-span-1">
              WhatsApp арқылы жазу
            </PrimaryButton>
            <PrimaryButton href={kindergarten.phoneHref} variant="primary" icon={<Phone className="size-5" />}>
              Қоңырау шалу
            </PrimaryButton>
            <PrimaryButton href={kindergarten.instagramHref} external variant="outline" icon={<InstagramIcon className="size-5" />}>
              Instagram
            </PrimaryButton>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-w-0 lg:h-full">
          <div className="h-[clamp(18rem,48svh,26rem)] lg:h-full lg:min-h-[22rem]">
            <MapCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
