import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const base_url = Cypress.config().hesc.base_url;

/**
 * HTTPS operations for HESC API
 */
export class HescApi {
    cypressEnv = Cypress.env('hesc');

    getAccountHolders() {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    getPayments(account_holder_id) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account_holder_id }/payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    getPayAccounts(account_holder_id) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account_holder_id }/pay_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    createBankAccount(payload, account_holder_id) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/${ account_holder_id }/bank_accounts`,
            failOnStatusCode: false,
            body: payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    createAccountHolder(payload) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders`,
            failOnStatusCode: false,
            body: payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    createCards(payload, account_holder_id) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/${ account_holder_id }/cards`,
            failOnStatusCode: false,
            body: payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    createLoanPayments(payload, account_holder_id) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/${ account_holder_id }/loan_payments`,
            failOnStatusCode: false,
            body: payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }

    createLoanPaymentsWithPayAccount(payload, account_holder_id) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/${ account_holder_id }/loan_payments/with_pay_account`,
            failOnStatusCode: false,
            body: payload,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        });
    }
}