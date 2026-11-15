"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { kindergarten } from "@/data/kindergarten";
import type { ImageAsset } from "@/lib/media";
import { Logo } from "../ui/Logo";
import { MobileMenu } from "./MobileMenu";
import type { NavClick } from "./SiteHeader";

type Props = {
  logo: ImageAsset | null;
  active: string | null;
  href: (id: string) => string;
  onNavClick: NavClick;
  isHome: boolean;
};

export function MobileHeader({ logo, active, href, onNavClick, isHome }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <a
          href={isHome ? "#top" : "/"}
          onClick={(e) => {
            setOpen(false);
            onNavClick(e, "top");
          }}
          className="min-w-0 rounded-xl"
          aria-label={`${kindergarten.siteName} — басты бетке өту`}
        >
          <Logo logo={logo} compact />
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Мәзірді жабу" : "Мәзірді ашу"}
          className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-colors ${
            open ? "bg-violet-deep text-white" : "bg-white text-ink ring-1 ring-violet/25"
          }`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        active={active}
        href={href}
        onNavClick={(e, id) => {
          setOpen(false);
          onNavClick(e, id);
        }}
      />
    </div>
  );
}
