import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  // Создаем новый массив, проходя по блокам и объединяя соседние картинки
  const processedBlocks = [];
  let i = 0;

  while (i < blocks.length) {
    const currentBlock = blocks[i];

    // Если текущий блок - картинка, смотрим на следующие
    if (currentBlock.type === 'image') {
      const imageGroup = [currentBlock];
      let j = i + 1;

      // Собираем все подряд идущие картинки в один массив
      while (j < blocks.length && blocks[j].type === 'image') {
        imageGroup.push(blocks[j]);
        j++;
      }

      // Заменяем группу одиночных картинок на один блок-слайдер с массивом images
      processedBlocks.push({
        type: 'image_slider',
        images: imageGroup.map(img => ({
          src: img.src,
          alt: img.alt || 'Image',
          caption: img.caption || ''
        }))
      });

      i = j; // Перепрыгиваем через все обработанные картинки
    } else {
      // Если это не картинка, просто добавляем как есть
      processedBlocks.push(currentBlock);
      i++;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {processedBlocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return renderHeading(block, index);
          case 'text':
            return renderText(block, index);
          case 'list':
            return renderList(block, index);
          case 'image_slider': // Наш новый тип
            return renderImageSlider(block, index);
          default:
            return null;
        }
      })}
    </div>
  );
}

// --- Функции рендеринга ---

function renderHeading(block, index) {
  const level = block.level || 2;
  const className = {
    1: 'text-4xl font-bold text-[#1a3a2a] mb-6',
    2: 'text-3xl font-bold text-[#1a3a2a] mb-4 mt-8',
    3: 'text-2xl font-semibold text-[#1a3a2a] mb-3 mt-6',
    4: 'text-xl font-semibold text-[#1a3a2a] mb-2 mt-4',
    5: 'text-lg font-medium text-[#1a3a2a] mb-2 mt-4',
    6: 'text-base font-medium text-[#1a3a2a] mb-2 mt-3'
  }[level] || 'text-2xl font-bold text-[#1a3a2a] mb-4 mt-8';

  return (
    <div key={index} className={className}>
      {block.text}
    </div>
  );
}

function renderText(block, index) {
  if (!block.html) return null;

  const cleanHtml = block.html.trim();

  // Проверяем наличие PDF ссылки
  const hasPdf = cleanHtml.includes('.pdf') && cleanHtml.includes('Κατεβάστε το φυλλάδιο');

  // Если это PDF блок
  if (hasPdf) {
    const pdfMatch = cleanHtml.match(/href="([^"]*\.pdf)"/);
    const pdfUrl = pdfMatch ? pdfMatch[1] : '';
    const textMatch = cleanHtml.match(/Κατεβάστε το φυλλάδιο/);
    const label = textMatch ? textMatch[0] : 'Κατεβάστε το φυλλάδιο';

    return (
      <div key={index} className="my-4 text-center">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-3 bg-[#7ac142]/10 text-[#5d9f2b] border border-[#7ac142]/30 rounded-xl shadow-sm hover:shadow-md active:translate-y-0 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#7ac142]/30 focus:ring-offset-2 "
        >
          <svg width="32px" height="32px" viewBox="-4 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z" fill="#EB5757" />
          </svg>
          {label}
        </a>
      </div>
    );
  }

  // Обычный текст
  return (
    <div
      key={index}
      className="text-gray-700 text-base md:text-lg content-with-line-height"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

function renderList(block, index) {
  const isOrdered = block.style === 'ol';
  const ListTag = isOrdered ? 'ol' : 'ul';
  const className = isOrdered
    ? 'list-decimal list-inside space-y-1 text-gray-700 pl-4'
    : 'list-disc list-inside space-y-1 text-gray-700 pl-4';

  const items = block.items || [];

  return (
    <ListTag key={index} className={className}>
      {items.map((item, idx) => {
        if (item.includes('<strong>') || item.includes('<em>')) {
          return (
            <li
              key={idx}
              className=""
              dangerouslySetInnerHTML={{ __html: item }}
            />
          );
        }
        return <li key={idx} className="">{item}</li>;
      })}
    </ListTag>
  );
}



function renderImageSlider(block, index) {
  const images = block.images || [];

  if (images.length === 0) return null;

  // Если всего одна картинка, просто показываем её без слайдера (как обычный блок)
  if (images.length === 1) {
    return (
      <div key={index} className="my-6">
        <img
          src={images[0].src}
          alt={images[0].alt || 'Image'}
          className="w-full h-auto object-contain"
          loading="lazy"
        />
        {images[0].caption && (
          <p className="text-sm text-gray-500 text-center py-3 ">
            {images[0].caption}
          </p>
        )}
      </div>
    );
  }

  // Если картинок несколько — рендерим слайдер
  return (
    <div key={index} className="my-6 rounded-xl overflow-hidden ">
      <Carousel
        showArrows={true}
        showThumbs={true} // 👈 Включили миниатюры снизу
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        showStatus={false}
        centerMode={true}
        // Добавили стили для миниатюр, чтобы они были аккуратными
        thumbWidth={80} 
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                className="inline-block mx-1 w-2.5 h-2.5 rounded-full bg-[#7ac142] cursor-pointer"
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              className="inline-block mx-1 w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer hover:bg-white/70 transition"
              onClick={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
              title={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {images.map((img, idx) => (
          <div key={idx}>
            {/* 
              Убрали aspect-video, чтобы высота НЕ обрезалась.
              Заменили object-cover на object-contain, чтобы картинка всегда помещалась целиком. 
            */}
            <img
              src={img.src}
              alt={img.alt || `Slide ${idx + 1}`}
              className="w-full h-auto object-contain max-h-[80vh]" 
              loading="lazy"
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium text-center">
                  {img.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}