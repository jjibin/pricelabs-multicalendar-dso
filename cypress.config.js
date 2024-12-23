const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: "https://pricelabs.co",
    chromeWebSecurity: false,
    testIsolation: false,
    env: {
      username: "qa.pricelabs@gmail.com",
      password: "qg33N$yxJP",
      applicationIdentifier: "jioeUUYx3h8p",
      subscriberId: "123641",
      sessionToken: "",
      validateUrl: "https://api.novu.co/v1/widgets/session/initialize",
      apiPostUrl: "https://app.pricelabs.co/api/add_custom_pricing",
      apiGetUrl: "https://app.pricelabs.co/api/get_calendar_data",
      apiRemoveUrl: "https://app.pricelabs.co/api/remove_custom_pricing",
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    preserve: () => true,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "custom-title",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
});
