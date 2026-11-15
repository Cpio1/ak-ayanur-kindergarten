/** Прокрутка к секции с учётом шапки (scroll-padding-top на html) и reduced motion. */
export function scrollToSection(id: string, opts: { updateHash?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (opts.updateHash !== false) {
    const hash = id === "top" ? " " : `#${id}`;
    history.pushState(null, "", hash === " " ? window.location.pathname : hash);
  }
  // Переводим фокус для клавиатуры/скринридеров, не сбивая прокрутку.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}
