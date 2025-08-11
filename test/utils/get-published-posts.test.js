import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPublishedPosts } from "../../src/utils/get-published-posts";

// Mock the astro:content module
vi.mock("astro:content", () => {
  return {
    getCollection: vi.fn(),
  };
});

const { getCollection } = await import("astro:content");

describe("getPublishedPosts", () => {
  const mockPosts = [
    {
      id: "post-1",
      data: {
        pubDate: "2025-05-15",
        title: "Post 1",
      },
    },
    {
      id: "post-2",
      data: {
        pubDate: "2025-01-10",
        title: "Post 2",
      },
    },
    {
      id: "post-3",
      data: {
        pubDate: "2025-07-31",
        title: "Post 3",
      },
    },
    {
      id: "future-post",
      data: {
        pubDate: "2035-01-01",
        title: "Future Post",
      },
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers({ now: new Date(2025, 8, 1) });
    vi.setSystemTime(new Date(2025, 8, 1));
    vi.clearAllMocks();
  });

//   it("should filter out future posts", async () => {
//     getCollection.mockResolvedValue(mockPosts);

//     const result = await getPublishedPosts();

//     // Should exclude the future post
//     expect(result).toHaveLength(3);
//     expect(result.some((post) => post.id === "future-post")).toBe(false);
//   });

  it("should add ogImage path to each post", async () => {
    getCollection.mockResolvedValue(mockPosts.slice(0, 2));

    const result = await getPublishedPosts();

    expect(result[0]).toHaveProperty("ogImage", "/images/og/post-1.png");
    expect(result[1]).toHaveProperty("ogImage", "/images/og/post-2.png");
  });

  it("should sort posts by pubDate in descending order", async () => {
    getCollection.mockResolvedValue(mockPosts.slice(0, 3));

    const result = await getPublishedPosts();

    expect(result[0].id).toBe("post-3");
    expect(result[1].id).toBe("post-1");
    expect(result[2].id).toBe("post-2");
  });

  it("should handle empty collection", async () => {
    getCollection.mockResolvedValue([]);

    const result = await getPublishedPosts();

    expect(result).toEqual([]);
  });

  it("should preserve all original post properties", async () => {
    getCollection.mockResolvedValue([mockPosts[0]]);

    const result = await getPublishedPosts();

    expect(result[0]).toMatchObject({
      id: "post-1",
      data: {
        pubDate: "2025-05-15",
        title: "Post 1",
      },
    });
  });
});
