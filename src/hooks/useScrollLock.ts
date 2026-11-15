"use client";

import { useEffect } from "react";

let locks = 0;

/** Блокирует прокрутку фона, пока active = true; корректно работает при нескольких слоях. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    locks += 1;
    html.classList.add("scroll-locked");
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    return () => {
      locks -= 1;
      if (locks === 0) {
        html.classList.remove("scroll-locked");
        html.style.paddingRight = "";
      }
    };
  }, [active]);
}
