// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { CommonPageObjectsAndConstants } from "./page-objects/common-page-objects-constants";

// -- Login to user account
Cypress.Commands.add('login', () => {
  cy.visit('/signin'); // Navigates to the signin page
  cy.get(CommonPageObjectsAndConstants.username).type(Cypress.env('username'));
  cy.get(CommonPageObjectsAndConstants.password).type(Cypress.env('password'), { log: false });
  cy.get(CommonPageObjectsAndConstants.loginButton).click();
  cy.get(CommonPageObjectsAndConstants.profileName, { timeout: 8000 })
    .should('be.visible')
    .waitForPageLoad()
    .log('Sign In Successful');
});

// -- Waiting for an element to be avialable on the page
Cypress.Commands.add(
  'waitForAnElement',
  (selector: string, timeout = 20000) => {
    cy.log(`Waiting for element: ${selector}`);
    cy.get('body').then(() => {
      cy.get(selector, { timeout }).should('be.visible');
    });
  },
);

// --Waiting to load the page completely
Cypress.Commands.add('waitForPageLoad', () => {
  cy.log('Waiting for page to load');
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      const checkReadyState = () => {
        if (win.document.readyState === 'complete') {
          resolve();
        } else {
          setTimeout(checkReadyState, 100);
        }
      };
      checkReadyState();
    });
  });
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
