import { useEffect, useState } from 'react';

import Layout from '../components/Layout.jsx'; 
import ContentSection from '../components/ContentSection.jsx';
import { ErrorScreen } from '../components/StatusScreens.jsx';
import { fetchPost, parseServiceContent } from '../api/dotsoft.js';

export default function ServicePage({ id: idProp } = {}) {

  const id =  idProp; // Можно оставить, если это дефолт для страницы
  
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

  const { post } = state;
  const content = typeof post.content === 'object' && post.content !== null ? post.content : null;
  const bodyHtml = content?.body || (typeof post.content === 'string' ? post.content : '');
  const blocks = content?.blocks || [];

  return (
    <Layout>
      <ContentSection blocks={blocks} bodyHtml={bodyHtml} pdfUrl={post.meta?.docs_0_doc_link} />
    </Layout>
  );
}