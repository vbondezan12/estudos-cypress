import { VhdaPayloadGenerator } from '../../payload_generators/vhda/vhda_payload_generator';
import { AuthenticationUtils } from '../../utils/authentication_utils';

const AUTHENTICATION_TYPE = 'bearer';
const authenticationUtils = new AuthenticationUtils();
const baseUrl = Cypress.config().vhda.base_url;

export class VhdaApi {
  cypressEnv = Cypress.env('vhda');

  payloadGenerator = new VhdaPayloadGenerator();

  createQuickPayJwt(body) {
    return cy.request({
      method: 'POST', url: `${ baseUrl }/quick_pay`, failOnStatusCode: false, body: body
    }).then((response) => {
      window.sessionStorage.setItem('session_auth_token', response.body.jwt);
    });
  }

  createLoginJwt(body) {
    return cy.request({
      method: 'POST', url: `${ baseUrl }/user_token`, failOnStatusCode: false, body: body
    }).then((response) => {
      window.sessionStorage.setItem('session_auth_token', response.body.jwt);
    });
  }

  multifactor(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/multifactor`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: body
    });
  }

  resendMultifactor(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/multifactor/resend`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  quickPay(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/quick_pay`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: body
    });
  }

  register(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: body
    });
  }

  resendRecoveryEmail(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users/send_recovery_email`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: body
    });
  }

  getAccounts(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  switchLoan(loanNumber, jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  newLoan(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_details`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: body
    });
  }

  deleteLoan(loanNumber, jwt) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  getDocuments(jwt) {
    // ToDo: Are there other document types? Are there other query parameters for this?
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/documents?document_type=statements`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  getEscrowShortage(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/escrow_shortage`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  getNotificationPreferences(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  updateNotificationPreferences(notificationPreferencesPayload, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: notificationPreferencesPayload
    });
  }

  getPayments(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  getPayment(paymentId, jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/paymentId`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  getMspOtherFees(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/msp_other_fees`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  voidPayment(paymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/payments/${ paymentId }/void`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  createPayment(paymentPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: paymentPayload
    });
  }

  updatePassword(updatedPasswordPayload, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/profiles`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: updatedPasswordPayload
    });
  }

  getPayAccounts(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  setDefaultPayAccount(payAccountId, jwt) {
    return cy.request({
      method: 'PUT',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }/default`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  deletePayAccount(payAccountId, jwt) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  createBankAccounts(bankAccountPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/bank_accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: bankAccountPayload
    });

  }

  createCardAccounts(cardAccountPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/card_accounts`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: cardAccountPayload
    });
  }

  getRecurringPayments(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }

  createRecurringPayment(recurringPaymentPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: recurringPaymentPayload
    });
  }

  updateRecurringPayment(recurringPaymentPayload, recurringPaymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE,
        authenticationUtils.getAuthToken(jwt)),
      body: recurringPaymentPayload
    });
  }

  deleteRecurringPayment(recurringPaymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt))
    });
  }
}