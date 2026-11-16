import { ArrowRight, ImageIcon } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { galleryPreviewCount } from "@/data/gallery";
import type { ImageAsset } from "@/lib/media";
import { DecorativeShape } from "../ui/DecorativeShape";
import { InstagramIcon } from "../ui/BrandIcons";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionWave } from "../ui/SectionWave";
import { GalleryClient } from "./GalleryClient";

export function GallerySection({ images }: { images: ImageAsset[] }) {
  const has = images.length > 0;
  const preview = images.slice(0, galleryPreviewCount(images.length));
  return (
    <section id="gallery" aria-labelledby="gallery-title" className={`section bg-cream ${has ? "" : "section-screen"}`}>
      <SectionWave color="#FFF9F0" />
      <DecorativeShape variant="sun" className="right-[3%] top-[5%] hidden size-14 md:block" />
      <div className="container-site">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="gallery-title" eyebrow="Галерея" tone="mint" title="Біздің галерея" subtitle="Балабақша өмірінен көріністер" />
          {has ? (
            // Обёртка: базовый inline-flex кнопки перебивает класс hidden на ней самой.
            <div className="hidden shrink-0 md:block">
              <PrimaryButton href="/gallery" variant="outline" size="sm" icon={<ArrowRight className="size-4" />} className="flex-row-reverse">
                Барлық фотосуреттер ({images.length})
              </PrimaryButton>
            </div>
          ) : null}
        </Reveal>

        <div className="mt-[clamp(1.25rem,3.5vh,2.25rem)]">
          {has ? (
            <Reveal delay={0.08}>
              <GalleryClient images={preview} mode="preview" />
            </Reveal>
          ) : (
            <Reveal delay={0.08}>
              <div className="relative isolate mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-[2rem] bg-white px-6 py-[clamp(2rem,6vh,3.5rem)] text-center shadow-soft">
                <DecorativeShape variant="flower" color="#EDE5FF" accent="#FFD56B" className="-left-4 -top-4 size-20" />
                <DecorativeShape variant="petal" color="#E5F5E7" className="-bottom-3 -right-2 size-16 rotate-45" />
                <span aria-hidden="true" className="grid size-16 place-items-center rounded-3xl bg-mint-soft text-mint-deep">
                  <ImageIcon className="size-8" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-ink">Фотосуреттер жақын арада жарияланады</p>
                <p className="mt-2 max-w-md text-ink-soft">Балабақша өмірінен жаңалықтарды Instagram парақшамыздан көре аласыз.</p>
                <PrimaryButton href={kindergarten.instagramHref} external variant="primary" size="sm" className="mt-5" icon={<InstagramIcon className="size-5" />}>
                  @{kindergarten.instagram}
                </PrimaryButton>
              </div>
            </Reveal>
          )}
        </div>

        {has ? (
          <div className="mt-5 flex justify-center md:hidden">
            <PrimaryButton href="/gallery" variant="primary" size="sm" className="w-full max-w-sm">
              Барлық фотосуреттер ({images.length})
            </PrimaryButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
