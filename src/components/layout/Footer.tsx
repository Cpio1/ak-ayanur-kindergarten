import { MapPin, Phone } from "lucide-react";
import { kindergarten, navItems } from "@/data/kindergarten";
import type { ImageAsset } from "@/lib/media";
import { InstagramIcon } from "../ui/BrandIcons";
import { Logo } from "../ui/Logo";
import { SectionWave } from "../ui/SectionWave";

export function Footer({ logo, isHome = true }: { logo: ImageAsset | null; isHome?: boolean }) {
  const year = new Date().getFullYear();
  const base = isHome ? "" : "/";
  return (
    <footer className="relative bg-cream-deep pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 text-ink">
      <SectionWave color="#FBF1E2" flip />
      <div className="container-site grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="min-w-0">
          <a href={isHome ? "#top" : "/"} className="inline-block rounded-xl" aria-label={`${kindergarten.siteName} — басты бетке өту`}>
            <Logo logo={logo} />
          </a>
          <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">{kindergarten.slogan}</p>
        </div>
        <nav aria-label="Төменгі мәзір" className="min-w-0">
          <p className="font-display font-semibold">Бөлімдер</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`${base}#${n.id}`} className="inline-flex min-h-9 items-center text-[0.95rem] font-semibold text-ink-soft hover:text-violet-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <p className="font-display font-semibold">Байланыс</p>
          <ul className="mt-3 grid gap-2 text-[0.95rem] text-ink-soft">
            <li className="flex gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-peach-deep" />
              <span>{kindergarten.address}</span>
            </li>
            <li>
              <a href={kindergarten.phoneHref} className="inline-flex min-h-9 items-center gap-2 font-semibold hover:text-violet-ink">
                <Phone aria-hidden="true" className="size-4 text-violet-deep" /> {kindergarten.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={kindergarten.instagramHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 font-semibold hover:text-violet-ink">
                <InstagramIcon className="size-4 text-peach-deep" /> @{kindergarten.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site mt-8 flex flex-col gap-1 border-t border-ink/10 pt-4 text-sm text-ink-soft sm:flex-row sm:justify-between">
        <p>© {year} {kindergarten.legalName}</p>
        <p>Жұмыс уақыты: {kindergarten.workingHours}</p>
      </div>
    </footer>
  );
}
