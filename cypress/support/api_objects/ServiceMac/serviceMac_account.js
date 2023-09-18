const api_headers = require ('../../../fixtures/service_mac_api_headers.json')

export class ServiceMacAccount {
    
    getAccountLookup(account){
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/accounts',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers 
        })
    }
}