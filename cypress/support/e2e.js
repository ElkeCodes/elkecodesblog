Cypress.Commands.add("openBlogPost", (slug) => {
  cy.visit(`http://localhost:4321/posts/${slug}`);
});

Cypress.Commands.add("verifyMenu", () => {
  cy.get("nav").should("contain", "Blog");
  cy.get("nav").should("contain", "Talks");
  cy.get("nav").should("contain", "Coding");
});

Cypress.Commands.add("verifyIntroduction", () => {
  cy.get("section").should("contain.text", "I'm a frontend developer");
});

import '@testing-library/cypress/add-commands'
import '@cypress-audit/lighthouse/commands'