const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: 'tvrmvw',
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber())
            require('cypress-mochawesome-reporter/plugin')(on);
            // const username = process.env.DB_USERNAME
            // const password = process.env.PASSWORD
            // if (!password){
            //   throw new Error(`missing PASSWORD environment variable`)
            // }
            // config.env = {username, password}
            // return config

        },
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
        baseUrl: "https://uat-hq.secureconduit.net/sessions/login",
        chromeWebSecurity: false,
        defaultCommandTimeout: 10000,
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
        env: {
            
        },

        USBank: {
            base_url : "https://usbank-uat.secureconduit.net/ivr/v1",
        },

        Vhda: {
            base_url : "https://repay-msp-uat.herokuapp.com/api/v1",
        },

        includeShadowDom: true,
    },
});