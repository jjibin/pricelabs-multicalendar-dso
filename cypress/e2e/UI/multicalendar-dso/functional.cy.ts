/**
 * Functional Test Cases for the Multicalendar Date Specific Overrides (DSO) Feature: This test file contains basic scenarios related to the multicalendar DSO
 * Test Cases:
 * 1. Adding a New Custom Pricing with Multicalendar DSO: This test case covers creating a new custom pricing from the Listings section of the multicalendar page using minimal required fields.
 * 2. Updating an Existing Custom Pricing with DSO: This test case covers updating the required values of a newly created custom pricing entry via the "View Overrides" window.
 * 3. Removing a Custom Pricing from the DSO: This test case covers removing a custom pricing entry by navigating to the "View Overrides" window, and switch to editing mode and using the delete icon.
 */
import * as commonFunctions from '../../../support/commonFunctions';
import { CommonPageObjectsAndConstants } from '../../../support/page-objects/common-page-objects-constants';
import { DSOPageObjects } from '../../../support/page-objects/dso-page-objects';

let minPrice: number = 45,
  maxPrice: number = 150,
  finalPrice: number = 60,
  basePrice: number = 40,
  minimumStay: number = 2,
  updatedfinalPrice: number = 80;
describe('Functional Suite - CRUD Operations for MultiCalendar DSO', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.clearCookies().login();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  // -- Using the menu item to create the custom pricing
  it('Add New Custom Pricing with Date Specific Override', () => {
    commonFunctions.navigateToMultiCalendar();
    cy.waitForAnElement(CommonPageObjectsAndConstants.listingOptionButton);
    cy.get(CommonPageObjectsAndConstants.listingOptionButton)
      .first()
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.addOverrides)
      .click();
    cy.waitForAnElement(DSOPageObjects.dsoPageTitle)
      .get(DSOPageObjects.dsoPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.finalPrice)
      .clear()
      .type(`${finalPrice}`)
      .get(DSOPageObjects.minPrice)
      .clear()
      .type(`${minPrice}`)
      .get(DSOPageObjects.minStay)
      .clear()
      .type(`${minimumStay}`);
    cy.get(DSOPageObjects.addDSO).click();
  });

  // -- Using the view override window to edit the newly created custom pricing
  it('Update Custom Pricing Date Specific Override', () => {
    cy.url().should('include', 'https://app.pricelabs.co/multicalendar');
    cy.waitForAnElement(CommonPageObjectsAndConstants.listingOptionButton);
    cy.get(CommonPageObjectsAndConstants.listingOptionButton)
      .first()
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.viewOverrides)
      .click();
    cy.waitForAnElement(DSOPageObjects.dsoViewPageTitle)
      .get(DSOPageObjects.dsoViewPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.existingDetails)
      .first()
      .should('contain', `${finalPrice}`)
      .get(DSOPageObjects.existingDetails)
      .eq(1)
      .should('contain', `${minimumStay}`);
    cy.get(DSOPageObjects.existingDetails)
      .last()
      .should('contain', `${minPrice}`);
    cy.get(DSOPageObjects.editOverride)
      .click()
      .waitForAnElement(DSOPageObjects.maxPrice)
      .get(DSOPageObjects.finalPrice)
      .clear()
      .type(`${updatedfinalPrice}`);
    cy.get(DSOPageObjects.maxPrice)
      .clear()
      .type(`${maxPrice}`)
      .get(DSOPageObjects.basePrice)
      .clear()
      .type(`${basePrice}`)
      .get(DSOPageObjects.minPrice)
      .clear()
      .type(`${minPrice}`);
    cy.get(DSOPageObjects.updateDSO)
      .click()
      .waitForAnElement(CommonPageObjectsAndConstants.bandText)
      .contains(updatedfinalPrice); //.should('contain', 'Price: '+ updatedfinalPrice + ' $, ' + minimumStay + ' ☾, Base Price: ' + basePrice + ' $, Min Price: ' + minPrice + ' $, Max Price: ' + maxPrice + ' $')
  });

  // -- Using the delete icon from the edit page to remove the custom pricing
  it('Delete Custom Pricing Date Specific Override', () => {
    cy.url().should('include', 'https://app.pricelabs.co/multicalendar');
    cy.waitForAnElement(CommonPageObjectsAndConstants.listingOptionButton);
    cy.get(CommonPageObjectsAndConstants.listingOptionButton)
      .first()
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.viewOverrides)
      .click();
    cy.waitForAnElement(DSOPageObjects.dsoViewPageTitle)
      .get(DSOPageObjects.dsoViewPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.existingDetails)
      .first()
      .should('contain', `${updatedfinalPrice}`)
      .get(DSOPageObjects.existingDetails)
      .eq(1)
      .should('contain', `${minimumStay}`);
    cy.get(DSOPageObjects.existingDetails)
      .last()
      .should('contain', `${maxPrice}`);
    cy.get(DSOPageObjects.editOverride)
      .click()
      .waitForAnElement(DSOPageObjects.removeDSO)
      .get(DSOPageObjects.removeDSO)
      .click()
      .get(CommonPageObjectsAndConstants.bandText)
      .should('not.exist'); //.waitForAnElement(CommonPageObjectsAndConstants.bandText).contains(updatedfinalPrice);//.should('contain', 'Price: '+ updatedfinalPrice + ' $, ' + minimumStay + ' ☾, Base Price: ' + basePrice + ' $, Min Price: ' + minPrice + ' $, Max Price: ' + maxPrice + ' $')
  });
});
