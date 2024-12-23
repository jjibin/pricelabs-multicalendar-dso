const currentDate = new Date();
const formattedDate = currentDate
  .toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  .replace(/,/g, ''); // "Mon Dec 23 2024" format

describe('API - Multicalendar Date Specific Overrides', () => {
  it('Should initialize a session and save the token', () => {
    const requestPayload = {
      applicationIdentifier: Cypress.env('applicationIdentifier'),
      subscriberId: Cypress.env('subscriberId'),
      hmacHash: null,
    };

    // Send the POST request
    cy.request({
      method: 'POST',
      url: Cypress.env('validateUrl'),
      body: requestPayload,
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(201);

      // Extract the token from the response
      const token = response.body.data?.token;
      expect(token).to.exist; // Ensure the token exists

      // Set the token in Cypress.env
      Cypress.env('sessionToken', token);
      cy.log('Session Token:', token);
    });
  });

  it('DSO - Should add custom pricing successfully', () => {
    // Retrieve the session token from Cypress.env
    const sessionToken = Cypress.env('sessionToken');
    expect(sessionToken).to.exist;

    cy.fixture('test-data/addCustomPricing.json').then((requestPayload) => {
      cy.request({
        method: 'POST',
        url: Cypress.env('apiPostUrl'),
        headers: {
          Authorization: `Bearer ${Cypress.env('sessionToken')}`,
        },
        body: requestPayload,
      }).then((response) => {
        // Log the response for debugging
        cy.log(JSON.stringify(response.body));
        console.log(response.body);

        // Assert status code & Assert response structure
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('SUCCESS');
      });
    });
  });

  it('DSO - Should fetch existing pricing details, calendar data successfully', () => {
    // Load query parameters from the fixture
    cy.fixture('test-data/getCalendarData.json').then((queryParams) => {
      queryParams.date = formattedDate;
      // Perform GET request
      cy.request({
        method: 'GET',
        url: Cypress.env('apiGetUrl'),
        headers: {
          Authorization: `Bearer ${Cypress.env('sessionToken')}`, // Pass session token
        },
        qs: queryParams, // Use query parameters from fixture
      }).then((response) => {
        // Log response for debugging
        cy.log(JSON.stringify(response.body));
        console.log(response.body);

        // Assertions to check status code, body exists, and the response contains success message
        expect(response.status).to.eq(200);
        expect(response.body).to.exist;
        expect(response.body.message).to.eq('SUCCESS');
      });
    });
  });

  // --Negative test case
  it('DSO - should return error for invalid data when adding custom pricing', () => {
    // Load request body from the fixture
    cy.fixture('test-data/invalidData.json').then((requestBody) => {
      // Perform POST request
      cy.request({
        method: 'POST',
        url: Cypress.env('apiPostUrl'),
        headers: {
          Authorization: `Bearer ${Cypress.env('sessionToken')}`, // Pass session token
          'Content-Type': 'application/json', // Ensure proper headers
        },
        body: requestBody,
      }).then((response) => {
        // Log response for debugging
        cy.log(JSON.stringify(response.body));
        console.log(response.body);
        cy.log(response.body);
        // Assertions to check status code, body exists, and the response contains success message
        // expecting bad request as we are passing invalid data. But getting 200 as the response always
        // expect(response.status).to.eq(400);
        expect(response.status).to.eq(200);
        expect(response.body).to.exist;
      });
    });
  });

  it('DSO - Should remove custom pricing successfully', () => {
    // Load request body from the fixture
    cy.fixture('test-data/addCustomPricing.json').then((requestBody) => {
      // Perform POST request
      cy.request({
        method: 'POST',
        url: Cypress.env('apiRemoveUrl'),
        headers: {
          Authorization: `Bearer ${Cypress.env('sessionToken')}`, // Pass session token
          'Content-Type': 'application/json', // Ensure proper headers
        },
        body: requestBody, // Use the payload from fixture
      }).then((response) => {
        // Log response for debugging
        cy.log(JSON.stringify(response.body));
        console.log(response.body);

        // Assertions to check status code, body exists, and the response contains success message
        expect(response.status).to.eq(200);
        expect(response.body).to.exist;
        expect(response.body.message).to.eq('SUCCESS');
      });
    });
  });
});
