import { ServiceMacAccountHolderPayloadGenerator } from '../../payload_generators/service_mac/service_mac_account_holder_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().serviceMac.baseUrl;

export class ServiceMacApi extends AuthenticationUtils {
  cypressEnv = Cypress.env('serviceMac');

  payloadGenerator = new ServiceMacAccountHolderPayloadGenerator();

  getAccountLookup(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getAccountHolder(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayments(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPaymentsTracking(account, tracking) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/payments/${ tracking }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayAccounts(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_holders/${ account }/pay_accounts`,
      failOnStatusCode: false,
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

  postAccountHolder(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postLoanPaymentAccount(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ this.cypressEnv.account }/payments/with_pay_account`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postLoanPaymentPayAccountId(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_holders/${ this.cypressEnv.account }/payments`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postToken(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/tokens`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }
}