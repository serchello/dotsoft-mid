import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.jsx';
import ContentSection from '../components/ContentSection.jsx';
import RightSidebar from '../components/RightSidebar.jsx';
import { LoadingScreen, ErrorScreen } from '../components/StatusScreens.jsx';
import { fetchPost, parseServiceContent } from '../api/dotsoft.js';

export default function ServicePage({ id } = {}) {

  const [state, setState] = useState({
    status: 'loading',
    post: null,
    parsed: null,
    error: null,
  });

  const [extractedImages, setExtractedImages] = useState([]); // 👈 Стейт для картинок

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const load = async () => {
      if (isMounted) {
        setState({
          status: 'loading',
          post: null,
          parsed: null,
          error: null,
        });
      }

      try {
        const post = await fetchPost(id, { signal: controller.signal });
        if (!isMounted) return;

        const parsed = parseServiceContent(post.content);
        setState({ status: 'ready', post, parsed, error: null });
      } catch (err) {
        if (err?.name === 'AbortError' || !isMounted) return;
        console.error('Load error:', err);
        if (isMounted) {
          setState({ status: 'error', post: null, parsed: null, error: err.message });
        }
      }
    };

    void load();
    return () => { isMounted = false; controller.abort(); };
  }, [id]);

  if (state.status === 'loading') return <LoadingScreen />;
  if (state.status === 'error') {
    return (
      <Layout title="Ошибка">
        <div className="container mx-auto px-4 py-20">
          <ErrorScreen message={state.error} />
        </div>
      </Layout>
    );
  }

  const { post } = state;
  const content = typeof post.content === 'object' && post.content !== null ? post.content : null;
  const bodyHtml = content?.body || (typeof post.content === 'string' ? post.content : '');
  const blocks = content?.blocks || [];

  const videoUrl = post.right_side?.video?.[0]?.video_link || null;
  const pdfUrl = post.right_side?.docs?.[0]?.doc_link || null;

  function getEmbedUrl(url) {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  }

  const embedVideoUrl = getEmbedUrl(videoUrl);

  // Коллбек, который получает картинки из ContentSection
  const handleImagesExtracted = (images) => {
    setExtractedImages(images);
  };

  // 👇 ПРОВЕРКА: есть ли что-то в правой колонке?
  const hasRightSideContent = embedVideoUrl || pdfUrl || (extractedImages && extractedImages.length > 0);

  return (
    <Layout title={post.title} description={post.excerpt}>
      <div className="mx-auto max-w-[1420px] px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* ЛЕВАЯ КОЛОНКА: только текст и списки */}
          <div className={`w-full ${hasRightSideContent ? 'md:w-3/5 lg:w-3/5 md:pr-4' : 'md:w-full'}`}>
            <ContentSection
              blocks={blocks}
              bodyHtml={bodyHtml}
              onImagesExtracted={handleImagesExtracted} // 👈 Передаем коллбек
            />
          </div>

          {/* ПРАВАЯ КОЛОНКА: видео, PDF и ТЕПЕРЬ ЕЩЕ И КАРТИНКИ */}
          {hasRightSideContent && (
            <div className="w-full md:w-2/5 lg:w-2/5">
              <RightSidebar 
                videoUrl={embedVideoUrl} 
                pdfUrl={pdfUrl}
                images={extractedImages}
              />
            </div>
          )}
          
        </div>
      </div>
    </Layout>
  );
}