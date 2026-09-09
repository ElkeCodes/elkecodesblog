import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/blog",
        format: "md",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Published date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short description",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "object",
            name: "image",
            label: "Image",
            fields: [
              { type: "string", name: "url", label: "URL" },
              { type: "string", name: "alt", label: "Alt text" },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "ogImage",
            label: "Open Graph image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            const relativePath = document._sys?.relativePath ?? "";
            const slug = relativePath
              .replace(/\/index\.(md|mdx)$/i, "")
              .replace(/\.(md|mdx)$/i, "");
            return slug ? `/posts/${slug}` : "/posts";
          },
        },
      },
      {
        name: "postMdx",
        label: "Posts (MDX)",
        path: "src/blog",
        format: "mdx",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Published date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short description",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "object",
            name: "image",
            label: "Image",
            fields: [
              { type: "string", name: "url", label: "URL" },
              { type: "string", name: "alt", label: "Alt text" },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "ogImage",
            label: "Open Graph image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => {
            const relativePath = document._sys?.relativePath ?? "";
            const slug = relativePath
              .replace(/\/index\.(md|mdx)$/i, "")
              .replace(/\.(md|mdx)$/i, "");
            return slug ? `/posts/${slug}` : "/posts";
          },
        },
      },
    ],
  },
});
