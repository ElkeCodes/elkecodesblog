import { describe, it, expect, vi } from "vitest";
import { GET } from "../../src/pages/rss.xml";
import rss from "@astrojs/rss";
import { getPublishedPosts } from "@utils/get-published-posts";
import { mockBlogPosts } from "test/__mocks__/blogpost";
import { mockContext } from "test/__mocks__/context";

vi.mock("@astrojs/rss");
vi.mock("@utils/get-published-posts");

describe("GET /rss.xml", () => {
  it("should return an RSS feed with correct structure", async () => {
    vi.mocked(getPublishedPosts).mockResolvedValue(mockBlogPosts);
    vi.mocked(rss).mockImplementation((config) =>
      Promise.resolve(
        new Response(JSON.stringify({ data: config }), {
          status: 200,
        })
      )
    );

    const result = await GET(mockContext);

    expect(rss).toHaveBeenCalledWith({
      title: "Elke Codes",
      description:
        "Blog focused on frontend development, photography, running and more",
      site: mockContext.site,
      items: mockBlogPosts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.id}/`,
      })),
      customData: "<language>en-gb</language>",
    });

    expect(await result.json()).toMatchObject({
      data: {
        title: "Elke Codes",
        description:
          "Blog focused on frontend development, photography, running and more",
        site: mockContext.site,
        items: [
          {
            title: "First Post",
            pubDate: mockBlogPosts[0].data.pubDate.toJSON(),
            description: "This is the first post.",
            link: "/posts/post-1/",
          },
          {
            title: "Second Post",
            pubDate: mockBlogPosts[1].data.pubDate.toJSON(),
            description: "This is the second post.",
            link: "/posts/post-2/",
          },
        ],
        customData: "<language>en-gb</language>",
      },
    });
  });

  it("should handle empty posts array", async () => {
    vi.mocked(getPublishedPosts).mockResolvedValue([]);
    vi.mocked(rss).mockImplementation((config) =>
      Promise.resolve(
        new Response(JSON.stringify({ data: config }), {
          status: 200,
        })
      )
    );

    const result = await GET(mockContext);

    expect(rss).toHaveBeenCalledWith({
      title: "Elke Codes",
      description:
        "Blog focused on frontend development, photography, running and more",
      site: mockContext.site,
      items: [],
      customData: "<language>en-gb</language>",
    });

    expect(await result.json()).toMatchObject({
      data: {
        title: "Elke Codes",
        description:
          "Blog focused on frontend development, photography, running and more",
        site: mockContext.site,
        items: [],
        customData: "<language>en-gb</language>",
      },
    });
  });
});
