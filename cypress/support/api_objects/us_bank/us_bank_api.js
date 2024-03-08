import { AUTHENTICATION_TYPE } from '../../../config/constants';
import { UsbPaymentPayloadGenerator } from '../../payload_generators/us_bank/us_bank_payment_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().usBank.baseUrl }/ivr/v1`;

export class UsBankApi extends MockLoanServiceApi {
  payloadGenerator = new UsbPaymentPayloadGenerator();

  createPayment(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      body: body,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getBankInfo(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/get_bank_info`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getAccounts(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayAccounts(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayments(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }
}