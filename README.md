# Ақ-Аянұр балабақшасы — сайт

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Как добавить материалы (подхватываются автоматически при сборке)

| Что | Куда положить |
|---|---|
| Фото главного экрана | `public/main-page.png` (или `.jpg` / `.webp`) |
| Фото или видео «Біз туралы» | `public/main-page2.mp4` (+ `main-page2.jpg` как постер) или `public/main-page2.png` |
| Логотип (PNG с прозрачностью) | `public/logo.png` |
| Фотографии галереи | `public/gallery/*.jpg` — сортируются по имени (`01.jpg`, `02.jpg`, …) |
| Подписи к фото (необязательно) | `src/data/gallery.ts` → `galleryCaptions` |
| Документы | файл в `public/documents/` + запись в `src/data/documents.ts` (PDF, изображение или ссылка Google Drive) |
| Карта 2GIS | `src/data/kindergarten.ts` → `map.widget = { firmId, lat, lon }` из карточки организации в 2GIS |

Все данные садика (телефон, адрес, часы и т. д.) — в `src/data/kindergarten.ts`.
После добавления файлов нужен новый деплой (страницы собираются статически).

На Vercel задайте `NEXT_PUBLIC_SITE_URL` (например, `https://ak-ayanur.kz`) для канонических ссылок, sitemap и Open Graph.
