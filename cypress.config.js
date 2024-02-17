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
                base_url: 'https://repay-mock-loan-service.herokuapp.com/api/v1'
            },
            lift: {
                base_url: 'https://lift-qa.herokuapp.com'
            },
            hesc: {
                base_url: 'TODO'
            },
            launch: {
                base_url: 'TODO'
            },
            selene: {
                base_url: 'https://selene-qa-1771372db722.herokuapp.com'
            },
            servicemac: {
                base_url: 'TODO'
            },
            usbank: {
                base_url: 'TODO'
            },
            vhda: {
                base_url: 'https://msp-qa.herokuapp.com'
            }
        }
    });