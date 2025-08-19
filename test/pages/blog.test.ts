import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import blog from "../../src/pages/blog.astro";

test("blog page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(blog);

  expect(result).toContain("Blogposts overview");
});
