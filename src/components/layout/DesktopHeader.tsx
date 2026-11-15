import { navItems, kindergarten } from "@/data/kindergarten";
import type { ImageAsset } from "@/lib/media";
import { Logo } from "../ui/Logo";
import { WhatsAppIcon } from "../ui/BrandIcons";
import type { NavClick } from "./SiteHeader";

type Props = {
  logo: ImageAsset | null;
  active: string | null;
  href: (id: string) => string;
  onNavClick: NavClick;
  isHome: boolean;
};

export function DesktopHeader({ logo, active, href, onNavClick, isHome }: Props) {
  return (
    <div className="container-site hidden h-[72px] items-center justify-between gap-4 lg:flex">
      <a
        href={isHome ? "#top" : "/"}
        onClick={(e) => onNavClick(e, "top")}
        className="shrink-0 rounded-xl"
        aria-label={`${kindergarten.siteName} — басты бетке өту`}
      >
        <Logo logo={logo} />
      </a>
      <nav aria-label="Негізгі мәзір" className="min-w-0">
        <ul className="flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  onClick={(e) => onNavClick(e, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-2.5 text-[0.93rem] font-bold transition-colors xl:px-3.5 ${
                    isActive ? "bg-lavender text-violet-ink" : "text-ink-soft hover:bg-white hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <a
        href={kindergarten.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#1f8f4e] px-3 text-[0.93rem] font-bold text-white shadow-[0_8px_20px_-10px_rgb(31_143_78/0.8)] transition hover:-translate-y-0.5 hover:bg-[#187a41] xl:px-4"
        aria-label="WhatsApp арқылы жазу"
      >
        <WhatsAppIcon className="size-5" />
        <span className="hidden xl:inline">WhatsApp</span>
      </a>
    </div>
  );
}
