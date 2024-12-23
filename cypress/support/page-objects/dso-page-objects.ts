export class DSOPageObjects {
  public static readonly dsoPageTitle = 'p[qa-id="dso-modal-title"]';
  public static readonly finalPrice = 'input[qa-id="dso-price"]';
  public static readonly minPrice = 'input[qa-id="dso-min-price"]';
  public static readonly maxPrice = 'input[qa-id="dso-max-price"]';
  public static readonly basePrice = 'input[qa-id="dso-base-price"]';
  public static readonly minStay = 'input[qa-id="dso-min-stay"]';
  public static readonly addDSO = 'button#add-dso';
  public static readonly existingDetails = 'p.chakra-text.css-1pf2kcq';
  public static readonly editOverride = 'div[id*="edit-override-view"]';
  public static readonly updateDSO = 'button#update-dso';
  public static readonly dsoViewPageTitle = 'p[qa-id="dso-view-modal-title"]';
  public static readonly removeDSO = 'button#remove-dso-btn';
  public static readonly finalPriceSelectBox = 'select#dso-modal-price-select';
  public static readonly maxPriceSelectBox =
    'select#dso-modal-max-price-select';
  public static readonly perChangePriceText = '% change on recommended price';
  public static readonly perChangePrice = 'percent';
  public static readonly perChangeMaxPrice = 'percent_max';
  public static readonly percentageField = 'input[qa-id="dso-price"]';
  public static readonly maxPercentageField = 'input[qa-id="dso-max-price"]';
  public static readonly reasonForOverrideTA =
    'textarea[qa-id="custom-price-reason"]';
  public static readonly reasonForDSOText =
    'To Manage Event-Driven Demand or Seasonal Variations{shift}{enter}Scenario: A major tech conference is scheduled in the city on specific dates. {shift}{enter}Action: Add a date-specific override to raise the nightly rates by 20% during the conference period to maximize revenue while aligning with market demand.';
  public static readonly updateReasonForDSOText =
    'To Manage Event-Driven Demand or Seasonal Variations{shift}{enter}Scenario: A major tech conference is scheduled in the city on specific dates. {shift}{enter}Action: Add a date-specific override to raise the nightly rates by 50% during the conference period to maximize revenue while aligning with market demand.';
  public static readonly openAdvancedSettings = 'div#open-dso-advance-setting';
  public static readonly overrideExpiry = 'input#override-expiry-input';
  public static readonly addDaysToWeekDSO = 'div#add-week-override-button';
  public static readonly selectDayBox = 'button[qa-id="dso-dow-override"]';
  public static readonly selectSunday = 'button[qa-id="Sunday"]';
  public static readonly selectSaturday = 'button[qa-id="Saturday"]';
  public static readonly selectMonday = 'button[qa-id="Monday"]';
  public static readonly selectedDays = 'p[qa-id="selected-days"]';
  public static readonly deleteDaysOfWeek = 'div#delete-dow-button';
  public static readonly datePicker =
    'div.react-datepicker-wrapper div.chakra-input__right-element';
  public static readonly calendarFromDate =
    'div[aria-label*="December 27th, 2024"]';
  public static readonly calendarToDate =
    'div[aria-label*="December 30th, 2024"]';
  public static readonly dateField =
    'div.react-datepicker-wrapper input.chakra-input';
  public static readonly deleteFromViewPage = 'div[id*="delete-override-view"]';
  public static readonly closeModalWindow =
    'button[qa-id="dso-view-modal-close-button"]';
}
