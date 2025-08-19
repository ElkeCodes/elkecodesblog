import { expect, describe, test } from "vitest";
import {
  getStaticPaths,
  getImageOptions,
} from "src/pages/images/og/[...route]";

const getStaticPathsResult = [
  {
    params: {
      route: "reset-all-css-properties-in-1-line.png",
    },
  },
  {
    params: {
      route: "podcasts-i-listen-to-while-running.png",
    },
  },
  {
    params: {
      route: "study-shows-that-devs-are-20-percent-slower-with-ai.png",
    },
  },
  {
    params: {
      route:
        "5-key-takeaways-after-solving-50-plus-interview-questions-as-a-frontend-developer.png",
    },
  },
  {
    params: {
      route:
        "the-power-of-memoization-a-deep-dive-into-caching-functions-in-typescript.png",
    },
  },
  {
    params: {
      route: "back-to-top-svelte-component.png",
    },
  },
  {
    params: {
      route: "why-i-chose-astro-for-this-blog.png",
    },
  },
  {
    params: {
      route: "the-initial-git-commit.png",
    },
  },
];
describe("og image generation", () => {
  test("getStaticPaths", () => {
    expect(getStaticPaths({ paginate: ([]) => [] })).toEqual(
      expect.arrayContaining(getStaticPathsResult)
    );
  });

  describe("getImageOptions", () => {
    test("returns correct options with shortDescription and image", () => {
      const path = "post-1";
      const data = {
        title: "Post 1",
        shortDescription: "Short desc",
        description: "Long desc",
        image: { url: "image.png", alt: "test" },
        pubDate: new Date(2025, 7, 17),
        author: "Elke",
        tags: [],
      };
      const slug = "test";
      const result = getImageOptions(path, { data, slug });
      expect(result).toEqual({
        title: "Post 1",
        description: "Short desc",
        logo: {
          path: "src/blog/post-1/image.png",
          size: [240],
        },
        border: { width: 20, color: [206, 66, 87] },
        padding: 50,
        bgGradient: [[12, 15, 17]],
        bgImage: {
          path: "./src/images/elkecodes.png",
          position: ["start", "end"],
        },
        fonts: [
          "./public/fonts/Inter-Medium.otf",
          "./public/fonts/Inter-Bold.otf",
        ],
        font: {
          title: {
            size: 50,
            lineHeight: 1.3,
            families: ["Inter"],
            weight: "Bold",
          },
          description: {
            size: 36,
            lineHeight: 1.6,
            color: [115, 115, 115],
            families: ["Inter"],
            weight: "Normal",
          },
        },
      });
    });

    test("falls back to description if shortDescription is missing", () => {
      const path = "post-2";
      const data = {
        title: "Post 2",
        description: "Only desc",
        pubDate: new Date(2025, 7, 17),
        author: "Elke",
        tags: [],
      };
      const slug = "test";
      const result = getImageOptions(path, { data, slug });
      expect(result.description).toBe("Only desc");
    });

    test("sets logo to undefined if image is missing", () => {
      const path = "post-3";
      const data = {
        title: "Post 3",
        description: "No image",
        pubDate: new Date(2025, 7, 17),
        author: "Elke",
        tags: [],
      };
      const slug = "test";
      const result = getImageOptions(path, { data, slug });
      expect(result.logo).toBeUndefined();
    });

    test("always includes static options", () => {
      const path = "post-4";
      const data = {
        title: "Post 4",
        description: "Test",
        pubDate: new Date(2025, 7, 17),
        author: "Elke",
        tags: [],
      };
      const slug = "test";
      const result = getImageOptions(path, { data, slug });
      expect(result.border).toEqual({ width: 20, color: [206, 66, 87] });
      expect(result.padding).toBe(50);
      expect(result.bgGradient).toEqual([[12, 15, 17]]);
      expect(result.bgImage).toEqual({
        path: "./src/images/elkecodes.png",
        position: ["start", "end"],
      });
      expect(result.fonts).toEqual([
        "./public/fonts/Inter-Medium.otf",
        "./public/fonts/Inter-Bold.otf",
      ]);
      expect(result.font).toEqual({
        title: {
          size: 50,
          lineHeight: 1.3,
          families: ["Inter"],
          weight: "Bold",
        },
        description: {
          size: 36,
          lineHeight: 1.6,
          color: [115, 115, 115],
          families: ["Inter"],
          weight: "Normal",
        },
      });
    });
  });
});

