// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://elkecodes.dev",
  image: {
    responsiveStyles: true,
  },
  integrations: [svelte()],
});
