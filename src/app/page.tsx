import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { DesktopHero } from "@/components/hero/DesktopHero";
import { MobileHero } from "@/components/hero/MobileHero";
import { AboutSection } from "@/components/about/AboutSection";
import { GroupsSection } from "@/components/groups/GroupsSection";
import { NutritionSection } from "@/components/nutrition/NutritionSection";
import { ActivitiesSection } from "@/components/activities/ActivitiesSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { DocumentsSection } from "@/components/documents/DocumentsSection";
import { ContactsSection } from "@/components/contacts/ContactsSection";
import { findImage, findLogo, findMedia, getGalleryImages } from "@/lib/media";

export default function HomePage() {
  // main-page → главный экран; main-page2 (фото или видео) → «Біз туралы». Не путать.
  const heroMedia = findImage("main-page", "Ақ-Аянұр балабақшасының түрлі түсті ғимараты мен ауласы");
  const aboutMedia = findMedia("main-page2", "Ақ-Аянұр балабақшасының жарық әрі жайлы топ бөлмесі");
  const logo = findLogo();
  const gallery = getGalleryImages();

  return (
    <>
      <SiteHeader logo={logo} />
      <main id="main">
        <section id="top" aria-label="Басты экран" className="relative isolate overflow-hidden bg-cream">
          {/* мягкие цветовые акценты фона — небольшие и за контентом */}
          <div aria-hidden="true" className="deco -left-16 top-24 -z-10 size-48 rounded-full bg-rose/70 blur-3xl" />
          <div aria-hidden="true" className="deco bottom-0 right-[30%] -z-10 hidden size-56 rounded-full bg-sun-soft blur-3xl lg:block" />
          <DesktopHero media={heroMedia} />
          <MobileHero media={heroMedia} />
        </section>
        <AboutSection media={aboutMedia} />
        <GroupsSection />
        <NutritionSection />
        <ActivitiesSection />
        <GallerySection images={gallery} />
        <DocumentsSection />
        <ContactsSection />
      </main>
      <Footer logo={logo} />
    </>
  );
}
