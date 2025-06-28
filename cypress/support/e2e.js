Cypress.Commands.add("openBlogPost", (slug) => {
  cy.visit(`http://localhost:4321/posts/${slug}`);
});
