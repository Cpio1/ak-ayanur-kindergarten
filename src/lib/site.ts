/** Публичный адрес сайта: задайте NEXT_PUBLIC_SITE_URL после подключения домена. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const seo = {
  title: "Ақ-Аянұр балабақшасы | Алматы",
  description:
    "Алматы қаласындағы «Ақ-Аянұр» балабақшасы. 2–6 жас аралығындағы балалар, 3 топ, қазақ тілінде тәрбие, күніне 5 мезгіл тамақтану.",
};
