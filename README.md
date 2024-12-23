# Cypress Automation Framework for Multicalendar DSO Feature

This repository contains an automation framework built with [Cypress](https://www.cypress.io/) for testing the Multicalendar Date Specific Overrides (DSO) feature of the PriceLabs application.

---

## Table of Contents
1. [Installation](#installation)
2. [Folder Structure](#folder-structure)
3. [Running Tests](#running-tests)
4. [Generating Reports](#generating-reports)

---

## Installation

Follow these steps to set up and install the dependencies for this project:

1. Clone this repository:
    ```bash
    git clone https://github.com/jjibin/pricelabs-multicalendar-dso.git
    ```
2. Navigate to the project directory:
    ```bash
    cd pricelabs-multicalendar-dso
    ```
3. Install the project dependencies using `npm`:
    ```bash
    npm install
    ```
4. Ensure Cypress is installed globally (optional):
    ```bash
    npm install -g cypress
    ```

---

## Folder Structure

```plaintext
project-root/
│
├── cypress/
│   ├── e2e/
|   |      ├── API
|   |           ├── api-test-case.cy.ts                # Contains API test cases
│   │      ├── UI
|   |           ├── multicalendar-dso/
│   │                   ├── functional.cy.ts           # Basic tests
│   │                   ├── end-to-end.cy.ts           # End-to-End tests
|   |                   ├── negative-test-cases.cy.ts  # Negative tests
│   ├── fixtures/       # Static test data (e.g., JSON files)
│   │         ├── test-data/
│   │               ├── addCustomPricing.json
│   │               ├── getCalendarData.json
│   │               ├── iinvalidData.json
│   ├── support/                # Support files for custom commands and utilities
│   │   ├── commands.ts         # Custom Cypress commands
│   │   ├── commonFunctions.ts  # Common utility functions
│
├── reports/                    # Stores generated test reports
|       ├── html/ 
├── cypress.config.ts           # Cypress configuration file
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation


 ```
---

## Running Tests
To run tests locally, use the following commands:

Run Cypress Test Runner (UI):
 ```bash
npx cypress open
```
Select the test you want to execute from the UI.

Run Tests in Headless Mode:
 ```bash
npx cypress run
```
Run Specific Tests:
 ```bash
npx cypress run --spec cypress/e2e/UI/multicalendar-dso/end-to-end.cy.ts
```
---

## Generating Reports
This framework is integrated with Mochawesome for report generation.

Install Mochawesome (if not installed):
 ```bash
npm install --save-dev mochawesome
```

Run Tests with Report Generation:
 ```bash
npx cypress run --reporter mochawesome
```
Access the Report: After the test run, the HTML report will be generated in the reports/html/ folder. Open it in your browser to view detailed test results.


