"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { navItems } from "@/data/kindergarten";
import type { ImageAsset } from "@/lib/media";
import { scrollToSection } from "@/lib/scroll";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

const ids = navItems.map((n) => n.id);

export type NavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => void;

/**
 * Общая логика шапки: измеряет фактическую высоту (→ --header-height,
 * которую использует scroll-padding-top), перехватывает якорные переходы,
 * подсвечивает активный раздел. Разметка — отдельно для desktop и mobile.
 */
export function SiteHeader({ logo, isHome = true }: { logo: ImageAsset | null; isHome?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(ids, isHome);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty("--header-height", `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Прямой переход по URL с якорем: выравниваем после загрузки шрифтов.
    if (isHome && window.location.hash.length > 1) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      document.fonts?.ready.then(() =>
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" })),
      );
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const onNavClick: NavClick = useCallback(
    (e, id) => {
      if (!isHome) return; // на других страницах обычная ссылка "/#id"
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      // Даём меню закрыться и разблокировать прокрутку, затем скроллим.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
    },
    [isHome],
  );

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 supports-[backdrop-filter]:backdrop-blur-md ${
        scrolled
          ? "border-violet/15 bg-cream/88 shadow-[0_6px_24px_-16px_rgb(74_54_144/0.35)]"
          : "border-transparent bg-cream/70"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <DesktopHeader logo={logo} active={active} href={href} onNavClick={onNavClick} isHome={isHome} />
      <MobileHeader logo={logo} active={active} href={href} onNavClick={onNavClick} isHome={isHome} />
    </header>
  );
}
