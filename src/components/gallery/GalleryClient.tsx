"use client";

import { useCallback, useRef, useState } from "react";
import type { ImageAsset } from "@/lib/media";
import { DesktopGallery } from "./DesktopGallery";
import { MobileGallery } from "./MobileGallery";
import { GalleryLightbox } from "./GalleryLightbox";
import { GalleryMasonry } from "./GalleryMasonry";

/** Общее состояние lightbox для превью (desktop/mobile) и полной галереи. */
export function GalleryClient({ images, mode }: { images: ImageAsset[]; mode: "preview" | "full" }) {
  const [index, setIndex] = useState<number | null>(null);
  // Safari не фокусирует кнопку по клику — запоминаем открывший элемент явно.
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((i: number, el?: HTMLElement) => {
    opener.current = el ?? null;
    setIndex(i);
  }, []);
  return (
    <>
      {mode === "preview" ? (
        <>
          <DesktopGallery images={images} onOpen={open} />
          <MobileGallery images={images} onOpen={open} />
        </>
      ) : (
        <GalleryMasonry images={images} onOpen={open} />
      )}
      <GalleryLightbox images={images} index={index} onClose={() => setIndex(null)} onIndex={setIndex} opener={opener} />
    </>
  );
}
