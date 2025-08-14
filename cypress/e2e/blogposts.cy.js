const blogPosts = [
  {
    slug: "why-i-chose-astro-for-this-blog",
    title: "Why I chose Astro for this blog",
    headings: [
      { text: "Ease of setup", level: 2 },
      { text: "Extremely fast dev server", level: 2 },
      { text: "Markdown with syntax highlighting", level: 2 },
      { text: "Static Site Generation with partial hydration", level: 2 },
      { text: "No lock-in to a framework", level: 2 },
      { text: "Conclusion", level: 2 },
    ],
  },
  {
    slug: "back-to-top-svelte-component",
    title: "Writing a BackToTop Svelte component",
    headings: [
      { text: "The final code", level: 2 },
      { text: "Breaking down how every part works", level: 2 },
      {
        text: "The handler to scroll back to the top: scrollToTop()",
        level: 3,
      },
      {
        text: "Keeping track of the scrolling position: handleOnScroll()",
        level: 3,
      },
      { text: "The scroll back to top button in HTML", level: 3 },
      { text: "The styling and animation", level: 3 },
      { text: "Conclusion", level: 2 },
    ],
  },
  {
    slug: "study-shows-that-devs-are-20-percent-slower-with-ai",
    title: "Study shows that devs are 20 percent slower with AI",
    headings: [
      { text: "What is the study and who conducted it", level: 2 },
      { text: "What they actually measured", level: 2 },
      { text: "The results", level: 2 },
      { text: "My 2 cents", level: 2 },
    ],
  },
  {
    slug: "5-key-takeaways-after-solving-50-plus-interview-questions-as-a-frontend-developer",
    title:
      "5 key takeaways from solving 50+ coding interview questions as a frontend developer",
    headings: [
      {
        text: "Takeaway #1: being comfortable in the technology helps",
        level: 2,
      },
      {
        text: "Takeaway #2: make sure you understand the question fully",
        level: 2,
      },
      {
        text: "Takeaway #3: not every question can be solved the same day",
        level: 2,
      },
      {
        text: "Takeaway #4: basic algorithms and data structure knowledge comes in handy",
        level: 2,
      },
      {
        text: "Takeaway #5: you’ll be able to learn the quirks and advanced concepts",
        level: 2,
      },
      { text: "Conclusion", level: 2 },
    ],
  },
  {
    slug: "the-power-of-memoization-a-deep-dive-into-caching-functions-in-typescript",
    title:
      "The Power of Memoization: A Deep Dive into Caching Functions in TypeScript",
    headings: [
      { text: "The Memoization Function", level: 2 },
      { text: "When would you use a memoize function", level: 2 },
      { text: "Pure functions with heavy computations", level: 3 },
      { text: "Frequent calls with repeated inputs", level: 3 },
      { text: "Potential pitfalls and considerations", level: 2 },
      { text: "Memory", level: 3 },
      { text: "Key serialisation", level: 3 },
      { text: "Conclusion", level: 2 },
    ],
  },
  {
    slug: "podcasts-i-listen-to-while-running",
    title: "Podcasts I listen to while running",
    headings: [
      { text: "The Running Channel", level: 2 },
      { text: "Critical Role", level: 2 },
      { text: "Dungeons & Daddies", level: 2 },
      { text: "Hello from the Magic Tavern", level: 2 },
      { text: "I Spent a Day With…", level: 2 },
      { text: "My Dad Wrote a Porno", level: 2 },
      { text: "Welcome to the AA", level: 2 },
      { text: "Nerdland", level: 2 },
    ],
  },
  {
    slug: "reset-all-css-properties-in-1-line",
    title: "Reset all CSS properties in 1 line",
    headings: [
      { text: "The setup: a styled paragraph", level: 2 },
      { text: "Revert all stylings", level: 2 },
      { text: "What about ‘initial’?", level: 2 },
      { text: "Conclusion", level: 2 },
    ],
  },
];

blogPosts.forEach(({ slug, title, headings }) => {
  describe(`blog post '${title}'`, () => {
    beforeEach(() => {
      cy.openBlogPost(slug);
    });
    it("should have the correct titles", () => {
      cy.get("title").should("have.text", title);
      headings.forEach(({ text, level }) => {
        cy.get(`h${level}`).should("contain", text);
      });
    });

    it("should have the introduction", () => {
      cy.verifyIntroduction();
    });

    it("should have the menu", () => {
      cy.verifyMenu();
    });
  });
});
