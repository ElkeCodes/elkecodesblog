export const getPublishedPosts = () =>
  Object.values(import.meta.glob("../pages/posts/*/*.md", { eager: true })).filter(
    (post: any) => new Date(post.frontmatter.pubDate) <= new Date()
  );
