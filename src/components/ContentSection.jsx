import ContentBlocks from './ContentBlocks.jsx';

export default function ContentSection({ blocks, bodyHtml, onImagesExtracted }) {
  let extractedImages = [];

  // Если есть blocks - рендерим их, а заодно и собираем картинки
  if (blocks && blocks.length > 0) {
    // Чтобы получить картинки, мы можем просто вызвать ContentBlocks с дополнительным пропсом
    // Или использовать тот же алгоритм, что и внутри ContentBlocks, но проще всего:
    extractedImages = blocks
      .filter(block => block.type === 'image')
      .map(img => ({
        src: img.src,
        alt: img.alt || 'Image',
        caption: img.caption || ''
      }));
  }

  // Если есть коллбек от родителя, передаем картинки наверх
  if (onImagesExtracted) {
    onImagesExtracted(extractedImages);
  }

  return (
    <section className="py-2 bg-white">
      {blocks && blocks.length > 0 ? (
        <ContentBlocks blocks={blocks} />
      ) : (
        <div className="container mx-auto w-full px-4">
          <div
            className="prose prose-lg max-w-none w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: bodyHtml || '' }}
          />
        </div>
      )}
    </section>
  );
}