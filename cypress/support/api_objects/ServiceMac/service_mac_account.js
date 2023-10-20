const api_headers = require('../../../fixtures/service_mac_api_headers.json')
const environment = Cypress.env('service_mac');

export class ServiceMacAccount {

    getEnvironment() {
        return environment
    }

    getAccountLookup(account) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/accounts',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    getAccountHolder(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    getPayments(account) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/payments',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    postAccountHolder(payload_account_holder) {
        return cy.request({
            method: 'POST',
            url: Cypress.config().service_mac.base_url + '/account_holders/',
            body: payload_account_holder,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    postLoanPaymentAccount(payload_loan_payment_account) {
        return cy.request({
            method: 'POST',
            url: Cypress.config().service_mac.base_url + '/account_holders/',
            body: payload_loan_payment_account,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    postLoanPaymentPayAccountId(payload_loan_payment_pay_account_id) {
        return cy.request({
            method: 'POST',
            url: Cypress.config().service_mac.base_url + '/account_holders/',
            body: payload_loan_payment_pay_account_id,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    getPaymentsTracking(account, tracking) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/payments/' + tracking,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    getPayAccounts(account_holder) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account_holder + '/pay_accounts',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }

    getBankInfo(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/payments/get_bank_info',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers
        })
    }
}