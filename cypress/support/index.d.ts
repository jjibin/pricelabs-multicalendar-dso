/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to the application
     * @example cy.login()
     */
    login(): Chainable<void>;
    waitForAnElement(selector: string, timeout?: number): Chainable<Element>;
    waitForPageLoad(): Chainable<void>;
    saveLocalStorage(): void;
    restoreLocalStorage(): void;
  }
}
