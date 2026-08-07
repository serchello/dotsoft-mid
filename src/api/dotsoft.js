// Базовый URL: в dev идёт через vite-прокси (см. vite.config.js), чтобы обойти CORS.
// В проде замените на свой серверный прокси или на прямой URL, если WP отдаёт CORS-заголовки.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/dotsoft';

/**
 * Получить один "пост" (услугу/продукт) по типу и id.
 * Пример реального эндпоинта: https://dotsoft.gr/wp-json/allposts/v1/service/30001
 */
export async function fetchPost(type, id, { signal } = {}) {
  const res = await fetch(`${BASE_URL}/${type}/${id}`, { signal });
  if (!res.ok) {
    throw new Error(`Σφάλμα API (${res.status}) για ${type}/${id}`);
  }
  const data = await res.json();
  if (data?.code) {
    // WP REST συνήθως επιστρέφει {code, message} σε σφάλμα ακόμη και με status 200
    throw new Error(data.message || 'Άγνωστο σφάλμα API');
  }
  return data;
}

/**
 * Разобрать «грязный» WordPress-HTML из поля content на предсказуемые части:
 * основной текст, галерею изображений, видео (YouTube), ссылку на PDF
 * и список связанных услуг (только эта секция реально пригождается в верстке dotsoft.gr).
 * Формы (wpcf7) сознательно отбрасываются — под них строится собственный React-компонент.
 */
export function parseServiceContent(html) {
  if (!html || typeof window === 'undefined') {
    return { bodyHtml: '', gallery: [], video: null, pdfUrl: null, related: [] };
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Видео (YouTube iframe)
  const iframe = doc.querySelector('iframe[src*="youtube"]');
  const video = iframe ? iframe.getAttribute('src') : null;

  // PDF-ссылка
  const pdfLink = Array.from(doc.querySelectorAll('a[href$=".pdf"]'))[0];
  const pdfUrl = pdfLink ? pdfLink.getAttribute('href') : null;

  // Галерея — картинки внутри <figure>
  const gallery = Array.from(doc.querySelectorAll('figure img')).map((img) => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt') || '',
  }));

  // Связанные услуги — <ul> где встречаются <h5><a><img>Название</a></h5>
  const related = [];
  doc.querySelectorAll('ul').forEach((ul) => {
    const items = ul.querySelectorAll('h5 > a');
    if (items.length > 0) {
      items.forEach((a) => {
        const img = a.querySelector('img');
        related.push({
          name: a.textContent.trim(),
          href: a.getAttribute('href'),
          logo: img ? img.getAttribute('src') : null,
        });
      });
    }
  });

  // Основной текст — убираем формы, nav-список услуг, iframe, script/style
  doc.querySelectorAll('form, ul, iframe, script, style').forEach((el) => el.remove());
  const bodyHtml = doc.body.innerHTML.trim();

  return { bodyHtml, gallery, video, pdfUrl, related };
}

/** Достаём YouTube video id из embed-URL, чтобы построить превью-thumbnail без автозагрузки iframe. */
export function getYoutubeId(embedUrl) {
  if (!embedUrl) return null;
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
