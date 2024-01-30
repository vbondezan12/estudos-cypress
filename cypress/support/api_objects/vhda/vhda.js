import { AuthenticationUtils } from '../../utils/authentication_utils';
import { VhdaPayloadGenerator } from '../../payload_generators/vhda/vhda_payload_generator';

const AUTHENTICATION_TYPE = 'bearer';

const authenticationUtils = new AuthenticationUtils();
const base_url = Cypress.config().vhda.base_url;

export class VhdaApi {
    cypressEnv = Cypress.env('vhda');

    payloadGenerator = new VhdaPayloadGenerator();

    createQuickPayJwt(login_payload) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/quick_pay`,
            failOnStatusCode: false,
            body: login_payload
        }).then((response) => {
            window.sessionStorage.setItem('session_auth_token', response.body.jwt);
        });
    }

    createLoginJwt(login_payload) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/user_token`,
            failOnStatusCode: false,
            body: login_payload
        }).then((response) => {
            window.sessionStorage.setItem('session_auth_token', response.body.jwt);
        });
    }

    multifactor(multifactor_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/multifactor`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: multifactor_payload
        });
    }

    resendMultifactor(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/multifactor/resend`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    quickPay(quick_pay_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/quick_pay`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: quick_pay_payload
        });
    }

    register(register_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/users`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: register_payload
        });
    }

    resendRecoveryEmail(resend_recovery_email_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/users/send_recovery_email`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: resend_recovery_email_payload
        });
    }

    getAccounts(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    switchLoan(loan_number, jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/account_details/${loan_number}`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    newLoan(new_loan_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/account_details`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: new_loan_payload
        });
    }

    deleteLoan(loan_number, jwt) {
        return cy.request({
            method: 'DELETE',
            url: `${base_url}/account_details/${loan_number}`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    getDocuments(jwt) {
        //ToDo: Are there other document types? Are there other query parameters for this?
        return cy.request({
            method: 'GET',
            url: `${base_url}/documents?document_type=statements`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    getEscrowShortage(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/escrow_shortage`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    getNotificationPreferences(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/notification_preferences`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    updateNotificationPreferences(notification_preferences_payload, jwt) {
        return cy.request({
            method: 'PATCH',
            url: `${base_url}/notification_preferences`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: notification_preferences_payload
        });
    }

    getPayments(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    getPayment(payment_id, jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/payments/payment_id`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    getMspOtherFees(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/payments/msp_other_fees`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    voidPayment(payment_id, jwt) {
        return cy.request({
            method: 'PATCH',
            url: `${base_url}/payments/${payment_id}/void`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    createPayment(payment_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: payment_payload
        });
    }

    updatePassword(updated_password_payload, jwt) {
        return cy.request({
            method: 'PATCH',
            url: `${base_url}/profiles`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: updated_password_payload
        });
    }

    getPayAccounts(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/pay_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    setDefaultPayAccount(pay_account_id, jwt) {
        return cy.request({
            method: 'PUT',
            url: `${base_url}/pay_accounts/${pay_account_id}/default`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    deletePayAccount(pay_account_id, jwt) {
        return cy.request({
            method: 'DELETE',
            url: `${base_url}/pay_accounts/${pay_account_id}`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    createBankAccounts(bank_account_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/bank_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: bank_account_payload
        });

    }

    createCardAccounts(card_account_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/card_accounts`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: card_account_payload
        });
    }

    getRecurringPayments(jwt) {
        return cy.request({
            method: 'GET',
            url: `${base_url}/recurring_payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }

    createRecurringPayment(recurring_payment_payload, jwt) {
        return cy.request({
            method: 'POST',
            url: `${base_url}/recurring_payments`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: recurring_payment_payload
        });
    }

    updateRecurringPayment(recurring_payment_payload, recurring_payment_id, jwt) {
        return cy.request({
            method: 'PATCH',
            url: `${base_url}/recurring_payments/${recurring_payment_id}`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
            body: recurring_payment_payload
        });
    }

    deleteRecurringPayment(recurring_payment_id, jwt) {
        return cy.request({
            method: 'PATCH',
            url: `${base_url}/recurring_payments/${recurring_payment_id}`,
            failOnStatusCode: false,
            headers: authenticationUtils.updateHeaderAuthorization(AUTHENTICATION_TYPE, authenticationUtils.getAuthToken(jwt)),
        });
    }
}