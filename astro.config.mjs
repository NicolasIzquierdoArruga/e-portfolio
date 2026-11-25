// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/*
 * WHERE THE SITE LIVES
 * --------------------
 * These two values are the only place the public address is set.
 *
 * Today the site is served by GitHub Pages from the "e-portfolio" repository,
 * so it lives in a sub-folder:  https://nicolasizquierdoarruga.github.io/e-portfolio/
 *
 * When a custom domain is added later (for example https://nicolasizquierdo.dev):
 *   SITE_URL  = 'https://nicolasizquierdo.dev'
 *   BASE_PATH = '/'
 * Nothing else in the code needs to change: every internal link is built with
 * the helper in src/lib/url.ts, which reads BASE_PATH through Astro.
 */
const SITE_URL = 'https://nicolasizquierdoarruga.github.io';
const BASE_PATH = '/e-portfolio';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Syntax highlighting for code blocks (C, VHDL, MATLAB, bash...).
    // Two themes: the CSS picks one depending on light/dark mode.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
