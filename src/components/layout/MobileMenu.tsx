"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Clock3, Phone } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { kindergarten, navItems } from "@/data/kindergarten";
import { useScrollLock } from "@/hooks/useScrollLock";
import { WhatsAppIcon } from "../ui/BrandIcons";
import type { NavClick } from "./SiteHeader";

type Props = {
  open: boolean;
  onClose: () => void;
  active: string | null;
  href: (id: string) => string;
  onNavClick: NavClick;
};

const dots = ["bg-violet", "bg-peach", "bg-sun", "bg-mint", "bg-violet", "bg-peach", "bg-mint"];

export function MobileMenu({ open, onClose, active, href, onNavClick }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("a,button");
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
      }
      if (e.key === "Tab" && panel) {
        const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
        const focusables = [toggle, ...panel.querySelectorAll<HTMLElement>("a,button")].filter(Boolean) as HTMLElement[];
        const i = focusables.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        } else if (!e.shiftKey && i === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && onClose();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  // Портал в body: у шапки есть backdrop-filter, который иначе стал бы
  // containing block для position: fixed.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Сайт мәзірі"
            className="fixed inset-x-0 top-[var(--header-height)] z-50 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain rounded-b-[2rem] bg-cream shadow-lift"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative isolate overflow-hidden px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
              <nav aria-label="Мобильді мәзір">
                <ul className="grid gap-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05 }}
                    >
                      <a
                        href={href(item.id)}
                        onClick={(e) => onNavClick(e, item.id)}
                        aria-current={active === item.id ? "true" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-[1.05rem] font-bold ${
                          active === item.id ? "bg-lavender text-violet-ink" : "text-ink active:bg-white"
                        }`}
                      >
                        <span aria-hidden="true" className={`size-2.5 rounded-full ${dots[i]}`} />
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight aria-hidden="true" className="size-4 text-ink-soft" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={kindergarten.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-3 font-bold text-white"
                >
                  <WhatsAppIcon className="size-5" /> WhatsApp
                </a>
                <a
                  href={kindergarten.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-3 font-bold text-ink ring-2 ring-inset ring-violet/40"
                >
                  <Phone aria-hidden="true" className="size-5" /> Қоңырау
                </a>
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink-soft">
                <Clock3 aria-hidden="true" className="size-4" /> Жұмыс уақыты: {kindergarten.workingHours}
              </p>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

const noopSubscribe = () => () => {};
