const api_headers = require('../../../fixtures/bearer_token_headers.json')
const url = Cypress.config().vhda.base_url;

export class VhdaApi {

    updateHeaders(jwt) {
        if (jwt) {
            this.headers = api_headers;
            this.headers.Authorization = 'Bearer ' + jwt;
        }
    }

    createQuickPayJwt(login_payload) {
        return cy.request({
            method: 'POST',
            url: url + '/quick_pay',
            failOnStatusCode: false,
            headers: this.headers,
            body: login_payload
        }).then((response) => {
            cy.wrap(response.body.jwt).as('jwt');
        });
    }

    createLoginJwt(login_payload) {
        return cy.request({
            method: 'POST',
            url: url + '/user_token',
            failOnStatusCode: false,
            headers: this.headers,
            body: login_payload
        }).then((response) => {
            cy.wrap(response.body.jwt).as('jwt');
        });
    }

    multifactor(multifactor_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/multifactor',
            failOnStatusCode: false,
            headers: this.headers,
            body: multifactor_payload
        });

    }

    resendMultifactor(jwt) {
        this.updateHeaders(jwt)

        return cy.request({
            method: 'GET',
            url: url + '/multifactor/resend',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    quickPay(quick_pay_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/quick_pay',
            failOnStatusCode: false,
            headers: this.headers,
            body: quick_pay_payload
        });
    }

    register(register_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/users',
            failOnStatusCode: false,
            headers: this.headers,
            body: register_payload
        });
    }

    resendRecoveryEmail(resend_recovery_email_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/users/send_recovery_email',
            failOnStatusCode: false,
            headers: this.headers,
            body: resend_recovery_email_payload
        });
    }

    getAccounts(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/accounts',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    switchLoan(loan_number, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/account_details/' + loan_number,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    newLoan(new_loan_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/account_details',
            failOnStatusCode: false,
            headers: this.headers,
            body: new_loan_payload
        });
    }

    deleteLoan(loan_number, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'DELETE',
            url: url + '/account_details/' + loan_number,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    getDocuments(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        //ToDo: Are there other document types? Are there other query parameters for this?
        return cy.request({
            method: 'GET',
            url: url + '/documents?document_type=statements',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    getEscrowShortage(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/escrow_shortage',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    getNotificationPreferences(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/notification_preferences',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    updateNotificationPreferences(notification_preferences_paylod, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PATCH',
            url: url + '/notification_preferences',
            failOnStatusCode: false,
            headers: this.headers,
            body: notification_preferences_paylod
        });
    }

    getPayments(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/payments',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    getPayment(payment_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/payments/' + payment_id,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    getMspOtherFees(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/payments/msp_other_fees',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    voidPayment(payment_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PATCH',
            url: url + '/payments/' + payment_id + '/void',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    createPayment(payment_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/payments',
            failOnStatusCode: false,
            headers: this.headers,
            body: payment_payload
        });
    }

    updatePassword(updated_password_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PATCH',
            url: url + '/profiles/',
            failOnStatusCode: false,
            headers: this.headers,
            body: updated_password_payload
        });
    }

    getPayAccounts(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/pay_accounts',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    setDefaultPayAccount(pay_account_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PUT',
            url: url + '/pay_accounts/' + pay_account_id + '/default',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    deletePayAccount(pay_account_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'DELETE',
            url: url + '/pay_accounts/' + pay_account_id,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    createBankAccounts(bank_account_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/bank_accounts',
            failOnStatusCode: false,
            headers: this.headers,
            body: bank_account_payload
        });
    }

    createCardAccounts(card_account_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/card_accounts',
            failOnStatusCode: false,
            headers: this.headers,
            body: card_account_payload
        });
    }

    getRecurringPayments(jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'GET',
            url: url + '/recurring_payments',
            failOnStatusCode: false,
            headers: this.headers,
        });
    }

    createRecurringPayment(recurring_payment_payload, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'POST',
            url: url + '/recurring_payments',
            failOnStatusCode: false,
            headers: this.headers,
            body: recurring_payment_payload
        });
    }

    updateRecurringPayment(recurring_payment_payload, recurring_payment_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PATCH',
            url: url + '/recurring_payments/' + recurring_payment_id,
            failOnStatusCode: false,
            headers: this.headers,
            body: recurring_payment_payload
        });
    }

    deleteRecurringPayment(recurring_payment_id, jwt) {
        if (jwt) {
            this.updateHeaders(jwt)
        }

        return cy.request({
            method: 'PATCH',
            url: url + '/recurring_payments/' + recurring_payment_id,
            failOnStatusCode: false,
            headers: this.headers,
        });
    }


}