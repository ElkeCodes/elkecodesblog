// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://elkecodes.dev",
  image: {
    responsiveStyles: true,
  },
  // vite: {
  //   build: {
  //     // Exclude files with the *.cy.tsx extension
  //     rollupOptions: {
  //       // Exclude files with the *.cy.tsx extension from being processed by Vite
  //       external: ["**/*.test.js"],
  //     },
  //   },
  // },
});
