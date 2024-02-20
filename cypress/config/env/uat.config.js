const { defineConfig } = require('cypress');

module.exports = defineConfig(
  {
    projectId: 'lift-cypress-automation',
    reporter: 'cypress-mochawesome-reporter',
    video: true,
    retries: 1,
    reporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      ignoreVideos: false,
      videoOnFailOnly: true,
      quiet: true,
      debug: false
    },
    e2e: {
      setupNodeEvents(on) {
        require('cypress-mochawesome-reporter/plugin')(on);
      },
      specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
      mockLoanService: {
        baseUrl: 'https://repay-mock-loan-service.herokuapp.com/api/v1'
      },
      lift: {
        baseUrl: 'https://lift-uat.secureconduit.net'
      },
      hesc: {
        baseUrl: 'https://hesc-uat.herokuapp.com/api/v1/agent'
      },
      launch: {
        baseUrl: 'https://uat-launchservicing.secureconduit.net/api'
      },
      selene: {
        baseUrl: 'https://selene-uat-a8c52f39f977.herokuapp.com'
      },
      serviceMac: {
        baseUrl: 'https://repay-servicemac-uat-2376079e9ee5.herokuapp.com/api/v1'
      },
      usBank: {
        baseUrl: 'https://usbank-uat.secureconduit.net/ivr/v1'
      },
      vhda: {
        baseUrl: 'https://repay-msp-uat.herokuapp.com/api/v1'
      }
    }
  });

