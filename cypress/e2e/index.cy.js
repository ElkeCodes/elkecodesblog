const viewports = ["iphone-6", "samsung-s10", "macbook-15"];
viewports.forEach((viewport) => {
  describe(`${viewport} - homepage`, () => {
    beforeEach(() => {
      cy.viewport(viewport);
      cy.visit("http://localhost:4321");
    });
    it("should have the correct titles", () => {
      cy.get("title").should("have.text", "Hi there, I'm Elke! 👋");
      cy.get("h1").should("have.text", "Hi there, I'm Elke! 👋");
      cy.get("h2").should("have.text", "Latest blogposts");
    });

    it("should have the introduction", () => {
      cy.verifyIntroduction();
    });

    it("should have the menu", () => {
      cy.verifyMenu();
    });

    it.skip("should have proper lighthouse scores", () => {
      cy.lighthouse();
    });

    it("should show the latest blogpost and navigate to it when clicking on it", () => {
      cy.findByRole("list", { name: "Latest blogposts" }).within(() => {
        cy.findAllByRole("heading")
          .first()
          .invoke("text")
          .then((text) => {
            cy.wrap(text).as("expectedTitle");
            cy.findByRole("heading", { name: text }).click();
          });
      });
      cy.location("pathname").should("include", "/posts/");
      cy.get("@expectedTitle").then((elementText) => {
        cy.findByRole("heading", { name: elementText }).should("be.visible");
      });
    });
  });
});
