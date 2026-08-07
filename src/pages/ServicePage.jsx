import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, parseServiceContent } from '../api/dotsoft.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ContentSection from '../components/ContentSection.jsx';
import Gallery from '../components/Gallery.jsx';
import RelatedServices from '../components/RelatedServices.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { LoadingScreen, ErrorScreen } from '../components/StatusScreens.jsx';

export default function ServicePage({ type: typeProp, id: idProp } = {}) {
  const params = useParams();
  const type = params.type || typeProp || 'service';
  const id = params.id || idProp || '30001';
  const [state, setState] = useState({ status: 'loading', post: null, parsed: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    load();
    return () => controller.abort();

    async function load() {
      setState((s) => ({ ...s, status: 'loading', error: null }));
      try {
        const post = await fetchPost(type, id, { signal: controller.signal });
        const parsed = parseServiceContent(post.content);
        setState({ status: 'ready', post, parsed, error: null });
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Load error:', err);
        setState({ status: 'error', post: null, parsed: null, error: err.message });
      }
    }
  }, [type, id]);

  if (state.status === 'loading') return <LoadingScreen />;
  if (state.status === 'error') {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorScreen message={state.error} />
      </div>
    );
  }

  const { post, parsed } = state;

  return (
    <main>
      <Header post={post} />
      
      <ContentSection 
        bodyHtml={parsed.bodyHtml} 
        pdfUrl={parsed.pdfUrl} 
      />
      
      <Gallery 
        images={parsed.gallery} 
        videoEmbedUrl={parsed.video}
        videoTitle={`${post.title} promo video`}
        serviceLogo={post.meta?.service_icon_img?.url}
      />
      
      <RelatedServices 
        items={parsed.related} 
        currentTitle={post.title} 
      />
      
      <ContactForm serviceTitle={post.title} />
      
      <Footer contact={post.meta || {}} />
    </main>
  );
}