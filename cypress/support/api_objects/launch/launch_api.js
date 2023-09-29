const api_headers = require('../../../fixtures/x_auth_token_headers.json')
const environment = Cypress.env('launch');

export class LaunchApi {

    /**
     * Fetch the Cypress environment
     * @returns Cypress environment
     */
    getEnvironment() {
        return environment;
    }

    getBaseUrl() {
        return Cypress.config().launch.base_url;
    }

    updateHeaders(token) {
        if (token) {
            this.headers = api_headers;
            this.headers.Authorization = this.headers.Authorization.replace('TOKEN', token);
        }
    }

    getPayAccounts() {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: this.getBaseUrl() + '/pay_accounts',
            failOnStatusCode: false,
            headers: this.headers
        });
    }
}