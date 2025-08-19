import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, describe, it } from "vitest";
import blogpost from "../../../src/pages/posts/[...slug].astro";
import svelteRenderer from "@astrojs/svelte/server.js";
import { createBlogPost, mockBlogPost } from "test/__mocks__/blogpost";

describe("blogpost page", () => {
  it("should render", async () => {
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
        post: createBlogPost({ headings: true }),
      },
    });

    expect(result).toContain("mockTitle");
    expect(result).toContain("Heading 1");
  });
  it("should render no table of contents if there are no headings", async () => {
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
        post: createBlogPost({ headings: false }),
      },
    });

    expect(result).not.toContain("Heading 1");
  });
});
