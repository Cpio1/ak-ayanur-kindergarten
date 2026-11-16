import type { Metadata, Viewport } from "next";
import { Montserrat, Onest } from "next/font/google";
import { Providers } from "@/components/Providers";
import { findImage } from "@/lib/media";
import { seo, siteUrl } from "@/lib/site";
import "./globals.css";

// Шрифты выбраны по реальному покрытию глифов (проверено по cmap woff2-файлов Google Fonts):
// у Manrope и Unbounded нет ә, ғ, қ, ң, ұ (у Unbounded — и ө, ү, һ), браузер подставлял
// системный шрифт, и эти буквы выглядели «заглавными». Onest и Montserrat содержат все
// казахские буквы: ә ғ қ ң ө ү һ — в cyrillic-ext, ұ і — в cyrillic. Оба сабсета обязательны.
const onest = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-onest",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const ogImage = findImage("main-page", "Ақ-Аянұр балабақшасының ғимараты");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: "Ақ-Аянұр балабақшасы",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    url: "/",
    siteName: "Ақ-Аянұр балабақшасы",
    title: seo.title,
    description: seo.description,
    ...(ogImage ? { images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }] } : {}),
  },
  twitter: { card: ogImage ? "summary_large_image" : "summary", title: seo.title, description: seo.description },
};

// Только светлая тема: "only light" также запрещает браузерам авто-затемнение страницы.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF9F0",
  colorScheme: "only light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk" className={`no-js ${onest.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Убирает .no-js до отрисовки: без JS reveal-анимации не скрывают контент.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }}
        />
      </head>
      <body className="min-h-dvh bg-cream font-sans text-ink">
        <a
          href="#main"
          className="fixed left-3 top-3 z-[200] -translate-y-24 rounded-full bg-violet-deep px-4 py-2.5 font-bold text-white transition focus:translate-y-0"
        >
          Негізгі мазмұнға өту
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
