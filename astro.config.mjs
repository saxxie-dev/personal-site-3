import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import solid from '@astrojs/solid-js';

import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), solid(), mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});