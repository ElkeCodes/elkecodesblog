import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import index from "../../../src/pages/resume/index.astro";

test("resume index page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(index);

  expect(result).toContain("Curriculum Vitae");
  expect(result).toContain("My career started in 2013");
  expect(result).toContain("Frontend consultant");
});
