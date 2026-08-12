import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import ContentSection from '../components/ContentSection.jsx';
import { ErrorScreen } from '../components/StatusScreens.jsx';
import { fetchPost, parseServiceContent } from '../api/dotsoft.js';

export default function ServicePage({ id } = {}) {

  const [state, setState] = useState({
    status: 'loading',
    post: null,
    parsed: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const load = async () => {
      if (isMounted) setState({ status: 'loading', post: null, parsed: null, error: null });

      try {
        const post = await fetchPost(id, { signal: controller.signal });
        if (!isMounted) return;

        const parsed = parseServiceContent(post.content);
        setState({ status: 'ready', post, parsed, error: null });
      } catch (err) {
        if (err?.name === 'AbortError' || !isMounted) return;

        setState({ status: 'error', post: null, parsed: null, error: err.message });
      }
    };

    void load();
    return () => { isMounted = false; controller.abort(); };
  }, [id]);


  if (state.status === 'error') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <ErrorScreen message={state.error} />
        </div>
      </Layout>
    );
  }

  if (state.status === 'loading') return null; // лоадер уже крутится в Layout'e, или можно вернуть свой

  console.log('ServicePage state:', state); // для отладки, можно удалить

  const { post } = state;
  const content = typeof post.content === 'object' && post.content !== null ? post.content : null;
  const bodyHtml = content?.body || (typeof post.content === 'string' ? post.content : '');
  const blocks = content?.blocks || [];

  function getEmbedUrl(url) {
    if (!url) return null;
    // check if embed-link
    if (url.includes('/embed/')) return url;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  }
  const videoUrl = post.acf?.video?.[0]?.video_link || null;
  const embedVideoUrl = getEmbedUrl(videoUrl);


  return (
    <Layout title={post.title} description={post.excerpt}>
      <ContentSection blocks={blocks} bodyHtml={bodyHtml} pdfUrl={post.meta?.docs_0_doc_link} videoUrl={embedVideoUrl} />
    </Layout>
  );
}