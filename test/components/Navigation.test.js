import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Navigation from "../../src/components/Navigation.astro";

test("Navigation", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Navigation);

  expect(result).toContain("Home");
  expect(result).toContain("About");
  expect(result).toContain("Blog");
});
