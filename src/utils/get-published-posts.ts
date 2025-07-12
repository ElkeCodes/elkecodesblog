import { getCollection } from "astro:content";

export const getPublishedPosts = () =>
  getCollection(
    "blog",
    (post) => new Date(post.data.pubDate) <= new Date()
  ).then((posts) =>
    posts
      .map((post) => ({
        ...post,
        ogImage: `/images/og/${post.id}.png`,
      }))
      .sort(
        ({ data: { pubDate: pubDateA } }, { data: { pubDate: pubDateB } }) =>
          new Date(pubDateB).valueOf() - new Date(pubDateA).valueOf()
      )
  );
