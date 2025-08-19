export const mockBlogPost = {
  id: 1,
  data: {
    title: "mockTitle",
    tags: ["mockTag1", "mockTag2"],
    pubDate: new Date("2025-01-01"),
  },
  body: `"body": "## Heading 1\n\nMock text in a paragraph`,
  rendered: {
    html: "<h2>Heading 1</h2><p>Mock text in a paragraph</p>",
    metadata: {
      headings: [
        {
          depth: 2,
          slug: "heading-1",
          text: "Heading 1",
        },
      ],
    },
  },
};

export const createBlogPost = ({ headings }: { headings: boolean }) => ({
  id: 1,
  data: {
    title: "mockTitle",
    tags: ["mockTag1", "mockTag2"],
    pubDate: new Date("2025-01-01"),
  },
  body: `"body": "## Heading 1\n\nMock text in a paragraph`,
  rendered: {
    html: `${headings ? "<h2>Heading 1</h2>" : ""}<p>Mock text in a paragraph</p>`,
    metadata: {
      headings: headings
        ? [
            {
              depth: 2,
              slug: "heading-1",
              text: "Heading 1",
            },
          ]
        : undefined,
    },
  },
});

export const mockBlogPosts = [
  {
    id: "post-1",
    data: {
      title: "First Post",
      pubDate: new Date("2025-01-01"),
      description: "This is the first post.",
    },
  },
  {
    id: "post-2",
    data: {
      title: "Second Post",
      pubDate: new Date("2025-01-02"),
      description: "This is the second post.",
    },
  },
];
