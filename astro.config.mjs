// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

import partytown from "@astrojs/partytown";

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://weidesign.engineer/',

  integrations: [
    mdx(),
    sitemap(),
    robotsTxt(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),],

  adapter: netlify(),
});