import { useState } from 'react';

export default function Header({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const title = post?.title || 'EcoCorner';
  const tagline = post?.excerpt || 'Παροχή εργασιών πεδίου';
  const quote = post?.meta?.quote || post?.header?.quote || 'Έξυπνη ανακύκλωση, καθαρές πόλεις, ενεργοί πολίτες';

  const logoUrl = post?.header?.banner?.url || post?.header?.logo?.url || '/images/logo_header.png';
  const logoUrl2 = post?.header?.logo?.url || '/images/logo_header.png';
  const line = post?.header?.line?.url || '<div className="relative h-1.5 w-full bg-gradient-to-r from-[#2d7d46] via-[#7ac142] to-[#a8d84a]" />';

  const splitTitle = (title) => {
    if (!title) return null;
    const match = title.match(/^([A-ZΑ-Ω][a-zα-ω]*)(.*)$/);
    if (!match) return <span className="text-white">{title}</span>;
    const [, first, rest] = match;
    return (
      <>
        <span className="text-[#7ac142]">{first}</span>
        <span className="text-white">{rest}</span>
      </>
    );
  };

  return (
    <header className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/header_bg.png')` }}
      />
      <div className="absolute inset-0 bg-[#0d1b1f]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b1f]/80 via-transparent to-transparent" />

      <div className="relative bg-transparent text-white border-b-2 border-white/60">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/dotsoft-logo.png" alt="DOTSOFT" className="h-14 w-auto" />
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="md:hidden" aria-label="Αναζήτηση">
              <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <div className="hidden flex-1 items-center gap-2 md:flex max-w-xs">
              <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Αναζήτηση..."
                className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
            </div>

            <button className="hidden items-center gap-1 text-sm text-white/80 hover:text-white sm:flex">
              Ελληνικά
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Μενού"
              aria-expanded={menuOpen}
              className="grid grid-cols-3 gap-[3px] p-1"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-[3px] w-[3px] rounded-full bg-white/80" />
              ))}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <input
              type="text"
              placeholder="Αναζήτηση..."
              className="mb-3 w-full rounded bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none"
            />
            <button className="text-sm text-white/80">Ελληνικά</button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute right-0 top-1/2 h-3/4 w-2/5 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#7ac142]/20 to-[#7ac142]/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-1/2 w-1/3 -translate-y-1/2 bg-gradient-to-r from-transparent to-[#f5a623]/10 blur-2xl" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-4 py-8 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between md:py-14">
          
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={logoUrl} alt={title} className="h-16 w-auto sm:h-24" />
            <div>
              <img src={logoUrl2} alt={title} className="h-12 w-auto sm:h-12" />
              <p className="mt-1 text-md tracking-widest text-white/50 sm:text-md">{tagline}</p>
            </div>
          </div>

          {quote && (
            <div className="relative w-full md:w-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#7ac142]/30 via-[#7ac142]/10 to-transparent blur-2xl" />
              <div className="absolute -inset-8 bg-gradient-to-r from-[#f5a623]/20 to-transparent blur-3xl" />
              <p className="relative max-w-sm text-center text-xl font-semibold leading-relaxed text-white/95 sm:text-xl md:text-center md:text-xl lg:text-xl">
                {quote}
              </p>
            </div>
          )}
        </div>

        <img src={line} alt='line' />
        
      </div>
    </header>
  );
}