/**
 * Документы детского сада.
 * Чтобы опубликовать документ, добавьте объект в массив `documents`:
 *  - PDF или изображение: положите файл в /public/documents и укажите url: "/documents/имя-файла.pdf"
 *  - Google Drive: укажите полную ссылку "https://drive.google.com/..." и type: "external"
 * Карточки появятся на сайте автоматически.
 */
export type KindergartenDocument = {
  id: string;
  title: string;
  url: string;
  type: "pdf" | "image" | "external";
  description?: string;
};

export const documents: KindergartenDocument[] = [];
