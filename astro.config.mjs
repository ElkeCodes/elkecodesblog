// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://elkecodes.dev",
  image: {
    responsiveStyles: true,
  },
  integrations: [svelte(), mdx(), vue(), sitemap()],
  adapter: netlify(),
  redirects: {
    "/blog": "/posts",
  },
});
