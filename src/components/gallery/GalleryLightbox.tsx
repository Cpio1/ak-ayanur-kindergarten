"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { ImageAsset } from "@/lib/media";
import { useScrollLock } from "@/hooks/useScrollLock";

type Props = {
  images: ImageAsset[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  opener?: RefObject<HTMLElement | null>;
};

const noopSubscribe = () => () => {};

/**
 * Полноэкранный просмотр: ←/→, Escape, свайп, ловушка фокуса,
 * блокировка фоновой прокрутки и возврат фокуса на открывшую миниатюру.
 */
export function GalleryLightbox({ images, index, onClose, onIndex, opener }: Props) {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useScrollLock(open);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndex((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    returnFocus.current = opener?.current ?? (document.activeElement as HTMLElement);
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => returnFocus.current?.focus({ preventScroll: true });
  }, [open, opener]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  if (!mounted) return null;
  const img = index !== null ? images[index] : null;
  const many = images.length > 1;

  return createPortal(
    <AnimatePresence>
      {img ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Фотосурет ${index! + 1} / ${images.length}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#241f33]/92 text-white backdrop-blur-sm"
          style={{ colorScheme: "only light" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && many) go(dx < 0 ? 1 : -1);
            else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
          }}
        >
          <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
            <p className="rounded-full bg-white/12 px-3 py-1.5 text-sm font-bold tabular-nums" aria-live="polite">
              {index! + 1} / {images.length}
            </p>
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Жабу"
              className="grid size-12 place-items-center rounded-full bg-white text-ink transition hover:scale-105"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={img.src}
                custom={dir}
                className="pointer-events-none absolute inset-x-2 inset-y-1 sm:inset-x-20"
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
            {many ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Алдыңғы фотосурет"
                  className="absolute left-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Келесі фотосурет"
                  className="absolute right-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            ) : null}
          </div>
          <p className="px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2 text-center text-sm text-white/80">{img.alt}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
