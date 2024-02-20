const { defineConfig } = require('cypress');

module.exports = defineConfig(
  {
    projectId: 'lift-cypress-automation',
    reporter: 'cypress-mochawesome-reporter',
    video: false,
    retries: 0,
    reporterOptions: {
      charts: false,
      embeddedScreenshots: false,
      inlineAssets: true,
      saveAllAttempts: true,
      ignoreVideos: true,
      videoOnFailOnly: true,
      quiet: false,
      debug: true
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
        baseUrl: 'https://lift-qa.herokuapp.com'
      },
      hesc: {
        baseUrl: 'TODO'
      },
      launch: {
        baseUrl: 'TODO'
      },
      selene: {
        baseUrl: 'https://selene-qa-1771372db722.herokuapp.com'
      },
      serviceMac: {
        baseUrl: 'TODO'
      },
      usBank: {
        baseUrl: 'TODO'
      },
      vhda: {
        baseUrl: 'https://msp-qa.herokuapp.com'
      }
    }
  });