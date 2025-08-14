import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import talks from "../../src/pages/talks.astro";
import svelteRenderer from "@astrojs/svelte/server.js";

test("talks page", async () => {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: svelteRenderer,
    name: "@astrojs/svelte",
  });
  container.addClientRenderer({
    name: "@astrojs/svelte",
    entrypoint: "@astrojs/svelte/client.js",
  });
  const result = await container.renderToString(talks);

  expect(result).toContain("Advent of Code");
  expect(result).toContain("Hoist the sails, we have TailwindCSS!");
  expect(result).toContain("Pacman VR in Vue");
  expect(result).toContain("Wrapping your head around headless tables");
  expect(result).toContain("Etymology in IT");
});
