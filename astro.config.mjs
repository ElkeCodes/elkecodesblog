// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://elkecodes.dev",

  image: {
    responsiveStyles: true,
  },

  integrations: [svelte(), mdx()],
  adapter: netlify(),
});