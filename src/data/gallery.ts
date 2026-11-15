/**
 * Подписи для фотографий галереи (необязательно).
 * Фотографии берутся автоматически из папки /public/gallery
 * (форматы: .jpg, .jpeg, .png, .webp), сортируются по имени файла.
 * Ключ — имя файла, значение — описание для alt.
 */
export const galleryCaptions: Record<string, string> = {};

/** Сколько фотографий показывать на главной странице. */
export const GALLERY_PREVIEW_COUNT = 6;
