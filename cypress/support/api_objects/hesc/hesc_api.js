import { AUTHENTICATION_TYPE } from '../../../config/constants';
import { HescPaymentPayloadGenerator } from '../../payload_generators/hesc/hesc_payment_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().hesc.baseUrl }/api/v1/agent`;

/**
 * HTTPS operations for HESC API
 */
export class HescApi extends MockLoanServiceApi {

  payloadGenerator = new HescPaymentPayloadGenerator();

  getAccountHolders() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayments(accountHolderId) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayAccounts(accountHolderId) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/pay_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  createBankAccount(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/bank_accounts`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  createAccountHolder(payload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  createCards(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/cards`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  createLoanPayments(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/loan_payments`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  createLoanPaymentsWithPayAccount(payload, accountHolderId) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ accountHolderId }/loan_payments/with_pay_account`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }
}