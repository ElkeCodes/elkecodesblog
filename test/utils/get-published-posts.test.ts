import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPublishedPosts } from "@utils/get-published-posts";
import { getCollection } from "astro:content";

// Mock the astro:content module
vi.mock("astro:content", () => {
  return {
    getCollection: vi.fn(),
  };
});

describe("getPublishedPosts", () => {
  const mockPosts = [
    {
      collection: "blog" as const,
      id: "post-1",
      data: {
        pubDate: new Date("2025-05-15"),
        title: "Post 1",
        description: "Description 1",
        author: "Author 1",
        tags: ["tag 1"],
      },
    },
    {
      collection: "blog" as const,
      id: "post-2",
      data: {
        pubDate: new Date("2025-01-10"),
        title: "Post 2",
        description: "Description 2",
        author: "Author 2",
        tags: ["tag 2"],
      },
    },
    {
      collection: "blog" as const,
      id: "post-3",
      data: {
        pubDate: new Date("2025-07-31"),
        title: "Post 3",
        description: "Description 3",
        author: "Author 3",
        tags: ["tag 3"],
      },
    },
    {
      collection: "blog" as const,
      id: "future-post",
      data: {
        pubDate: new Date("2035-01-01"),
        title: "Future Post",
        description: "Description future",
        author: "Author future",
        tags: ["tag future"],
      },
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers({ now: new Date(2025, 8, 1) });
    vi.setSystemTime(new Date(2025, 8, 1));
    vi.clearAllMocks();
  });

  it("should add ogImage path to each post", async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPosts.slice(0, 2));

    const result = await getPublishedPosts();

    expect(result[0]).toHaveProperty("ogImage", "/images/og/post-1.png");
    expect(result[1]).toHaveProperty("ogImage", "/images/og/post-2.png");
  });

  it("should sort posts by pubDate in descending order", async () => {
    vi.mocked(getCollection).mockResolvedValue(mockPosts.slice(0, 3));

    const result = await getPublishedPosts();

    expect(result[0].id).toBe("post-3");
    expect(result[1].id).toBe("post-1");
    expect(result[2].id).toBe("post-2");
  });

  it("should handle empty collection", async () => {
    vi.mocked(getCollection).mockResolvedValue([]);

    const result = await getPublishedPosts();

    expect(result).toEqual([]);
  });

  it("should preserve all original post properties", async () => {
    vi.mocked(getCollection).mockResolvedValue([mockPosts[0]]);

    const result = await getPublishedPosts();

    expect(result[0]).toMatchObject({
      id: "post-1",
      data: {
        pubDate: new Date("2025-05-15"),
        title: "Post 1",
        description: "Description 1",
        author: "Author 1",
        tags: ["tag 1"],
      },
    });
  });
});
