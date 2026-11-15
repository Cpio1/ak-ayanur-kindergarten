"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/lib/media";

/**
 * Видео для раздела «Біз туралы»: muted + playsInline для автозапуска,
 * кнопка паузы/воспроизведения (автозапуск может быть заблокирован браузером).
 * При reduced motion видео не запускается автоматически.
 */
export function AboutVideo({ video, sizes }: { video: VideoAsset; sizes: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => setPlaying(false));
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  return (
    <>
      {video.poster ? (
        <Image src={video.poster.src} alt="" fill sizes={sizes} className="object-cover" aria-hidden="true" />
      ) : null}
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster?.src}
        aria-label="Ақ-Аянұр балабақшасы туралы бейне"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={video.src} type={video.mime} />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Бейнені тоқтату" : "Бейнені қосу"}
        className="absolute bottom-4 left-4 z-10 grid size-12 place-items-center rounded-full bg-white/90 text-violet-ink shadow-soft backdrop-blur transition hover:scale-105"
      >
        {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
      </button>
    </>
  );
}
