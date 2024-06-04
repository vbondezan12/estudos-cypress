import { AUTHENTICATION_TYPE, CLIENT } from '../../../config/constants';
import { VhdaPayloadGenerator } from '../../payload_generators/vhda/vhda_payload_generator';
import { MockLoanServiceApi } from '../mock_loan_service/mock_loan_service_api';

const baseUrl = `${ Cypress.config().vhda.baseUrl }/api/v1`;

export class VhdaApi extends MockLoanServiceApi {
  payloadGenerator = new VhdaPayloadGenerator();

  createQuickPayJwt(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/quick_pay`,
      failOnStatusCode: false,
      body: body
    }).then((response) => {
      Cypress.config({
        bearerToken: response.body.jwt
      });
    });
  }

  createLoginJwt(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/user_token`,
      failOnStatusCode: false,
      body: body
    }).then((response) => {
      Cypress.config({
        bearerToken: response.body.jwt
      });
    });
  }

  multifactor(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/multifactor`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  resendMultifactor() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/multifactor/resend`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  quickPay(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/quick_pay`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  register(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  sendRecoveryEmail(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users/send_recovery_email`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  getAccounts() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  switchLoan(loanNumber) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createAccountDetails(body) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_details`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  deleteLoan(loanNumber) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getDocuments() {
    // ToDo: Are there other document types? Are there other query parameters for this?
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/documents?document_type=statements`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getDocument() {
    // ToDo: Are there other document types? Are there other query parameters for this?
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/documents`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getEscrowShortage() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/escrow_shortage`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getNotificationPreferences() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  updateNotificationPreferences(notificationPreferencesPayload) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: notificationPreferencesPayload
    });
  }

  getPayments() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getPayment(paymentId) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/${ paymentId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getMspOtherFees() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/msp_other_fees`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  voidPayment(paymentId) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/payments/${ paymentId }/void`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createPayment(paymentPayload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: paymentPayload
    });
  }

  updatePassword(updatedPasswordPayload) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/profiles`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: updatedPasswordPayload
    });
  }

  getPayAccounts() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  setDefaultPayAccount(payAccountId) {
    return cy.request({
      method: 'PUT',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }/default`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  deletePayAccount(payAccountId) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createBankAccounts(bankAccountPayload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/bank_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: bankAccountPayload
    });

  }

  createCardAccounts(cardAccountPayload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/card_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: cardAccountPayload
    });
  }

  getRecurringPayments() {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createRecurringPayment(recurringPaymentPayload) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: recurringPaymentPayload
    });
  }

  updateRecurringPayment(recurringPaymentPayload, recurringPaymentId) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: recurringPaymentPayload
    });
  }

  deleteRecurringPayment(recurringPaymentId) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getTestLoans(loanStatus) {
    return super.getTestLoans(CLIENT.VHDA, loanStatus);
  }

  getLastMfaCode(email) {
    return super.getLastMfaCode(CLIENT.VHDA, email);
  }
}