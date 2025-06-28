const openBlog = () => cy.openBlogPost("why-i-chose-astro-for-this-blog");

describe("blog post 'Why I chose Astro for this blog'", () => {
  beforeEach(() => {
    cy.openBlogPost("why-i-chose-astro-for-this-blog");
  });
  it("should have the correct titles", () => {
    cy.get("title").should("have.text", "Why I chose Astro for this blog");
    cy.get("h2").should("contain", "Ease of setup");
    cy.get("h2").should("contain", "Extremely fast dev server");
    cy.get("h2").should("contain", "Markdown with syntax highlighting");
    cy.get("h2").should(
      "contain",
      "Static Site Generation with partial hydration"
    );
    cy.get("h2").should("contain", "No lock-in to a framework");
    cy.get("h2").should("contain", "Conclusion");
  });

  it("should have the introduction", () => {
    cy.get("section").should("contain.text", "I'm a frontend developer");
  });

  it("should have the menu", () => {
    cy.get("nav").should("contain", "Home");
    cy.get("nav").should("contain", "About");
    cy.get("nav").should("contain", "Blog");
  });
});
