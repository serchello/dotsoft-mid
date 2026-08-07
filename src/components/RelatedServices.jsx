import { Link } from 'react-router-dom';

export default function RelatedServices({ items, currentTitle }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1a3a2a]">
          Δείτε περισσότερα προϊόντα
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item, index) => {
            // Пропускаем текущий
            if (item.text === currentTitle) return null;
            
            return (
              <Link
                key={index}
                to={item.url}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                {item.logo && (
                  <img
                    src={item.logo}
                    alt={item.text}
                    className="w-12 h-12 object-contain mb-2 group-hover:scale-110 transition-transform"
                  />
                )}
                <span className="text-xs text-center text-gray-700 group-hover:text-[#7ac142] transition-colors">
                  {item.text}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}