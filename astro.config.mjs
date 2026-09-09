// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

export default defineConfig({
  site: "https://elkecodes.dev",
  image: {
    responsiveStyles: true,
  },
  integrations: [svelte(), mdx(), vue(), sitemap(), tina()],
  adapter: netlify(),
  redirects: {
    "/blog": "/posts",
  },
  vite: {
      plugins: [tinaAdminDevRedirect()],
      ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
    },
});
