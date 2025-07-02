// src/pages/open-graph/[...route].ts
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

export const prerender = true;

const blogs = await getCollection("blog");
const pages = Object.fromEntries(
  blogs.map(({ id, data }) => [id, { data, slug: id }])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (path: string, { data }: (typeof pages)[string]) => ({
    title: data.title,
    description: data.shortDescription || data.description,
    logo: { path: `src/blog/${path}/${data.image.url}`, size: [240] },
    border: { width: 10, color: [206, 66, 87] },
    padding: 50,
    bgGradient: [[12, 15, 17]],
    font: {
      title: {
        size: 64,
      },
      description: {
        size: 40,
      },
    },
  }),
});
