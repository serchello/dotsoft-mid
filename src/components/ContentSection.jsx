/**
 * Основной текст услуги — светлая секция (белый фон), как на dotsoft.gr:
 * один читаемый столбец ~760px, тёмно-бирюзовые заголовки, обычный текст графитовый,
 * жирные акценты (услуга, ключевые фразы) чуть темнее — как в HTML из WP (<strong>).
 */
export default function ContentSection({ bodyHtml, pdfUrl }) {
  return (
    <section id="details" className="bg-white">
      <div className="mx-auto max-w-[760px] px-4 py-14 sm:px-6 sm:py-16">
        <article
          className="dotsoft-prose"
          // Контент приходит из WordPress REST API (доверенный источник — dotsoft.gr).
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-dotsoft-green hover:underline"
          >
            ↓ Κατεβάστε το φυλλάδιο
          </a>
        )}
      </div>

      {/* Локальные стили для контента, вставляемого через dangerouslySetInnerHTML —
          там нет доступа к className, поэтому таргетимся через родительский класс. */}
      <style>{`
        .dotsoft-prose { color: #3b4a4a; font-size: 15px; line-height: 1.75; }
        .dotsoft-prose p { margin: 0 0 14px; }
        .dotsoft-prose strong { color: #12302a; font-weight: 700; }
        .dotsoft-prose em { color: #2f8f5e; font-style: italic; }
        .dotsoft-prose h2 {
          color: #12302a; font-weight: 700; font-size: 20px; line-height: 1.4;
          margin: 32px 0 14px; font-family: 'Space Grotesk', sans-serif;
        }
        .dotsoft-prose h2:first-child { margin-top: 0; }
        .dotsoft-prose ul { margin: 0 0 18px; padding-left: 20px; }
        .dotsoft-prose li { margin-bottom: 6px; }
        .dotsoft-prose li::marker { color: #7ac142; }
        .dotsoft-prose figure { margin: 20px 0; }
        .dotsoft-prose figure img { border-radius: 8px; }
      `}</style>
    </section>
  );
}
