import type { ImageAsset } from "@/lib/media";
import { Thumb } from "./Thumb";

/** Мобильная сетка в 2 колонки: первое фото широкое, остальные квадратные. */
export function MobileGallery({ images, onOpen }: { images: ImageAsset[]; onOpen: (i: number, opener?: HTMLElement) => void }) {
  const shown = images.slice(0, 5);
  return (
    <ul className="grid grid-cols-2 gap-2 xs:gap-2.5 md:hidden">
      {shown.map((img, i) => {
        const wide = i === 0 && shown.length !== 2 && shown.length !== 4;
        return (
          <li key={img.src} className={`min-w-0 ${wide ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}>
            <Thumb
              img={img}
              index={i}
              onOpen={onOpen}
              sizes={wide ? "100vw" : "50vw"}
              className={wide ? "rounded-[1.5rem_1.5rem_0.75rem_0.75rem]" : "rounded-2xl"}
            />
          </li>
        );
      })}
    </ul>
  );
}
