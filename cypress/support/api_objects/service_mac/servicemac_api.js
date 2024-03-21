import { AUTHENTICATION_TYPE } from '../../../config/constants';
import { ServiceMacAccountHolderPayloadGenerator } from '../../payload_generators/service_mac/service_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().serviceMac.baseUrl }/api/v1`;

export class ServiceMacApi extends MockLoanServiceApi {
  payloadGenerator = new ServiceMacAccountHolderPayloadGenerator();

  getAccountLookup(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getAccountHolder(body) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      body: body,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayments(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPaymentsTracking(account, tracking) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/payments/${ tracking }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  getPayAccounts(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/pay_accounts`,
      failOnStatusCode: false,
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

  postAccountHolder(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/`,
      body: body,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  postLoanPaymentAccount(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ this.cypressEnv.account }/payments/with_pay_account`,
      body: body,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  postLoanPaymentPayAccountId(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ this.cypressEnv.account }/payments`,
      body: body,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }

  postToken(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/tokens`,
      body: body,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BASIC)
    });
  }
}