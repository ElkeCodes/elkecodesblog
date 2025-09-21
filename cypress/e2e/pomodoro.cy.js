import { testOnViewports } from "../support/utils";

describe(`pomodoro page`, () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321/coding/pomodoro");
    cy.clock(); // Mock timers
  });
  // before(() => {
  // });
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

  it("should render the action buttons, the state and a timer of 25:00", () => {
    cy.findByRole("button", { name: "Next" }).should("exist");
    cy.findByRole("button", { name: "Start" }).should("exist");
    cy.findByRole("button", { name: "Reset" }).should("exist");
    cy.findByRole("button", { name: "Previous" }).should("exist");
    cy.findByRole("status", { name: "Current state" }).should("exist");
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "25:00"
    );
  });

  it("starts the stopwatch and updates the time", () => {
    cy.clock().then((clock) => {
      cy.findByRole("button", { name: /start/i })
        .click()
        .then(() => {
          clock.tick(1000);
          cy.findByRole("timer", { name: "Remaining time" }).should(
            "have.text",
            "24:59"
          );
          clock.tick(1000);
          cy.findByRole("timer", { name: "Remaining time" }).should(
            "have.text",
            "24:58"
          );
        });
    });
  });

  it("pauses the stopwatch", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.tick(1000);
    cy.findByRole("button", { name: /pause/i }).click();
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "24:59"
    );
    cy.tick(1000);
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "24:59"
    );
  });

  it("resets the stopwatch", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.tick(1000);
    cy.findByRole("button", { name: /reset/i }).click();
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "25:00"
    );
  });

  it("stops the stopwatch when it reaches 00:00", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.tick(60 * 1000); // 1 minute
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "24:00"
    );
    cy.tick(24 * 60 * 1000); // 24 minutes
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "00:00"
    );
    cy.tick(60 * 1000); // 1 more minute
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "00:00"
    );
  });

  it("toggles the start/pause button text", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.findByRole("button", { name: /pause/i }).should("exist");
    cy.findByRole("button", { name: /pause/i }).click();
    cy.findByRole("button", { name: /start/i }).should("exist");
  });

  it("shows the backdrop when active", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.findByRole("presentation", { hidden: true }).should("exist");
  });

  it("hides the backdrop when paused", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.findByRole("presentation", { hidden: true }).should("exist");
    cy.findByRole("button", { name: /pause/i }).click();
    cy.findByRole("presentation", { hidden: true }).should("not.exist");
  });

  it("pauses when a click on the backdrop occurs", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.findByRole("presentation", { hidden: true }).click();
    cy.findByRole("presentation", { hidden: true }).should("not.exist");
    cy.findByRole("button", { name: /pause/i }).should("not.exist");
  });

  it("formats time correctly for hours, minutes, and seconds", () => {
    cy.findByRole("button", { name: /start/i }).click();
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "25:00"
    );
    cy.tick(60000 * 23); // 23 minutes
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "02:00"
    );
    cy.tick(1000 * 45); // 45 seconds
    cy.findByRole("timer", { name: "Remaining time" }).should(
      "have.text",
      "01:15"
    );
  });

  it("should go through the correct states when clicking next", () => {
    const getStatus = () => cy.findByRole("status", { name: "Current state" });

    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Long break");
    cy.findByRole("button", { name: "Next" }).click();
    getStatus().should("have.text", "Pomodoro");
  });

  it("should go through the correct states when clicking previous", () => {
    const getStatus = () => cy.findByRole("status", { name: "Current state" });

    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Long break");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Pomodoro");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Short break");
    cy.findByRole("button", { name: "Previous" }).click();
    getStatus().should("have.text", "Pomodoro");
  });
});
