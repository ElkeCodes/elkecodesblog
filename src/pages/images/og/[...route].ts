// src/pages/open-graph/[...route].ts
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import type { OGImageOptions } from "node_modules/astro-og-canvas/dist/types";

export const prerender = true;

const blogs = await getCollection("blog");
const pages = Object.fromEntries(
  blogs.map(({ id, data }) => [id, { data, slug: id }])
);

export const getImageOptions = (
  path: string,
  { data }: (typeof pages)[string]
): OGImageOptions => ({
  title: data.title,
  description: data.shortDescription || data.description,
  logo: data.image
    ? { path: `src/blog/${path}/${data.image.url}`, size: [240] }
    : undefined,
  border: { width: 20, color: [206, 66, 87] },
  padding: 50,
  bgGradient: [[12, 15, 17]],
  bgImage: {
    path: "./src/images/elkecodes.png",
    position: ["start", "end"],
  },
  fonts: ["./public/fonts/Inter-Medium.otf", "./public/fonts/Inter-Bold.otf"],
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

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions,
});
