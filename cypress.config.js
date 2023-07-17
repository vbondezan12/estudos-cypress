const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

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
        //excludeSpecPattern: "cypress/e2e/other/*.js",
        baseUrl: "https://aps-clicktopay.uat.repay.net",
        acumatica: {
            acumaticaUrl: "https://54.80.239.14/2022R2.CTP.UAT",
        },
        gateway: {
            gatewayUrl: "https://gateway.repay.com/merchants/login.php",
        },
        createInvoiceUrl: "/api/invoices/create",
        createSalesOrderUrl: "/api/so/create",
        customer: {
            guid: "hEdjFWdcgjwOMcN9x37SZk4COe6D4yrH",
            erpId: "ERPID-F0802286-3053-4F02-9753-65F8A245323F"
        },

        cookiesName:"rememberDevice_537194149",
        cookiesValue:"%241%248YsD9YlSwthVcWMKQn4tNw%3D%3D%24M7qyYxm5nHRVfxZ%2Fd4RVrWbvoQ8VzNsDYtr78ghjhoU%3D",
        paymentInfo : {
            creditCard : "4111111111111111",
            ach : {
                accountNumber : "123123321",
                routingNumber : "123123123"
            } 
        },

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
            unprivileged_username: "mishen1@repay.com",
            username: 'mishen@repay.com',
            invalidPass: '123ABC',
            merchantId: "532",
            name: "Mat Ishenbaev",
            existingCompanyCode: "AW_NC",
            invoice_EURO_URL : "https://aps-clicktopay.uat.repay.net/Order/Pay?guid=jngyimLj_2ggL86RjuX0BArDkTfszVfs&code=OsfFTNyBaGt2018BHn%252BdbvUIvuAlIrJ4maFW%252FXD8AQA%253D",
            sales_order_EURO_URL : "https://aps-clicktopay.uat.repay.net/Order/Pay?guid=l-toSpKRCu_oeiTTl2FdPtIWPlck9dvk&code=whTLQKjxaEweE%252B3zK%252Bz5pJbq98ZsgzHvVX%252BSwuNqilI%253D",            
        },
        hostedForm: {
            hosted_form_URL : "https://aps-clicktopay.uat.repay.net/EasyPay/PayStep2_V4",
        },
        includeShadowDom: true,
    },
});