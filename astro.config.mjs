// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nikolamiljkovic.live',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic(), sitemap({
    serialize(item) {
      item.lastmod = new Date();
      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
