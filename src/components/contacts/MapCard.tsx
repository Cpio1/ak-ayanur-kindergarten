import { MapPin, Navigation } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { PrimaryButton } from "../ui/PrimaryButton";

/**
 * Карта 2GIS. Если в data/kindergarten.ts указан реальный firmId и координаты —
 * показывается встроенный виджет 2GIS. Иначе — схематичная карточка-указатель
 * (не настоящая карта) и кнопка, открывающая поиск адреса в 2GIS.
 */
export function MapCard() {
  const w = kindergarten.map.widget;
  return (
    <div className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[2rem_3rem_2rem_2rem] bg-[#F3EEE4] shadow-soft ring-[5px] ring-white">
      {w ? (
        <iframe
          title={`2GIS картасы: ${kindergarten.address}`}
          src={`https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
            JSON.stringify({ pos: { lat: w.lat, lon: w.lon, zoom: 16 }, opt: { city: "almaty" }, org: w.firmId }),
          )}`}
          className="block h-full min-h-[18rem] w-full flex-1 border-0"
          loading="lazy"
        />
      ) : (
        <div className="relative flex-1" aria-hidden="true">
          <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <rect width="400" height="260" fill="#F3EEE4" />
            <path d="M0 70 H400 M0 180 H400 M90 0 V260 M260 0 V260" stroke="#fff" strokeWidth="18" />
            <path d="M-20 250 L420 20" stroke="#fff" strokeWidth="12" />
            <rect x="110" y="88" width="130" height="74" rx="10" fill="#E5F5E7" />
            <rect x="280" y="90" width="100" height="70" rx="10" fill="#EDE5FF" />
            <rect x="12" y="92" width="62" height="70" rx="10" fill="#FFF1C9" />
            <rect x="280" y="198" width="100" height="50" rx="10" fill="#FFE3E8" />
            <circle cx="175" cy="125" r="44" fill="#9C83DD" opacity=".16" />
          </svg>
          <div className="absolute left-[44%] top-[48%] -translate-x-1/2 -translate-y-full">
            <span className="grid size-14 place-items-center rounded-full rounded-br-none bg-violet-deep text-white shadow-lift rotate-45">
              <MapPin className="size-7 -rotate-45" />
            </span>
          </div>
        </div>
      )}
      <div className="relative z-10 m-3 flex flex-col gap-3 rounded-[1.5rem] bg-white/95 p-4 shadow-soft sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink-soft">{kindergarten.name} мекенжайы</p>
          <p className="mt-0.5 font-bold leading-snug text-ink">{kindergarten.addressShort}</p>
        </div>
        <PrimaryButton href={kindergarten.map.searchHref} external size="sm" variant="sun" icon={<Navigation className="size-4" />} className="shrink-0">
          Картадан көру
        </PrimaryButton>
      </div>
    </div>
  );
}
