import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { fetchPost } from '../api/dotsoft.js';
import { LoadingScreen } from './StatusScreens.jsx';

const DEFAULT_HEADER_ID = import.meta.env.VITE_APP_POST_ID;

export default function Layout({ children, title, description }) {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
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
     
      <Helmet>
        <title>{title ? `${title} | DOTSOFT` : 'DOTSOFT'}</title>
        <meta name="description" content={description || 'DOTSOFT - Innovative Technologies'} />
      </Helmet>
     
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