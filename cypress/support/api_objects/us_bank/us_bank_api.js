import { UsbPaymentPayloadGenerator } from '../../payload_generators/us_bank/us_bank_payment_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().usBank.baseUrl;

export class UsBankApi {
  cypressEnv = Cypress.env('usBank');

  payloadGenerator = new UsbPaymentPayloadGenerator();

  createPayment(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      body: body,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getBankInfo(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/get_bank_info`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getAccounts(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayAccounts(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayments(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }
}