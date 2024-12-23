// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error to the console (optional)
  console.log('Caught uncaught exception:', err.message);

  // Prevent Cypress from failing the test
  return false;
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Handle specific error messages, and prevent test failure
  if (
    err.message.includes('This page was cleared by navigating to about:blank')
  ) {
    return false; // Prevents Cypress from failing the test
  }
  return true;
});
