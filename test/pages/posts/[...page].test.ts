import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, describe, it } from "vitest";
import pageComponent from "../../../src/pages/posts/[...page].astro";
import svelteRenderer from "@astrojs/svelte/server.js";
import { createBlogPost } from "test/__mocks__/blogpost";
import type { Page } from "astro";

describe("blog page", () => {
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
    const size = 10;
    const lastPage = 6;
    const currentPage = 2;
    const page: Page = {
      start: currentPage * size - size,
      end: currentPage * size,
      currentPage,
      lastPage,
      total: size * lastPage,
      size,
      data: [],
      url: {
        current: "/posts/2",
        prev: "/posts",
        next: "/posts/3",
        first: "/posts",
        last: "/posts/6",
      },
    };
    const result = await container.renderToString(pageComponent, {
      props: {
        page,
      },
    });

    expect(result).toContain("Blogposts #11 - #21, page #2");
  });
});
