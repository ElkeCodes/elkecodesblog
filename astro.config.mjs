// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://elkecodes.dev",

  image: {
    responsiveStyles: true,
  },

  integrations: [svelte()],
  adapter: netlify(),
});