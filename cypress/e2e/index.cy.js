import { testOnViewports } from "../support/utils";

testOnViewports("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });
  it("should have the correct titles", () => {
    cy.get("title").should("have.text", "Hi there, I'm Elke! 👋");
    cy.get("h1").should("have.text", "Hi there, I'm Elke! 👋");
    cy.findByRole("heading", { name: "Latest blogpost", level: 2 });
    cy.findByRole("heading", { name: "Coding projects", level: 2 });
    cy.findByRole("heading", { name: "Talks", level: 2 });
    cy.findByRole("heading", {
      name: "What am I doing right now?",
      level: 2,
    });
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
    cy.findByRole("region", { name: "Latest blogpost" }).within(() => {
      cy.findAllByRole("heading")
        .eq(1)
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

  it("should show the cassidoo coding project and navigate to it when clicking on it", () => {
    cy.findByRole("region", { name: "Coding projects" }).within(() => {
      cy.findAllByRole("heading")
        .eq(1)
        .invoke("text")
        .then((text) => {
          cy.wrap(text).as("expectedTitle");
          cy.findByRole("heading", { name: text }).click();
        });
    });
    cy.location("pathname").should(
      "include",
      "/coding/rendez-vous-with-cassidoo"
    );
    cy.get("@expectedTitle").then((elementText) => {
      cy.findByRole("heading", { name: elementText }).should("be.visible");
    });
  });

  it("should show a section on coding projects and navigate to the coding page when clicking on the link", () => {
    cy.findByRole("region", { name: "Coding projects" }).within(() => {
      cy.findAllByRole("link").last().click();
    });
    cy.location("pathname").should("include", "/coding");
  });

  it("should show a section on talks and navigate to the talks page when clicking on the link", () => {
    cy.findByRole("region", { name: "Talks" }).within(() => {
      cy.findAllByRole("link").first().click();
    });
    cy.location("pathname").should("include", "/talks");
  });

  it("should show a section about what I am doing now and navigate to the now page when clicking on the link", () => {
    cy.findByRole("region", { name: "What am I doing right now?" }).within(
      () => {
        cy.findAllByRole("link").first().click();
      }
    );
    cy.location("pathname").should("include", "/now");
  });
});
