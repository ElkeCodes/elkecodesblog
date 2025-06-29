import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import about from "../../src/pages/about.astro";

test("about page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(about);

  expect(result).toContain("My name is Elke");
});
