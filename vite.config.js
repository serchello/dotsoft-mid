import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// В dev-режиме WordPress REST API dotsoft.gr скорее всего не отдаёт
// заголовок Access-Control-Allow-Origin, поэтому прямой fetch из браузера
// на localhost упрётся в CORS. Прокси ниже решает это для разработки.
// Для продакшена см. README.md (нужен серверный прокси или настройка CORS на WP).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/dotsoft': {
        target: 'https://dotsoft.gr',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/dotsoft/, '/wp-json/allposts/v1'),
      },
    },
  },
});
