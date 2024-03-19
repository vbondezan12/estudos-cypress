import { AUTHENTICATION_TYPE } from '../../../config/constants';
import { UsBankPayloadGenerator } from '../../payload_generators/us_bank/us_bank_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().usBank.baseUrl }/ivr/v1`;

export class UsBankApi extends MockLoanServiceApi {
  payloadGenerator = new UsBankPayloadGenerator();

  createPayment(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      body: body,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getBankInfo(payload = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/get_bank_info`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getAccounts(payload = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayAccounts(payload = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayments(payload = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      body: payload,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }
}