// // og-image.test.js
// import { describe, it, expect, vi } from "vitest";
// import { getCollection } from "astro:content";
// import { OGImageRoute } from "astro-og-canvas";

// // Mock the dependencies
// vi.mock("astro:content", () => ({
//   getCollection: vi.fn(),
// }));

// vi.mock("astro-og-canvas", () => ({
//   OGImageRoute: vi.fn((config) => ({
//     getStaticPaths: vi.fn(),
//     GET: vi.fn(),
//   })),
// }));

// describe("OGImageRoute configuration", () => {
//   test("should transform blog collection into pages object", async () => {
//     const mockBlogs = [
//       {
//         id: "post-1",
//         data: {
//           title: "Post 1",
//           shortDescription: "Short desc",
//           description: "Long desc",
//           image: { url: "image.png" },
//         },
//       },
//       {
//         id: "post-2",
//         data: {
//           title: "Post 2",
//           description: "Only desc",
//         },
//       },
//     ];
//     getCollection.mockResolvedValue(mockBlogs);

//     // Import the module after mocking
//     const { pages } = await import("./your-file-path.js");

//     expect(getCollection).toHaveBeenCalledWith("blog");
//     expect(pages).toEqual({
//       "post-1": {
//         data: mockBlogs[0].data,
//         slug: "post-1",
//       },
//       "post-2": {
//         data: mockBlogs[1].data,
//         slug: "post-2",
//       },
//     });
//   });

//   test("should call OGImageRoute with correct config", async () => {
//     const mockBlogs = [
//       {
//         id: "post-1",
//         data: {
//           title: "Post 1",
//           shortDescription: "Short desc",
//           image: { url: "image.png" },
//         },
//       },
//     ];
//     getCollection.mockResolvedValue(mockBlogs);

//     await import("./your-file-path.js");

//     expect(OGImageRoute).toHaveBeenCalled();
//     const config = OGImageRoute.mock.calls[0][0];
//     expect(config.param).toBe("route");
//     expect(config.pages).toEqual({
//       "post-1": {
//         data: mockBlogs[0].data,
//         slug: "post-1",
//       },
//     });

//     // Test getImageOptions for a blog post with image
//     const options = config.getImageOptions("post-1", {
//       data: mockBlogs[0].data,
//     });
//     expect(options).toEqual({
//       title: "Post 1",
//       description: "Short desc",
//       logo: {
//         path: "src/blog/post-1/image.png",
//         size: [240],
//       },
//       border: { width: 20, color: [206, 66, 87] },
//       padding: 50,
//       bgGradient: [[12, 15, 17]],
//       bgImage: {
//         path: "./src/images/elkecodes.png",
//         position: ["start", "end"],
//       },
//       fonts: ["./public/fonts/Inter-Medium.otf", "./public/fonts/Inter-Bold.otf"],
//       font: {
//         title: {
//           size: 50,
//           lineHeight: 1.3,
//           families: ["Inter"],
//           weight: "Bold",
//         },
//         description: {
//           size: 36,
//           lineHeight: 1.6,
//           color: [115, 115, 115],
//           families: ["Inter"],
//           weight: "Normal",
//         },
//       },
//     });
//   });

//   test("should use description if shortDescription is missing", async () => {
//     const mockBlogs = [
//       {
//         id: "post-2",
//         data: {
//           title: "Post 2",
//           description: "Only desc",
//         },
//       },
//     ];
//     getCollection.mockResolvedValue(mockBlogs);

//     await import("./your-file-path.js");

//     const config = OGImageRoute.mock.calls[0][0];
//     const options = config.getImageOptions("post-2", {
//       data: mockBlogs[0].data,
//     });
//     expect(options.description).toBe("Only desc");
//     expect(options.logo).toBeUndefined();
//   });
// });
