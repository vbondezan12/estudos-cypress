import { AuthenticationUtils } from '../../utils/authentication_utils';
import moment from 'moment';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const base_url = Cypress.config().servicemac.base_url;

export class ServiceMacApi extends AuthenticationUtils {
    cypressEnv = Cypress.env('service_mac');

    getAccountLookup(account) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account }/accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getAccountHolder(query_parameters = {}) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders`,
            failOnStatusCode: false,
            qs: query_parameters,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getPayments(account) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account }/payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getPaymentsTracking(account, tracking) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account }/payments/${ tracking }`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    getPayAccounts(account) {
        return cy.request({
            method: 'GET',
            url: `${ base_url }/account_holders/${ account }/pay_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
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

    postAccountHolder(account_holder) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/`,
            body: account_holder,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    postLoanPaymentAccount(payload_loan_payment_account) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/${ this.cypressEnv.account }/payments/with_pay_account`,
            body: payload_loan_payment_account,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }

    postLoanPaymentPayAccountId(payload_loan_payment_pay_account_id) {
        return cy.request({
            method: 'POST',
            url: `${ base_url }/account_holders/ ${ this.cypressEnv.account } /payments/with_pay_account`,
            body: payload_loan_payment_pay_account_id,
            failOnStatusCode: false,
            auth: Cypress.env('service_mac_auth_header'),
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
        })
    }
}