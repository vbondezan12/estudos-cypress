import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().hesc.base_url;

/**
 * HTTPS operations for HESC API
 */
export class HescApi {
  cypressEnv = Cypress.env('hesc');

  getAccountHolders() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayments(accountHolderId) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayAccounts(accountHolderId) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/pay_accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  createBankAccount(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/bank_accounts`,
      failOnStatusCode: false,
      body: payload,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  createAccountHolder(payload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      body: payload,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  createCards(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/cards`,
      failOnStatusCode: false,
      body: payload,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  createLoanPayments(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/loan_payments`,
      failOnStatusCode: false,
      body: payload,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  createLoanPaymentsWithPayAccount(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/loan_payments/with_pay_account`,
      failOnStatusCode: false,
      body: payload,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }
}