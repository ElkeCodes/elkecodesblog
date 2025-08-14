import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Header from "../../src/components/Header.astro";

test("Header", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header);

  expect(result).toContain("ElkeCodes");
});
