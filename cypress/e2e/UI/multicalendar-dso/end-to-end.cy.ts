/**
 * End-to-End Test Cases for Multicalendar Date Specific Overrides (DSO) Feature: This test file contains more assertions and validations
 * Test Cases:
 * 1. Add a New Custom Pricing with Multicalendar DSO: Navigate to the multicalendar page and create a new custom pricing from the Listings section using all the fields present in the DSO window.
 * 2. Update an Existing Custom Pricing with DSO: Update all the values and change the dates by directly clicking on the disabled label from the specified calendar field to validate that the DSO window is accessible through this method.
 * 3. Remove Custom Pricing from the DSO: Navigate to the "View Overrides" window and delete the existing custom pricing.
 */
import * as commonFunctions from '../../../support/commonFunctions';
import { CommonPageObjectsAndConstants } from '../../../support/page-objects/common-page-objects-constants';
import { DSOPageObjects } from '../../../support/page-objects/dso-page-objects';

let minPrice: number = 30,
  maxPrice: number = 150,
  finalPrice: number = 70,
  basePrice: number = 40,
  minimumStay: number = 2;
let updatedMinPrice: number = 40,
  updatedMaxPricePerc: number = 50,
  updatedfinalPrice: number = 120,
  updatedBasePrice: number = 50,
  updatedMinStay: number = 3;
