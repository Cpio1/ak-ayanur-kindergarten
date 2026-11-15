/**
 * Единый источник данных о детском саде.
 * Все компоненты берут значения отсюда — меняйте информацию только в этом файле.
 */
const phoneDigits = "77477061185";
const whatsappMessage = "Сәлеметсіз бе! Ақ-Аянұр балабақшасы туралы ақпарат алғым келеді.";

export const kindergarten = {
  name: "Ақ-Аянұр",
  siteName: "Ақ-Аянұр балабақшасы",
  legalName: "ТОО «Ақ-Аянұр»",
  slogan: "Бақытты балалық шақтың шуақты мекені!",
  description: "2–6 жас аралығындағы балаларға арналған қазақ тіліндегі балабақша.",
  city: "Алматы",
  address:
    "Алматы қаласы, Наурызбай ауданы, Шұғыла ықшам ауданы, Сұраншы батыр көшесі, 85",
  addressShort: "Шұғыла ы/а, Сұраншы батыр көшесі, 85",
  phone: `+${phoneDigits}`,
  phoneDisplay: "+7 747 706 1185",
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`,
  instagram: "ak_ayanur",
  instagramHref: "https://www.instagram.com/ak_ayanur/",
  workingHours: "07:30–18:00",
  groupCount: 3,
  ageRange: "2–6 жас",
  language: "Қазақ тілі",
  mealsPerDay: 5,
  activities: ["Хореография", "Таэквондо"],
  map: {
    /** Ссылка поиска адреса в 2GIS (открывается в новой вкладке). */
    searchHref: `https://2gis.kz/almaty/search/${encodeURIComponent(
      "Сураншы батыра, 85, Шугыла, Алматы",
    )}`,
    /**
     * Встроенный виджет 2GIS появится автоматически, если указать
     * реальный ID организации из 2GIS и её координаты.
     * Пример: { firmId: "70000001...", lat: 43.2, lon: 76.8 }
     */
    widget: null as null | { firmId: string; lat: number; lon: number },
  },
} as const;

export const navItems = [
  { id: "about", label: "Біз туралы" },
  { id: "groups", label: "Топтар" },
  { id: "nutrition", label: "Тамақтану" },
  { id: "activities", label: "Үйірмелер" },
  { id: "gallery", label: "Галерея" },
  { id: "documents", label: "Құжаттар" },
  { id: "contacts", label: "Байланыс" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

export const groups = [
  { id: "g1", number: 1, title: "1-топ", tone: "lavender" },
  { id: "g2", number: 2, title: "2-топ", tone: "peach" },
  { id: "g3", number: 3, title: "3-топ", tone: "green" },
] as const;

export const activities = [
  {
    id: "choreography",
    title: "Хореография",
    description:
      "Би арқылы балалардың қимыл-қозғалысын, ырғақ сезімін және шығармашылық қабілеттерін дамыту.",
    tags: ["Ырғақ", "Қимыл", "Шығармашылық"],
    tone: "dance",
  },
  {
    id: "taekwondo",
    title: "Таэквондо",
    description:
      "Балалардың ептілігін, үйлесімді қозғалысын және тәртіпке деген дағдыларын дамытуға бағытталған жаттығулар.",
    tags: ["Ептілік", "Үйлесім", "Тәртіп"],
    tone: "sport",
  },
] as const;

/** Показатели главного экрана — вычисляются из основных данных. */
export const heroStats = [
  { key: "groups", value: `${kindergarten.groupCount} топ`, label: "балабақшада", tone: "lavender" },
  { key: "age", value: kindergarten.ageRange, label: "балалар жасы", tone: "peach" },
  { key: "meals", value: `${kindergarten.mealsPerDay} мезгіл`, label: "тамақтану", tone: "mint" },
] as const;
