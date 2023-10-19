const api_headers = require('../../../fixtures/basic_token_headers.json')
const environment = Cypress.env('hesc');

/**
 * HTTPS operations for HESC API
 */
export class HescApi {

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

    getAccountHolders(token) {
        this.updateHeaders(token);

        return cy.request({
            method: 'GET',
            url: Cypress.config().hesc.base_url + '/account_holders',
            failOnStatusCode: false,
            headers: this.headers
        });
    }

    getPayments(account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/payments`,
            failOnStatusCode: false,
            headers: this.headers
        });
    }

    getPayAccounts(account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'GET',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/pay_accounts`,
            failOnStatusCode: false,
            headers: this.headers
        });
    }

    createBankAccount(payload, account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/bank_accounts`,
            failOnStatusCode: false,
            body: payload,
            headers: this.headers
        });
    }

    createAccountHolder(payload) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().hesc.base_url + `/account_holders`,
            failOnStatusCode: false,
            body: payload,
            headers: this.headers
        });
    }

    createCards(payload, account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/cards`,
            failOnStatusCode: false,
            body: payload,
            headers: this.headers
        });
    }

    createLoanPayments(payload, account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/loan_payments`,
            failOnStatusCode: false,
            body: payload,
            headers: this.headers
        });
    }

    createLoanPaymentsWithPayAccount(payload, account_holder_id) {
        this.updateHeaders(environment.authorization);

        return cy.request({
            method: 'POST',
            url: Cypress.config().hesc.base_url + `/account_holders/${ account_holder_id }/loan_payments/with_pay_account`,
            failOnStatusCode: false,
            body: payload,
            headers: this.headers
        });
    }
}