describe('End-to-End - Custom pricing with Date Specific Overrides', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.clearCookies().login();
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  // -- Create a new Custom Pricing DSO with all details
  it('Add a new Custom Pricing Date Specific Overrides with all parameters', () => {
    commonFunctions.navigateToMultiCalendar();
    cy.waitForAnElement(CommonPageObjectsAndConstants.threeDotButtonIcon);
    cy.get(CommonPageObjectsAndConstants.threeDotButtonIcon)
      .eq(2)
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.threeDotMenuItems)
      .find(CommonPageObjectsAndConstants.menuItemLabel)
      .contains('Add Overrides')
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

    cy.get(DSOPageObjects.maxPrice)
      .clear()
      .type(`${maxPrice}`)
      .get(DSOPageObjects.basePrice)
      .clear()
      .type(`${basePrice}`)
      .get(DSOPageObjects.reasonForOverrideTA)
      .clear()
      .type(DSOPageObjects.reasonForDSOText);
    cy.get(DSOPageObjects.openAdvancedSettings)
      .click()
      .get(DSOPageObjects.overrideExpiry)
      .type('60', { force: true })
      .get(DSOPageObjects.addDaysToWeekDSO)
      .click({ force: true })
      .get(DSOPageObjects.selectDayBox)
      .should('exist');
    cy.get(DSOPageObjects.selectedDays)
      .should('not.be.visible')
      .get(DSOPageObjects.selectDayBox)
      .click({ force: true })
      .get(DSOPageObjects.selectSunday)
      .click({ force: true })
      .get(DSOPageObjects.selectSaturday)
      .click({ force: true })
      .get(DSOPageObjects.selectMonday)
      .click({ force: true });
    cy.get(DSOPageObjects.selectedDays)
      .scrollIntoView()
      .should('be.exist', { force: true })
      .contains('Monday,Saturday,Sunday')
      .get(DSOPageObjects.deleteDaysOfWeek)
      .should('be.exist')
      .and('be.visible', { force: true })
      .get(DSOPageObjects.addDSO)
      .click({ force: true });
    cy.get(DSOPageObjects.dsoPageTitle)
      .should('not.exist')
      .get(CommonPageObjectsAndConstants.chakraBandText)
      .contains('Disabled');
  });

  // -- Edit the newly created Custom Pricing DSO with all details
  it('Edit a Custom Pricing Date Specific Overrides with all parameters including changing the date', () => {
    cy.url().should('contain', 'https://app.pricelabs.co/multicalendar');
    cy.waitForAnElement(CommonPageObjectsAndConstants.chakraBandText)
      .get(CommonPageObjectsAndConstants.chakraBandText)
      .contains('Disabled')
      .click();

    cy.waitForAnElement(DSOPageObjects.dsoPageTitle)
      .get(DSOPageObjects.dsoPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.datePicker)
      .first()
      .click({ force: true })
      .get(DSOPageObjects.calendarFromDate).first()
      .click()
      .get(DSOPageObjects.calendarToDate).first()
      .click();
    cy.get(DSOPageObjects.dateField)
      .first()
      .should('have.value', 'Dec 27, 2024')
      .get(DSOPageObjects.dateField)
      .last()
      .should('have.value', 'Dec 30, 2024');
    cy.get(DSOPageObjects.finalPrice)
      .clear()
      .type(`${updatedfinalPrice}`)
      .get(DSOPageObjects.minPrice)
      .clear()
      .type(`${updatedMinPrice}`);
    cy.get(DSOPageObjects.maxPriceSelectBox)
      .select(DSOPageObjects.perChangeMaxPrice)
      .get(DSOPageObjects.maxPriceSelectBox)
      .should('have.value', 'percent_max');
    cy.get(DSOPageObjects.maxPercentageField)
      .clear()
      .type('50', { force: true })
      .should('have.value', `${updatedMaxPricePerc}`)
      .get(DSOPageObjects.minStay)
      .clear()
      .type(`${updatedMinStay}`);
    cy.get(DSOPageObjects.basePrice)
      .clear()
      .type(`${updatedBasePrice}`)
      .get(DSOPageObjects.reasonForOverrideTA)
      .clear()
      .type(DSOPageObjects.updateReasonForDSOText);
    cy.get(DSOPageObjects.openAdvancedSettings)
      .click()
      .get(DSOPageObjects.overrideExpiry)
      .clear({ force: true })
      .get(DSOPageObjects.addDaysToWeekDSO)
      .click({ force: true })
      .get(DSOPageObjects.selectDayBox)
      .should('exist');
    cy.get(DSOPageObjects.selectedDays)
      .should('not.be.visible')
      .get(DSOPageObjects.selectDayBox)
      .click({ force: true })
      .get(DSOPageObjects.selectSunday)
      .click({ force: true })
      .get(DSOPageObjects.selectSaturday)
      .click({ force: true });
    cy.get(DSOPageObjects.selectedDays)
      .scrollIntoView()
      .should('be.visible', { force: true })
      .contains('Saturday,Sunday')
      .get(DSOPageObjects.deleteDaysOfWeek)
      .should('be.exist')
      .and('be.visible', { force: true })
      .get(DSOPageObjects.updateDSO)
      .click({ force: true });
    cy.get(DSOPageObjects.dsoPageTitle)
      .should('not.exist', { force: true })
      .get(CommonPageObjectsAndConstants.chakraBandText)
      .should('not.contain', 'Disabled');
  });

  // -- Remove the updated Custom Pricing DSO
  it('Delete a Custom Pricing Date Specific Override', () => {
    cy.waitForAnElement(CommonPageObjectsAndConstants.threeDotButtonIcon);
    cy.get(CommonPageObjectsAndConstants.threeDotButtonIcon)
      .eq(2)
      .click({ force: true })
      .get(CommonPageObjectsAndConstants.threeDotMenuItems)
      .find(CommonPageObjectsAndConstants.menuItemLabel)
      .contains('View Overrides')
      .click();
    cy.waitForAnElement(DSOPageObjects.dsoViewPageTitle)
      .get(DSOPageObjects.dsoViewPageTitle)
      .should('contain', 'Date Specific Overrides');
    cy.get(DSOPageObjects.deleteFromViewPage)
      .first()
      .should('exist')
      .click()
      .get(CommonPageObjectsAndConstants.alertSuccess)
      .first()
      .should('contain', 'Date Specific Override Deleted');
    cy.get(DSOPageObjects.closeModalWindow)
      .click({ force: true })
      .get(DSOPageObjects.dsoViewPageTitle)
      .should('not.exist');
  });
});
