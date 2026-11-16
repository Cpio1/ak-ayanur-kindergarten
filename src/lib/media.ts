import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { galleryCaptions, galleryOrder } from "@/data/gallery";

// Страницы статические: fs читается только при сборке, трассировка не нужна.
const PUBLIC_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "public");
const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp"] as const;
const VIDEO_EXTS = [".mp4", ".webm", ".mov"] as const;

export type ImageAsset = {
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type VideoAsset = {
  kind: "video";
  src: string;
  mime: string;
  poster?: ImageAsset;
};

export type MediaAsset = ImageAsset | VideoAsset;

function readImage(relPath: string, alt: string): ImageAsset | null {
  const abs = path.join(/*turbopackIgnore: true*/ PUBLIC_DIR, relPath);
  try {
    const buf = fs.readFileSync(abs);
    const dim = imageSize(buf);
    if (!dim.width || !dim.height) return null;
    // EXIF-ориентация 5–8 означает, что ширина и высота поменяны местами.
    const rotated = dim.orientation !== undefined && dim.orientation >= 5;
    return {
      kind: "image",
      src: "/" + relPath.split(path.sep).join("/"),
      width: rotated ? dim.height : dim.width,
      height: rotated ? dim.width : dim.height,
      alt,
    };
  } catch {
    return null;
  }
}

function exists(relPath: string) {
  try {
    return fs.statSync(path.join(/*turbopackIgnore: true*/ PUBLIC_DIR, relPath)).isFile();
  } catch {
    return false;
  }
}

// Фото для hero / «Біз туралы» / логотип могут лежать и в /public/gallery.
const SEARCH_DIRS = ["", "images", "gallery"];

/** Именованные файлы с отдельным местом на сайте — в галерею не попадают. */
const RESERVED_BASENAMES = new Set(["main-page", "main-page2", "main-page2-poster", "logo", "ak-ayanur-logo"]);

/** Ищет изображение по базовому имени (порядок расширений = приоритет). */
export function findImage(baseName: string, alt: string): ImageAsset | null {
  for (const dir of SEARCH_DIRS) {
    for (const ext of IMAGE_EXTS) {
      const rel = path.join(/*turbopackIgnore: true*/ dir, baseName + ext);
      if (exists(rel)) {
        const img = readImage(rel, alt);
        if (img) return img;
      }
    }
  }
  return null;
}

const VIDEO_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

/** Ищет видео; при наличии изображения с тем же именем — использует его как poster. */
export function findMedia(baseName: string, alt: string): MediaAsset | null {
  for (const dir of SEARCH_DIRS) {
    for (const ext of VIDEO_EXTS) {
      const rel = path.join(/*turbopackIgnore: true*/ dir, baseName + ext);
      if (exists(rel)) {
        return {
          kind: "video",
          src: "/" + rel.split(path.sep).join("/"),
          mime: VIDEO_MIME[ext],
          poster: findImage(baseName, alt) ?? findImage(baseName + "-poster", alt) ?? undefined,
        };
      }
    }
  }
  return findImage(baseName, alt);
}

export function findLogo(): ImageAsset | null {
  for (const name of ["logo", "ak-ayanur-logo"]) {
    const img = findImage(name, "Ақ-Аянұр логотипі");
    if (img) return img;
  }
  return null;
}

function fileHash(relPath: string) {
  try {
    return crypto.createHash("sha1").update(fs.readFileSync(path.join(/*turbopackIgnore: true*/ PUBLIC_DIR, relPath))).digest("hex");
  } catch {
    return relPath;
  }
}

/**
 * Все фотографии из /public/gallery, кроме main-page / main-page2 / логотипа.
 * Одинаковые файлы (по содержимому) и одно имя в разных форматах показываются один раз.
 * Порядок: сначала файлы из galleryOrder, затем остальные по имени.
 */
export function getGalleryImages(): ImageAsset[] {
  const dir = path.join(/*turbopackIgnore: true*/ PUBLIC_DIR, "gallery");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const rank = (f: string) => {
    const i = galleryOrder.indexOf(f);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const seenHashes = new Set<string>();
  const seenNames = new Set<string>();
  return files
    .filter((f) => (IMAGE_EXTS as readonly string[]).includes(path.extname(f).toLowerCase()))
    .filter((f) => !RESERVED_BASENAMES.has(path.parse(f).name.toLowerCase()))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, "en", { numeric: true }))
    .filter((f) => {
      const name = path.parse(f).name.toLowerCase();
      const hash = fileHash(path.join("gallery", f));
      if (seenNames.has(name) || seenHashes.has(hash)) return false;
      seenNames.add(name);
      seenHashes.add(hash);
      return true;
    })
    .map((f, i) =>
      readImage(
        path.join("gallery", f),
        galleryCaptions[f] ?? `Ақ-Аянұр балабақшасы өмірінен көрініс ${i + 1}`,
      ),
    )
    .filter((x): x is ImageAsset => x !== null);
}
