/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
  test: {
    // environment: 'happy-dom'
    // environment: 'jsdom',
    setupFiles: ["test/setup.ts"],
    coverage: {
      exclude: [
        "astro.config.mjs",
        "svelte.config.js",
        "public/talks",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
