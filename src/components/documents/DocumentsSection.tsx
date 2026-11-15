import { ExternalLink, FileText, FolderOpen, ImageIcon } from "lucide-react";
import { documents, type KindergartenDocument } from "@/data/documents";
import { DecorativeShape } from "../ui/DecorativeShape";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionWave } from "../ui/SectionWave";

const typeMeta: Record<KindergartenDocument["type"], { icon: typeof FileText; label: string; tone: string }> = {
  pdf: { icon: FileText, label: "PDF құжат", tone: "bg-peach-soft text-peach-deep" },
  image: { icon: ImageIcon, label: "Сурет", tone: "bg-mint-soft text-mint-deep" },
  external: { icon: ExternalLink, label: "Сілтеме", tone: "bg-lavender text-violet-ink" },
};

/** Карточки появляются автоматически при добавлении записей в src/data/documents.ts */
export function DocumentsSection() {
  const has = documents.length > 0;
  return (
    <section id="documents" aria-labelledby="documents-title" className="section section-screen bg-lavender">
      <SectionWave color="#EDE5FF" flip />
      <DecorativeShape variant="star" color="#FFD56B" className="left-[5%] top-[14%] hidden size-7 md:block" />
      <DecorativeShape variant="cloud" color="#FFFFFF" className="bottom-[10%] right-[5%] hidden h-12 w-20 md:block" />
      <div className="container-site">
        <Reveal>
          <SectionHeading id="documents-title" eyebrow="Ресми ақпарат" align="center" title="Құжаттар" subtitle="Балабақша құжаттары" />
        </Reveal>
        <Reveal delay={0.08} className="mt-[clamp(1.25rem,4vh,2.5rem)]">
          {has ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-3 sm:gap-4">
              {documents.map((d) => {
                const m = typeMeta[d.type];
                const Icon = m.icon;
                return (
                  <li key={d.id} className="min-w-0">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start gap-3 rounded-[1.5rem_1.5rem_1.5rem_0.6rem] bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                    >
                      <span aria-hidden="true" className={`grid size-12 shrink-0 place-items-center rounded-2xl ${m.tone}`}>
                        <Icon className="size-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold leading-snug text-ink">{d.title}</span>
                        {d.description ? <span className="mt-1 block text-sm text-ink-soft">{d.description}</span> : null}
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-violet-ink">
                          {m.label} — ашу <ExternalLink aria-hidden="true" className="size-3.5" />
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="relative isolate mx-auto flex max-w-xl flex-col items-center rounded-[2rem_2rem_2rem_0.75rem] bg-white px-6 py-[clamp(1.75rem,5vh,3rem)] text-center shadow-soft">
              <span aria-hidden="true" className="relative grid size-16 place-items-center rounded-3xl bg-lavender text-violet-ink">
                <FolderOpen className="size-8" />
                <span className="absolute -right-1.5 -top-1.5 size-4 rounded-full bg-sun ring-4 ring-white" />
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-ink">Құжаттар жақын арада жарияланады.</p>
              <p className="mt-2 max-w-sm text-[0.95rem] text-ink-soft">Сұрақтарыңыз болса, бізге телефон немесе WhatsApp арқылы хабарласыңыз.</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
