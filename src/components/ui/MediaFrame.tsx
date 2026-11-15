import Image from "next/image";
import type { MediaAsset } from "@/lib/media";
import { SunnyScene } from "./SunnyScene";
import { AboutVideo } from "../about/AboutVideo";

type Props = {
  media: MediaAsset | null;
  variant: "hero" | "about";
  sizes: string;
  priority?: boolean;
  className?: string;
  /** object-position для кадрирования (лица обычно в верхней трети кадра) */
  position?: string;
};

/** Показывает фото / видео / иллюстрацию в органической рамке, заполняя родителя. */
export function MediaFrame({ media, variant, sizes, priority, className = "", position = "50% 35%" }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-lavender ${className}`}>
      {media?.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : media?.kind === "video" ? (
        <AboutVideo video={media} sizes={sizes} />
      ) : (
        <SunnyScene variant={variant} />
      )}
    </div>
  );
}
