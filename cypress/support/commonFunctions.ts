import { CommonPageObjectsAndConstants } from "./page-objects/common-page-objects-constants";

export const navigateToMultiCalendar = () => {
  cy.url().should('include', 'https://pricelabs.co/pricing');
  cy.get(CommonPageObjectsAndConstants.navigationItemTitle).contains('Dynamic Pricing').click();
  cy.waitForAnElement(CommonPageObjectsAndConstants.multiCalendarPage)
    .get(CommonPageObjectsAndConstants.multiCalendarPage)
    .should('be.visible')
    .click()
    .waitForPageLoad();
  cy.waitForAnElement(CommonPageObjectsAndConstants.featureMenuItem)
    .get(CommonPageObjectsAndConstants.featureMenuItem)
    .should('be.visible', { timeout: 10000 });
};
export function generateRandomString(length: number): string {
  const characterPool =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:",.<>?/`~';

  // Generate the random string
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    result += characterPool[randomIndex];
  }

  return result;
}
