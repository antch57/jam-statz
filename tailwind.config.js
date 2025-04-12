/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            dark: '#1e293b',    // blue-gray-800
            light: '#334155',   // blue-gray-700
          },
          accent: {
            primary: '#0ea5e9',   // sky-500
            secondary: '#14b8a6', // teal-500
          },
          surface: {
            dark: 'rgba(31, 41, 55, 0.7)',    // blue-gray-900/70
            light: 'rgba(51, 65, 85, 0.7)',   // blue-gray-800/70
            border: 'rgba(75, 85, 99, 0.7)',  // blue-gray-700/70
          },
          text: {
            primary: '#f1f5f9',    // blue-gray-100
            secondary: '#e2e8f0',  // blue-gray-200
            muted: '#94a3b8',      // blue-gray-400
          }
        }
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}