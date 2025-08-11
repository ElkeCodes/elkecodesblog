/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
  test: {
    coverage: {
      exclude: ["astro.config.mjs", "public/talks", ...coverageConfigDefaults.exclude],
    },
  },
});
