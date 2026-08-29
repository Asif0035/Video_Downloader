import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      // Replace with your actual deployed domain or GitHub Pages URL
      hostname: 'https://asif0035.github.io/Video_Downloader/',
      basePath: '/Video_Downloader/',
      dynamicRoutes: [
        '/',
        '/youtube-shorts-downloader',
        '/instagram-reels-downloader',
        '/facebook-video-downloader-hd',
        '/privacy-policy',
        '/terms-of-service',
      ],
      generateRobotsTxt: true,
    }),
  ],
  base: '/Video_Downloader/',
  plugins: [react(), tailwindcss()],
})
