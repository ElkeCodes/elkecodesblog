describe("navigation on blogpost overview", () => {
  it("should navigate to the next and previous pages", () => {
    cy.visit(`http://localhost:4321/posts`);
    cy.findByRole("heading", { name: /page #1/ });
    cy.findByRole("navigation", { name: "Page navigation" }).within(() => {
      cy.findByRole("link", { name: "Go to the next page" }).click();
      cy.location("pathname").should("include", "/posts/2");
    });
    cy.findByRole("heading", { name: /page #2/ });
    cy.findByRole("navigation", { name: "Page navigation" }).within(() => {
      cy.findByRole("link", { name: "Go to the previous page" }).click();
      cy.location("pathname").should("include", "/posts");
    });
    cy.findByRole("heading", { name: /page #1/ });
  });
});
