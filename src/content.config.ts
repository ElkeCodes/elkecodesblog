import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  shortDescription: z.string().optional(),
  author: z.string(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()),
  ogImage: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/blog" }),
  schema: blogSchema,
});

export const collections = { blog };
