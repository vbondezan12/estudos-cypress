const api_headers = require('../../../fixtures/basic_token_headers.json')
const environment = Cypress.env('usbank');

export class UsbPaymentApi {

    /**
     * Fetch the Cypress environment
     * @returns Cypress environment
     */
    getEnvironment() {
        return environment;
    }

    updateHeaders(token) {
        if (token) {
            this.headers = api_headers;
            this.headers.Authorization = this.headers.Authorization.replace('TOKEN', token);
        }
    }

    createPayment(payment_payload) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().usbank.base_url + '/payments',
            failOnStatusCode: false,
            body: payment_payload,
            headers: this.headers
        });
    }

    getBankInfo(query_parameters = {}) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().usbank.base_url + '/payments/get_bank_info',
            failOnStatusCode: false,
            qs: query_parameters,
            headers: api_headers
        })
    }

    getAccounts(query_parameters = {}) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().usbank.base_url + '/accounts',
            failOnStatusCode: false,
            qs: query_parameters,
            headers: api_headers
        })
    }

    getPayAccounts(query_parameters = {}) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().usbank.base_url + '/pay_accounts',
            failOnStatusCode: false,
            qs: query_parameters,
            headers: api_headers
        })
    }

    getPayments(query_parameters = {}) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().usbank.base_url + '/payments',
            failOnStatusCode: false,
            qs: query_parameters,
            headers: api_headers
        })
    }
}