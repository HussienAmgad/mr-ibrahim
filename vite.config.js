import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // تشغيل الميزة أثناء التطوير
      },
      manifest: {
        name: 'Mr Ibrahim',
        short_name: 'مستر إبراهيم',
        description: 'مستر إبراهي زيدان مدرس اللغه العربيه',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/public/icon512_rounded.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/public/icon512_rounded.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0', // هذا يسمح للوصول من جميع العناوين على الشبكة
    port: 5173, // يمكنك تغيير المنفذ حسب الحاجة
  },
});
