import ContentBlocks, { cleanBodyHtml } from './ContentBlocks.jsx';

export default function ContentSection({ blocks, bodyHtml, onImagesExtracted }) {
  let extractedImages = [];

  if (blocks && blocks.length > 0) {
    extractedImages = blocks
      .filter(block => block.type === 'image')
      .map(img => ({
        src: img.src,
        alt: img.alt || 'Image',
        caption: img.caption || ''
      }));
  }

  if (onImagesExtracted) {
    onImagesExtracted(extractedImages);
  }

  const hasBlocks = blocks && blocks.length > 0;
  const cleanedBody = !hasBlocks ? cleanBodyHtml(bodyHtml || '') : '';

  return (
    <section className="py-1 bg-white">
      {hasBlocks ? (
        <ContentBlocks blocks={blocks} />
      ) : (
        <div className="container mx-auto w-full px-4">
          <div
            className="prose prose-lg max-w-none w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: cleanedBody }}
          />
        </div>
      )}
    </section>
  );
}