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
    
    getAccountHolder(query_parameters ={}){
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders' ,
            failOnStatusCode: false,
            qs: query_parameters,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers 
        })
    }

    getPayments(account){
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/payments',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers 
        })
    }

    getPaymentsTracking(account, tracking){
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/payments/' + tracking,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers 
        })
    }

    getPayAccounts(account){
        return cy.request({
            method: 'GET',
            url: Cypress.config().service_mac.base_url + '/account_holders/' + account + '/pay_accounts',
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: api_headers 
        })
    }

    getBankInfo(query_parameters ={}){
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