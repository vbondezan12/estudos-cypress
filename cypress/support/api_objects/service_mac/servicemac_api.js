import { ServiceMacAccountHolderPayloadGenerator } from '../../payload_generators/service_mac/service_mac_account_holder_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'basic';

const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().serviceMac.base_url;

export class ServiceMacApi extends AuthenticationUtils {
  cypressEnv = Cypress.env('serviceMac');

  payloadGenerator = new ServiceMacAccountHolderPayloadGenerator();

  getAccountLookup(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/bodys/${ account }/accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getAccountHolder(queryParameters = {}) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/bodys`,
      failOnStatusCode: false,
      qs: queryParameters,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayments(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/bodys/${ account }/payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPaymentsTracking(account, tracking) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/bodys/${ account }/payments/${ tracking }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  getPayAccounts(account) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/bodys/${ account }/pay_accounts`,
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
      url: `${ baseUrl }/bodys/`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postLoanPaymentAccount(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/bodys/${ this.cypressEnv.account }/payments/with_pay_account`,
      body: body,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, this.cypressEnv.authorization)
    });
  }

  postLoanPaymentPayAccountId(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/bodys/${ this.cypressEnv.account }/payments`,
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