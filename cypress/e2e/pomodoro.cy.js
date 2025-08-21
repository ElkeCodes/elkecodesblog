describe("pomodoro page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321/coding/pomodoro");
  });
  it("should have the correct titles", () => {
    cy.get("title").should("have.text", "Pomodoro");
    cy.get("h1").should("have.text", "Pomodoro");
  });

  it("should have the introduction", () => {
    cy.verifyIntroduction();
  });

  it("should have the menu", () => {
    cy.verifyMenu();
  });
});
