import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { getPublishedPosts } from "../utils/get-published-posts";

export async function GET(context) {
  return rss({
    title: "Elke Codes",
    description:
      "Blog focused on frontend development, photography, running and more",
    site: context.site,
    items: (await getPublishedPosts()).map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}
