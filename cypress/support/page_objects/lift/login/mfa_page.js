
const url = `${ Cypress.config().lift.baseUrl }/sessions/mfa`

export class MfaPage {

    get mfaInput() {
        return cy.get('#mfa_token');
    }

    get mfaConfirmButton() {
        return cy.get('#mfa_form');
    }

    get mfaToastMessage() {
        return cy.get('.toast-message');
    }

    get mfaResendToken() {
        return cy.get(':nth-child(7) > a');
    }

    enterMfaInput(mfaCode) {
        this.mfaInput.type(`${mfaCode}`)
    }

    clickMfaConfirmButton() {
        this.mfaConfirmButton.submit()
    }

    clickMfaResendToken() {
        this.mfaResendToken.click()
    }


}