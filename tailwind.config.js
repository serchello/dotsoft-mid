/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dotsoft: {
          bg: '#0c1c22',       // тёмный сине-зелёный фон баннера
          bar: '#0a1418',      // самая тёмная верхняя полоса
          green: '#7ac142',    // основной зелёный бренда
          greenDark: '#4f8f2a',
          accentOrange: '#e8562f', // точка перед DOTSOFT
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
