import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { DecorativeShape } from "@/components/ui/DecorativeShape";
import { findLogo, getGalleryImages } from "@/lib/media";

export const metadata: Metadata = {
  title: "Галерея | Ақ-Аянұр балабақшасы",
  description: "Ақ-Аянұр балабақшасы өмірінен көріністер — фотосуреттер галереясы.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const logo = findLogo();
  const images = getGalleryImages();
  return (
    <>
      <SiteHeader logo={logo} isHome={false} />
      <main id="main" className="relative isolate min-h-[calc(100svh-var(--header-height))] bg-cream pb-16 pt-6 sm:pt-10">
        <DecorativeShape variant="sun" className="right-[3%] top-4 size-14 sm:size-16" />
        <div className="container-site">
          <Link href="/#gallery" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink shadow-soft hover:text-violet-ink">
            <ArrowLeft aria-hidden="true" className="size-4" /> Артқа
          </Link>
          <h1 className="section-title mt-4 text-ink">Біздің галерея</h1>
          <p className="lead mt-2">Балабақша өмірінен көріністер{images.length ? ` · ${images.length} фотосурет` : ""}</p>
          <div className="mt-6 sm:mt-8">
            {images.length ? (
              <GalleryClient images={images} mode="full" />
            ) : (
              <p className="flex items-center gap-3 rounded-3xl bg-white p-6 font-semibold text-ink-soft shadow-soft">
                <ImageIcon aria-hidden="true" className="size-6 text-mint-deep" /> Фотосуреттер жақын арада жарияланады.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer logo={logo} isHome={false} />
    </>
  );
}
