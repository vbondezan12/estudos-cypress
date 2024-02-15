const {defineConfig} = require('cypress');

module.exports = defineConfig({
    projectId: 'lift-cypress-automation',
    reporter: 'cypress-mochawesome-reporter',
    video: true,
    reporterOptions: {
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        ignoreVideos: false,
        videoOnFailOnly: true,
        quiet: false,
        debug: false
    },
    e2e: {
        setupNodeEvents(on) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
        specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',

        hesc: {
            base_url: 'https://hesc-uat.herokuapp.com/api/v1/agent'
        },
        launch: {
            base_url: 'https://uat-launchservicing.secureconduit.net/api'
        },
        usbank: {
            base_url: 'https://usbank-uat.secureconduit.net/ivr/v1',
        },
        vhda: {
            base_url: "https://repay-msp-uat.herokuapp.com/api/v1",
        },
        servicemac: {
            base_url: "https://repay-servicemac-uat-2376079e9ee5.herokuapp.com/api/v1",
        },
    }
});