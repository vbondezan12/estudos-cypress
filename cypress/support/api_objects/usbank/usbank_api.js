import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const base_url = Cypress.config().usbank.base_url;

export class UsBankApi {
    cypressEnv = Cypress.env('usbank');

    createPayment(payment_payload) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/payments`,
            failOnStatusCode: false,
            body: payment_payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    getBankInfo(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/payments/get_bank_info`,
            failOnStatusCode: false,
            qs: query_parameters,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getAccounts(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/accounts`,
            failOnStatusCode: false,
            qs: query_parameters,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getPayAccounts(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/pay_accounts`,
            failOnStatusCode: false,
            qs: query_parameters,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getPayments(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/payments`,
            failOnStatusCode: false,
            qs: query_parameters,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }
}