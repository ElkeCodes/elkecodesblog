import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import index from "../../src/pages/index.astro";

test("index page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(index);

  expect(result).toContain("Hi there");
});
