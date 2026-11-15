import { MessageCircle } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { SectionHeading } from "../ui/SectionHeading";
import { DecorativeShape } from "../ui/DecorativeShape";
import { SectionWave } from "../ui/SectionWave";
import { Reveal } from "../ui/Reveal";
import { DesktopGroups } from "./DesktopGroups";
import { MobileGroups } from "./MobileGroups";

export function GroupsSection() {
  return (
    <section id="groups" aria-labelledby="groups-title" className="section section-screen bg-white">
      <SectionWave color="#FFFFFF" flip />
      <DecorativeShape variant="sparkle" color="#FFD56B" className="left-[4%] top-[12%] hidden size-6 md:block" />
      <DecorativeShape variant="petal" color="#FFE3E8" className="bottom-[10%] right-[3%] hidden size-12 rotate-45 md:block" />
      <div className="container-site">
        <Reveal>
          <SectionHeading
            id="groups-title"
            eyebrow="Топтар"
            title="Біздің топтар"
            subtitle={`${kindergarten.ageRange.replace(" жас", "")} жас аралығындағы балаларға арналған ${kindergarten.groupCount} топ`}
            align="center"
          />
        </Reveal>
        <DesktopGroups />
        <MobileGroups />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-[clamp(1.25rem,3vh,2rem)] flex max-w-2xl flex-col items-center gap-3 text-center text-[0.95rem] font-semibold text-ink-soft sm:flex-row sm:justify-center">
            <span>Топтар туралы толық ақпаратты бізден сұраңыз</span>
            <a
              href={kindergarten.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lavender px-4 font-bold text-violet-ink transition hover:bg-violet hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp арқылы сұрау
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
