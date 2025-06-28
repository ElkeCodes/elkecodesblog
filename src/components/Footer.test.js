import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Footer from "./Footer.astro";

test("Footer", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Footer);

  expect(result).toContain("Elke Heymans");
  expect(result).toContain("GitHub");
  expect(result).toContain("LinkedIn");
});
