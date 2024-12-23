/**
 * Negative Test Cases for DSO Field Validations: This test file contains field based negative scenarios
 * Test Cases:
 * 1. Validate whether the system creates new custom pricing without entering any data in the fields.
 * 2. Validate the price fields to check if they accept only digits, excluding other characters, including special characters.
 * 3. Set the final price option as a percentage change on the recommended price to validate whether the field accepts values that are out of range.
 */
import * as commonFunctions from '../../../support/commonFunctions';
import { CommonPageObjectsAndConstants } from '../../../support/page-objects/common-page-objects-constants';
import { DSOPageObjects } from '../../../support/page-objects/dso-page-objects';

const inputWithOutNumbers = commonFunctions.generateRandomString(10);
let minPrice: number = 30,
  minimumStay: number = 2;
describe('Validate input fields to check negative scenarios', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.clearCookies().login();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('To check the validation of input fields whether accepting characters other than numbers', () => {
    commonFunctions.navigateToMultiCalendar();
    cy.waitForAnElement(CommonPageObjectsAndConstants.listingOptionButton);
    cy.get(CommonPageObjectsAndConstants.threeDotButtonIcon)
      .eq(1)
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.threeDotMenuItems)
      .find(CommonPageObjectsAndConstants.menuItemLabel)
      .contains('Add Overrides')
      .click();
    cy.waitForAnElement(DSOPageObjects.dsoPageTitle)
      .get(DSOPageObjects.dsoPageTitle)
      .should('contain', 'Date Specific Overrides');

    // -- Try to click add override button without inputing any value to none of the fields to validate the error message
    cy.get(DSOPageObjects.addDSO)
      .click()
      .get(CommonPageObjectsAndConstants.errorAlert)
      .should(
        'contain',
        'You need to set at least one custom pricing setting before you add.',
      );

    // --Input special character and letters to the price fields to validate whether it supports only numeric values or not
    cy.get(DSOPageObjects.finalPrice)
      .clear()
      .type(inputWithOutNumbers)
      .get(DSOPageObjects.minPrice)
      .clear()
      .type(inputWithOutNumbers)
      .get(CommonPageObjectsAndConstants.errorAlert)
      .should('contain', 'Fixed  custom pricing should be greater than 0.');
  });

  // --To check whether the percentage-based price field accepts values outside the valid range.
  it('To validate the % change on recommended price', () => {
    cy.url().should('contain', 'https://app.pricelabs.co/multicalendar');
    cy.waitForAnElement(DSOPageObjects.dsoPageTitle)
      .get(DSOPageObjects.dsoPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.finalPriceSelectBox)
      .select(DSOPageObjects.perChangePrice)
      .get(DSOPageObjects.finalPriceSelectBox)
      .should('have.value', 'percent');
    cy.get(DSOPageObjects.percentageField)
      .clear()
      .type('-200', { force: true })
      .get(DSOPageObjects.minStay)
      .type(`${minimumStay}`)
      .get(CommonPageObjectsAndConstants.errorAlert)
      .should(
        'contain',
        'Percentage custom pricing should be between -75% and 500%',
      );
    cy.get(DSOPageObjects.percentageField)
      .clear()
      .type('501', { force: true })
      .get(DSOPageObjects.minPrice)
      .type(`${minPrice}`)
      .get(CommonPageObjectsAndConstants.errorAlert)
      .should(
        'contain',
        'Percentage custom pricing should be between -75% and 500%',
      );
  });
});
