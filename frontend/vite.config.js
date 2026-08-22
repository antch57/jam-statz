import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Jam Statz',
        short_name: 'JamStatz',
        theme_color: '#8b5cf6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
    }),
  ],
  build: {
    rollupOptions: {
      checks: {
        pluginTimings: false,
      },
    },
  },
});
