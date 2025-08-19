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
    getPublishedPosts.mockResolvedValue(Promise.resolve(mockBlogPosts));
    rss.mockImplementation((config) => config);

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

    expect(result).toEqual({
      title: "Elke Codes",
      description:
        "Blog focused on frontend development, photography, running and more",
      site: mockContext.site,
      items: [
        {
          title: "First Post",
          pubDate: mockBlogPosts[0].data.pubDate,
          description: "This is the first post.",
          link: "/posts/post-1/",
        },
        {
          title: "Second Post",
          pubDate: mockBlogPosts[1].data.pubDate,
          description: "This is the second post.",
          link: "/posts/post-2/",
        },
      ],
      customData: "<language>en-gb</language>",
    });
  });

  it("should handle empty posts array", async () => {
    getPublishedPosts.mockResolvedValue([]);
    rss.mockImplementation((config) => config);

    const result = await GET(mockContext);

    expect(rss).toHaveBeenCalledWith({
      title: "Elke Codes",
      description:
        "Blog focused on frontend development, photography, running and more",
      site: mockContext.site,
      items: [],
      customData: "<language>en-gb</language>",
    });

    expect(result.items).toEqual([]);
  });
});
