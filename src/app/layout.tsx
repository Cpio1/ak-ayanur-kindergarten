import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { findImage } from "@/lib/media";
import { seo, siteUrl } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен: в нём ғ, қ, ң, ә, ө, ү, һ (в базовом cyrillic их нет).
const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

const ogImage = findImage("main-page", "Ақ-Аянұр балабақшасы");

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
    <html lang="kk" className={`no-js ${manrope.variable} ${unbounded.variable}`} suppressHydrationWarning>
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
