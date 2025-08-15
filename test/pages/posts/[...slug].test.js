import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import blogpost from "../../../src/pages/posts/[...slug].astro";
import svelteRenderer from "@astrojs/svelte/server.js";
import { mockBlogPost } from "test/__mocks__/blogpost";

test("blogpost page", async () => {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    renderer: svelteRenderer,
    name: "@astrojs/svelte",
  });
  container.addClientRenderer({
    name: "@astrojs/svelte",
    entrypoint: "@astrojs/svelte/client.js",
  });
  const result = await container.renderToString(blogpost, {
    props: {
      post: mockBlogPost,
    },
  });

  expect(result).toContain("mockTitle");
});
