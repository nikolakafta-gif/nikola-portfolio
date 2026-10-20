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
  /* The canonical URL and the sitemap both carry a trailing slash, but the
     slashless form used to answer 200 with a canonical pointing elsewhere, so
     Google filed four of them under "Alternate page with proper canonical tag"
     and spent crawl budget on duplicates. The Vercel adapter turns this into a
     308 from /x to /x/, which is a rule rather than a hint. Keep every internal
     link written with the trailing slash: the dev server 404s without it. */
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
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
