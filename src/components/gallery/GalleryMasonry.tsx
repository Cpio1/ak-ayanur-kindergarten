import Image from "next/image";
import type { ImageAsset } from "@/lib/media";

/** Полная галерея: колонки с естественными пропорциями фото (без обрезки). */
export function GalleryMasonry({ images, onOpen }: { images: ImageAsset[]; onOpen: (i: number, opener?: HTMLElement) => void }) {
  return (
    <ul className="columns-2 gap-2.5 sm:gap-4 md:columns-3 xl:columns-4">
      {images.map((img, i) => (
        <li key={img.src} className="mb-2.5 break-inside-avoid sm:mb-4">
          <button
            type="button"
            onClick={(e) => onOpen(i, e.currentTarget)}
            aria-label={`Фотосуретті ашу: ${img.alt}`}
            className="group block w-full overflow-hidden rounded-2xl bg-lavender"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
              className="h-auto max-h-[70vh] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
