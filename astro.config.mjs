import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), tailwind(), sitemap(), db()]
});