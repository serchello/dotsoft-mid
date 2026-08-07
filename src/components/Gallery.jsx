import { getYoutubeEmbedUrl } from '../api/dotsoft.js';

export default function Gallery({ images, videoEmbedUrl, videoTitle, serviceLogo }) {
  const hasImages = images && images.length > 0;
  const hasVideo = videoEmbedUrl;

  if (!hasImages && !hasVideo) return null;

  const videoUrl = getYoutubeEmbedUrl(videoEmbedUrl);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1a3a2a]">
          Φωτογραφικό Υλικό
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Видео - занимает 1 колонку */}
          {hasVideo && videoUrl && (
            <div className="lg:col-span-1 aspect-w-16 aspect-h-9 lg:aspect-square">
              <iframe
                src={videoUrl}
                title={videoTitle || 'Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Изображения - 4 колонки */}
          {hasImages && (
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${hasVideo ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
              {images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt || `Image ${index + 1}`}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-xs">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Новая строка после 4 изображений */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {hasImages && images.length > 4 ? `+ ${images.length - 4} ακόμα φωτογραφίες` : ''}
          </p>
        </div>
      </div>
    </section>
  );
}