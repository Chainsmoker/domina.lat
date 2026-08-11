// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const sitemapExcludedPaths = new Set([
  '/sobre-domina',
  '/contact',
  '/afiliados',
  '/categoria',
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://domina.lat',
  trailingSlash: 'never',
  compressHTML: true,
  output: 'server',
  prefetch: true,
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    sitemap({
      filter: (page) => !sitemapExcludedPaths.has(new URL(page).pathname),
    }),
    svelte(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'ilb98xsw',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2026-08-01',
      studioBasePath: '/admin',
    }),
    react()
  ]
});
