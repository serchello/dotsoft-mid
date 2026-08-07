import { useState } from 'react';
import { getYoutubeId } from '../api/dotsoft.js';

/**
 * Видео + фото-галерея услуги, светлая секция (продолжение белого фона контента).
 * Превью видео оформлено как в оригинале dotsoft.gr: плашка с логотипом/названием
 * поверх кадра и крупная центральная play-кнопка вместо автозагрузки iframe.
 */
export default function Gallery({ images, videoEmbedUrl, videoTitle, serviceLogo }) {
  const [playVideo, setPlayVideo] = useState(false);
  const youtubeId = getYoutubeId(videoEmbedUrl);

  if (!images?.length && !youtubeId) return null;

  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-[760px] px-4 sm:px-6">
        {youtubeId && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg border border-dotsoft-bg/10 shadow-sm">
            {playVideo ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={videoTitle || 'Video παρουσίασης υπηρεσίας'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlayVideo(true)}
                aria-label="Αναπαραγωγή video"
                className="group relative h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)` }}
              >
                <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />

                {/* верхняя плашка с логотипом, как в оригинале */}
                <span className="absolute left-4 top-4 flex items-center gap-2 rounded bg-black/55 px-3 py-1.5 backdrop-blur-sm">
                  {serviceLogo ? (
                    <img src={serviceLogo} alt="" className="h-5 w-5" />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-dotsoft-green text-[10px] text-white">●</span>
                  )}
                  <span className="text-xs font-medium uppercase tracking-wide text-white">
                    {videoTitle || 'promo video'}
                  </span>
                </span>

                {/* центральная play-кнопка */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-105">
                    <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        )}

        {images?.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-lg border border-dotsoft-bg/10 object-cover shadow-sm"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
