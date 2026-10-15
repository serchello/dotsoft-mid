export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  const processedBlocks = [];
  const extractedImages = [];

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

      imageGroup.forEach((img) => {
        extractedImages.push({
          src: img.src,
          alt: img.alt || 'Image',
          caption: img.caption || '',
        });
      });

      i = j;
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

// --- function render ---

function renderHeading(block, index) {
  const level = block.level || 2;
  const className =
    {
      1: 'text-4xl font-bold text-[#1a3a2a] mb-6',
      2: 'text-3xl font-bold text-[#1a3a2a] mb-4 mt-8',
      3: 'text-2xl font-semibold text-[#1a3a2a] mb-3 mt-6',
      4: 'text-xl font-semibold text-[#1a3a2a] mb-2 mt-4',
      5: 'text-lg font-medium text-[#1a3a2a] mb-2 mt-4',
      6: 'text-base font-medium text-[#1a3a2a] mb-2 mt-3',
    }[level] || 'text-2xl font-bold text-[#1a3a2a] mb-4 mt-8';

  return (
    <div key={index} className={className}>
      {block.text}
    </div>
  );
}

function renderText(block, index) {
  if (!block.html) return null;

  const cleanHtml = cleanBodyHtml(block.html);
  if (!cleanHtml) return null;

  return (
    <div
      key={index}
      className="text-gray-700 text-base md:text-base content-with-line-height"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

// 👇 Хелпер: заменяет голые YouTube-ссылки на iframe
function embedYouTubeLinks(html) {
  const normalized = html.replace(/&amp;/g, '&');

  // 👇 Регекс теперь захватывает и хвост с таймкодом: &t=13s, &start=13, ?t=13s и т.д.
  const ytRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[?&](?:t|start|end|list|feature)=[^&\s<"']*)*/g;

  return normalized.replace(ytRegex, (match, videoId, offset, fullString) => {
    const before = fullString.slice(Math.max(0, offset - 30), offset);
    if (/<a[^>]*href=["'][^"']*$/.test(before)) {
      return match;
    }

    return `
      <div style="position:relative;width:100%;padding-bottom:56.25%;margin:1.5rem 0;border-radius:0.75rem;overflow:hidden;background:#000;">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          title="YouTube video"
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  });
}

// 👇 Хелпер: чистка bodyHtml — вырезаем PDF-ссылки, превращаем YouTube в iframe
export function cleanBodyHtml(html) {
  if (!html) return '';

  let cleanHtml = html.replace(/&amp;/g, '&');

  const pdfRegex = /<a[^>]*href="[^"]*\.pdf"[^>]*>[\s\S]*?Κατεβάστε το φυλλάδιο[\s\S]*?<\/a>/gi;
  cleanHtml = cleanHtml.replace(pdfRegex, '');

  const youtubeLinkRegex = /<a[^>]*href="[^"]*youtube\.com\/watch\?v=[^"]*"[^>]*>[\s\S]*?<\/a>/gi;
  cleanHtml = cleanHtml.replace(youtubeLinkRegex, '');

  cleanHtml = embedYouTubeLinks(cleanHtml);

  cleanHtml = cleanHtml.replace(/<br\s*\/?>/gi, '');
  cleanHtml = cleanHtml.replace(/<p>\s*<\/p>/gi, '');
  cleanHtml = cleanHtml.trim();

  return cleanHtml;
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