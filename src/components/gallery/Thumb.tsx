import Image from "next/image";
import { Expand } from "lucide-react";
import type { ImageAsset } from "@/lib/media";

type Props = { img: ImageAsset; index: number; onOpen: (i: number, opener?: HTMLElement) => void; sizes: string; className?: string };

/** Кнопка-миниатюра: заполняет свою ячейку, кадрирование с упором на верхнюю треть (лица). */
export function Thumb({ img, index, onOpen, sizes, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(index, e.currentTarget)}
      aria-label={`Фотосуретті ашу: ${img.alt}`}
      className={`group relative block h-full w-full overflow-hidden bg-lavender ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ objectPosition: "50% 32%" }}
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-white/95 text-violet-ink opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}
