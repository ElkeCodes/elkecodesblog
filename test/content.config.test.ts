import { describe, it, expect } from "vitest";
import { blogSchema, collections } from "../src/content.config";

describe("content.config", () => {
  describe("blogSchema", () => {
    it("should parse the required blog data", () => {
      const validBlogData = {
        title: "mock title",
        pubDate: new Date("2025-08-15"),
        description: "mockDescription",
        author: "Elke",
        tags: ["mockTag1", "mockTag2"],
      };
      const parsedBlog = blogSchema.parse(validBlogData);
      expect(parsedBlog).toStrictEqual(validBlogData);
    });

    it("should parse the required and optional blog data", () => {
      const validBlogData = {
        title: "mock title",
        pubDate: new Date("2025-08-15"),
        description: "mockDescription",
        shortDescription: "mockShortDescription",
        author: "Elke",
        image: {
          url: "mockUrl",
          alt: "mockAlt",
        },
        tags: ["mockTag1", "mockTag2"],
        ogImage: "mockOgImage",
      };
      const parsedBlog = blogSchema.parse(validBlogData);
      expect(parsedBlog).toStrictEqual(validBlogData);
    });
  });

  describe("blogCollection", () => {
    it("should contain the blogSchema", () => {
      expect(collections.blog.schema).toStrictEqual(blogSchema);
    });

    it("should have the content_layer type", () => {
      expect(collections.blog.type).toEqual("content_layer");
    });
  });
});
