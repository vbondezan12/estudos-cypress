import { AUTHENTICATION_TYPE } from '../../../config/constants';
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
      Cypress.env({
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
      Cypress.env({
        bearerToken: response.body.jwt
      });
    });
  }

  multifactor(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/multifactor`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  resendMultifactor(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/multifactor/resend`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  quickPay(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/quick_pay`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  register(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  resendRecoveryEmail(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/users/send_recovery_email`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  getAccounts(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  switchLoan(loanNumber, jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  newLoan(body, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/account_details`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: body
    });
  }

  deleteLoan(loanNumber, jwt) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/account_details/${ loanNumber }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getDocuments(jwt) {
    // ToDo: Are there other document types? Are there other query parameters for this?
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/documents?document_type=statements`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getEscrowShortage(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/escrow_shortage`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getNotificationPreferences(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  updateNotificationPreferences(notificationPreferencesPayload, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/notification_preferences`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: notificationPreferencesPayload
    });
  }

  getPayments(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getPayment(paymentId, jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/paymentId`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  getMspOtherFees(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/payments/msp_other_fees`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  voidPayment(paymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/payments/${ paymentId }/void`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createPayment(paymentPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: paymentPayload
    });
  }

  updatePassword(updatedPasswordPayload, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/profiles`,
      failOnStatusCode: false,
      headers: asuper.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: updatedPasswordPayload
    });
  }

  getPayAccounts(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/pay_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  setDefaultPayAccount(payAccountId, jwt) {
    return cy.request({
      method: 'PUT',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }/default`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  deletePayAccount(payAccountId, jwt) {
    return cy.request({
      method: 'DELETE',
      url: `${ baseUrl }/pay_accounts/${ payAccountId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createBankAccounts(bankAccountPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/bank_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: bankAccountPayload
    });

  }

  createCardAccounts(cardAccountPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/card_accounts`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: cardAccountPayload
    });
  }

  getRecurringPayments(jwt) {
    return cy.request({
      method: 'GET',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }

  createRecurringPayment(recurringPaymentPayload, jwt) {
    return cy.request({
      method: 'POST',
      url: `${ baseUrl }/recurring_payments`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: recurringPaymentPayload
    });
  }

  updateRecurringPayment(recurringPaymentPayload, recurringPaymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER),
      body: recurringPaymentPayload
    });
  }

  deleteRecurringPayment(recurringPaymentId, jwt) {
    return cy.request({
      method: 'PATCH',
      url: `${ baseUrl }/recurring_payments/${ recurringPaymentId }`,
      failOnStatusCode: false,
      headers: super.updateHeaderAuthorization(AUTHENTICATION_TYPE.BEARER)
    });
  }
}