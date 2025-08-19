import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Introduction from "../../src/components/Introduction.astro";

test("Introduction", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Introduction);

  expect(result).toContain("I'm a frontend developer");
});
