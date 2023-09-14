const api_headers = require ('../../../fixtures/usb_api_headers.json')

export class UsbPaymentApi {
    
    createPayment(payment_payload) {
        return cy.request({
            method: 'POST',
            url: Cypress.config().usbank.base_url + '/payments',
            failOnStatusCode: false,
            body: payment_payload,
            auth: Cypress.env('usb_auth_header'),
            headers: api_headers
        });
    }

    getBankInfo(query_parameters ={}){
        return cy.request({
            method: 'GET',
            url: Cypress.config().USBank.base_url + '/payments/get_bank_info',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('usb_auth_header'),
            headers: api_headers 
        })
    }

    getAccounts(query_parameters ={}){
        return cy.request({
            method: 'GET',
            url: Cypress.config().USBank.base_url + '/accounts',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('usb_auth_header'),
            headers: api_headers
        })
    }

    getPayAccounts(query_parameters ={}){
        return cy.request({
            method: 'GET',
            url: Cypress.config().USBank.base_url + '/pay_accounts',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('usb_auth_header'),
            headers: api_headers
        })
    }

    getPayments(query_parameters ={}){
        return cy.request({
            method: 'GET',
            url: Cypress.config().USBank.base_url + '/payments',
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('usb_auth_header'),
            headers: api_headers
        })
    }
}