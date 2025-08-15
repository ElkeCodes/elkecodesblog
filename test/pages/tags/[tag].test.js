import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import tag from "../../../src/pages/tags/[tag].astro";
import { mockBlogPost } from "test/__mocks__/blogpost";

test("tag page", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(tag, {
    props: {
      posts: [mockBlogPost],
    },
    params: {
      tag: "mockTag1",
    },
  });

  expect(result).toContain("mockTitle");
});
