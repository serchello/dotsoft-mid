import ContentBlocks from './ContentBlocks.jsx';

export default function ContentSection({ blocks, bodyHtml, pdfUrl }) {
  return (
    <section className="py-2 bg-white">
      {/* Если есть blocks - используем их */}
      {blocks && blocks.length > 0 ? (
        <ContentBlocks blocks={blocks} />
      ) : (
        /* Иначе используем bodyHtml */
        <div className="container mx-auto max-w-4xl px-4">
          <div 
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: bodyHtml || '' }} 
          />
        </div>
      )}

      {/* PDF кнопка */}
      {pdfUrl && (
        <div className="container mx-auto max-w-4xl px-4 mt-6 text-center">
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7ac142] text-white rounded-lg hover:bg-[#6ab038] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Κατεβάστε το φυλλάδιο
          </a>
        </div>
      )}
    </section>
  );
}