import type { ImageAsset } from "@/lib/media";
import { Thumb } from "./Thumb";

// Раскладка для 6 фото: крупное, высокое, широкие — разные пропорции без выхода за экран.
const cells = ["col-span-2 row-span-2", "", "row-span-2", "", "col-span-2", "col-span-2"];
const radii = [
  "rounded-[2rem_0.75rem_0.75rem_0.75rem]",
  "rounded-xl",
  "rounded-[0.75rem_2rem_0.75rem_0.75rem]",
  "rounded-xl",
  "rounded-[0.75rem_0.75rem_0.75rem_2rem]",
  "rounded-[0.75rem_0.75rem_2rem_0.75rem]",
];
const radii4 = [
  "rounded-[2rem_0.75rem_0.75rem_0.75rem]",
  "rounded-xl",
  "rounded-xl",
  "rounded-[0.75rem_2rem_0.75rem_0.75rem]",
];
const cellSizes = ["(min-width: 1200px) 600px, 50vw", "(min-width: 1200px) 300px, 25vw", "(min-width: 1200px) 300px, 25vw", "(min-width: 1200px) 300px, 25vw", "(min-width: 1200px) 600px, 50vw", "(min-width: 1200px) 600px, 50vw"];

export function DesktopGallery({ images, onOpen }: { images: ImageAsset[]; onOpen: (i: number, opener?: HTMLElement) => void }) {
  const shown = images.slice(0, 6);
  if (shown.length === 6) {
    return (
      <ul className="hidden grid-cols-4 grid-rows-[repeat(3,clamp(7rem,17vh,11.5rem))] gap-[clamp(0.6rem,1.2vw,1rem)] md:grid">
        {shown.map((img, i) => (
          <li key={img.src} className={`min-w-0 ${cells[i]}`}>
            <Thumb img={img} index={i} onOpen={onOpen} sizes={cellSizes[i]} className={radii[i]} />
          </li>
        ))}
      </ul>
    );
  }
  // 4 фото (и любое другое число): ровный ряд, 2 колонки на планшете и 4 на десктопе.
  // Высота ячейки ограничена от высоты экрана — фото не бывают слишком крупными.
  const cols = shown.length >= 4 ? "md:grid-cols-2 lg:grid-cols-4" : shown.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`hidden gap-[clamp(0.6rem,1.2vw,1rem)] md:grid ${cols}`}>
      {shown.map((img, i) => (
        <li key={img.src} className="aspect-[4/3] max-h-[min(22rem,40svh)] min-w-0">
          <Thumb img={img} index={i} onOpen={onOpen} sizes="(min-width: 1200px) 300px, (min-width: 1024px) 25vw, 50vw" className={radii4[i % 4]} />
        </li>
      ))}
    </ul>
  );
}
