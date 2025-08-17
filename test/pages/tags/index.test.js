import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import index from "../../../src/pages/tags/index.astro";
import { mockBlogPost } from "test/__mocks__/blogpost";

test("index page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(index);

  expect(result).toContain("Tag Index");
});
