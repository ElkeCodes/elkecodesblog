import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import now from "../../src/pages/now.astro";

test("now page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(now);

  expect(result).toContain("Now");
  expect(result).toContain("Exercising");
  expect(result).toContain("Programming");
  expect(result).toContain("Working");
  expect(result).toContain("Learning");
  expect(result).toContain("Gaming");
  expect(result).toContain("Parenting");
});
