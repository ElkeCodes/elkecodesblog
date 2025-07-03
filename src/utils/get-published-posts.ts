import { getCollection } from "astro:content";

export const getPublishedPosts = () =>
  getCollection(
    "blog",
    (post) => new Date(post.data.pubDate) <= new Date()
  ).then((posts) =>
    posts.map((post) => ({
      ...post,
      ogImage: `/images/og/${post.id}.png`,
    }))
  );
