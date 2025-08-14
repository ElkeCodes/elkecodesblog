import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import index from "../../../src/pages/coding/index.astro";

test("coding index page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(index);

  expect(result).toContain("All my coding projects");
  expect(result).toContain("Rendez-vous with Cassidoo");
});
