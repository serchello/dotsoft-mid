const API_BASE = 'https://dotsoft.gr';

export async function fetchPost(id, options = {}) {
  const url = `${API_BASE}/wp-json/allposts/v1/service/${id}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }

    console.error('Error fetching post:', error)
    throw error
  }
}

export function parseServiceContent(content) {
  if (!content) {
    return {
      bodyHtml: '',
      pdfUrl: null,
      gallery: [],
      video: null,
      related: []
    };
  }

  const images = [];
  const files = [];
  let video = null;
  let pdfUrl = null;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  const iframe = tempDiv.querySelector('iframe');
  if (iframe) {
    video = iframe.src;
  }

  const pdfLink = tempDiv.querySelector('a[href$=".pdf"]');
  if (pdfLink) {
    pdfUrl = pdfLink.href;
    files.push({
      url: pdfLink.href,
      name: pdfLink.textContent.trim() || 'Download PDF',
      ext: 'pdf'
    });
  }

  const imgElements = tempDiv.querySelectorAll('img');
  imgElements.forEach(img => {
    if (img.src) {
      images.push({
        src: img.src,
        alt: img.alt || '',
        caption: ''
      });
    }
  });

  const relatedLinks = tempDiv.querySelectorAll('h5 a');
  const related = Array.from(relatedLinks).map(link => ({
    url: link.href,
    text: link.textContent.trim(),
    logo: link.querySelector('img')?.src || null
  }));

  return {
    bodyHtml: content,
    pdfUrl: pdfUrl,
    gallery: images,
    video: video,
    related: related,
    images: images,
    files: files
  };
}

export function getYoutubeId(url) {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?#]+)/,
    /youtube\.com\/embed\/([^&\s?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}`;
}