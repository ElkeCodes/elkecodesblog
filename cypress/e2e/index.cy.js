describe("home cy", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });
  it("should have the correct titles", () => {
    cy.get("title").should("have.text", "Hi there, I'm Elke! 👋");
    cy.get("h1").should("have.text", "Hi there, I'm Elke! 👋");
    cy.get("h2").should("have.text", "Latest blogposts");
  });

  it("should have the introduction", () => {
    cy.get("section").should("contain.text", "I'm a frontend developer");
  });

  it("should have the menu", () => {
    cy.verifyMenu();
  });
});
