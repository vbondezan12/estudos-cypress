const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: 'tvrmvw',
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
        specPattern: "cypress/tests/**/*.{js,jsx,ts,tsx}",
        baseUrl: "https://uat-hq.secureconduit.net/sessions/login",
        chromeWebSecurity: false,
        defaultCommandTimeout: 10000,
        includeShadowDom: true,
        pageLoadTimeout: 20000,
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: true,
        video: false,
        videoUploadOnPasses: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'reporter-config.json'
        },
        retries: {
            runMode: 0,
            openMode: 0
        },
        env: {},
        usbank: {
            base_url: "https://usbank-uat.secureconduit.net/ivr/v1",
        },
        vhda: {
            base_url: "https://repay-msp-uat.herokuapp.com/api/v1",
        },
        service_mac: {
            base_url: "https://repay-servicemac-uat-upgrade.herokuapp.com/api/v1",
        },
    },
});