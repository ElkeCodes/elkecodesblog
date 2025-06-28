const openBlog = () => cy.visit("http://localhost:4321");

describe("home page", () => {
  it("should have the correct titles", () => {
    const page = openBlog();

    page.get("title").should("have.text", "Hi there, I'm Elke! 👋");
    page.get("h1").should("have.text", "Hi there, I'm Elke! 👋");

    page.get("h2").should("have.text", "Latest blogposts");
  });

  it("should have the introduction", () => {
    const page = openBlog();
    page.get("section").should("contain.text", "I'm a frontend developer");
  });

  it("should have the menu", () => {
    const page = openBlog();
    page.get("nav").should("contain", "Home");
    page.get("nav").should("contain", "About");
    page.get("nav").should("contain", "Blog");
  });
});
