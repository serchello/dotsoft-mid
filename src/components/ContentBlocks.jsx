export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  const processedBlocks = [];
  const extractedImages = []; // 📸 Сюда будем собирать все картинки

  let i = 0;

  while (i < blocks.length) {
    const currentBlock = blocks[i];

    if (currentBlock.type === 'image') {
      const imageGroup = [currentBlock];
      let j = i + 1;

      while (j < blocks.length && blocks[j].type === 'image') {
        imageGroup.push(blocks[j]);
        j++;
      }

      // Вместо того чтобы рендерить слайдер, просто сохраняем картинки в массив
      imageGroup.forEach(img => {
        extractedImages.push({
          src: img.src,
          alt: img.alt || 'Image',
          caption: img.caption || ''
        });
      });

      i = j; // Перепрыгиваем
    } else {
      processedBlocks.push(currentBlock);
      i++;
    }
  }

  return (
    <div className="w-full mx-auto px-4 space-y-6">
      {processedBlocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return renderHeading(block, index);
          case 'text':
            return renderText(block, index);
          case 'list':
            return renderList(block, index);
          default:
            return null;
        }
      })}
    </div>
  );
}

// --- Функции рендеринга (остаются без изменений) ---

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

  return <div key={index} className={className}>{block.text}</div>;
}

function renderText(block, index) {
  if (!block.html) return null;

  let cleanHtml = block.html.trim();

  // 1. УДАЛЯЕМ ЛЮБЫЕ ССЫЛКИ НА PDF с текстом "Κατεβάστε το φυλλάδιο"
  const pdfRegex = /<a[^>]*href="[^"]*\.pdf"[^>]*>[\s\S]*?Κατεβάστε το φυλλάδιο[\s\S]*?<\/a>/gi;
  cleanHtml = cleanHtml.replace(pdfRegex, '');

  // 2. УДАЛЯЕМ ЛЮБЫЕ ТЕКСТОВЫЕ ССЫЛКИ НА YOUTUBE (как HTML-ссылки, так и голый текст)
  // Сначала удаляем HTML-теги <a>
  const youtubeLinkRegex = /<a[^>]*href="[^"]*youtube\.com\/watch\?v=[^"]*"[^>]*>[\s\S]*?<\/a>/gi;
  cleanHtml = cleanHtml.replace(youtubeLinkRegex, '');

  // 3. УДАЛЯЕМ ГОЛЫЙ ТЕКСТ ССЫЛКИ (ваш случай)
  const youtubeTextRegex = /https?:\/\/(www\.)?youtube\.com\/watch\?v=[^\s]+/gi;
  cleanHtml = cleanHtml.replace(youtubeTextRegex, '');

  // 4. УДАЛЯЕМ ПУСТЫЕ СТРОКИ, ОСТАВШИЕСЯ ПОСЛЕ УДАЛЕНИЯ
  cleanHtml = cleanHtml.replace(/<br\s*\/?>/gi, '');
  cleanHtml = cleanHtml.replace(/<p>\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.trim();

  // Если после очистки не осталось текста, ничего не рендерим
  if (!cleanHtml) return null;

  return (
    <div
      key={index}
      className="text-gray-700 text-base md:text-base content-with-line-height"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

function renderList(block, index) {
  const isOrdered = block.style === 'ol';
  const ListTag = isOrdered ? 'ol' : 'ul';
  const className = isOrdered
    ? 'list-decimal list-inside space-y-0 text-gray-700 pl-3'
    : 'list-disc list-inside space-y-0 text-gray-700 pl-3';

  const items = block.items || [];

  return (
    <ListTag key={index} className={className}>
      {items.map((item, idx) => {
        if (item.includes('<strong>') || item.includes('<em>')) {
          return <li key={idx} className="" dangerouslySetInnerHTML={{ __html: item }} />;
        }
        return <li key={idx} className="">{item}</li>;
      })}
    </ListTag>
  );
}