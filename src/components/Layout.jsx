import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { fetchPost } from '../api/dotsoft.js';
import { LoadingScreen } from './StatusScreens.jsx';

// ID берем из вашей переменной окружения (как вы просили ранее)
const DEFAULT_HEADER_ID = import.meta.env.VITE_APP_POST_ID;

export default function Layout({ children }) {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция загрузки шапки
    async function loadHeader() {
      try {
        // Загружаем данные для шапки (тип 'service', ID из env)
        const post = await fetchPost(DEFAULT_HEADER_ID);
        setHeaderData(post);
      } catch (err) {
        // Если API упало — не ломаем сайт, ставим заглушку, чтобы шапка просто была видна
        console.error('Ошибка загрузки шапки:', err);
        setHeaderData({
          title: 'DOTSOFT',
          header: {
            logo: { url: '/images/logo_header.png' },
            line: { url: "relative h-1.5 w-full bg-gradient-to-r from-[#2d7d46] via-[#7ac142] to-[#a8d84a]" }
          }
        });
      } finally {
        setLoading(false);
      }
    }

    loadHeader();
  }, []);

  // Пока грузится шапка, показываем лоадер
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-white">
      {/* Передаем загруженные данные в Header */}
      <Header post={headerData} />

      {/* ТЕЛО СТРАНИЦЫ (то, что в children) */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}