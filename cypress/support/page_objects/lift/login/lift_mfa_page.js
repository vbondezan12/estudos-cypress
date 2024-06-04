import { LiftBase } from '../lift_base';

const url = `${ Cypress.config().lift.baseUrl }/sessions/mfa`;

export class LiftMfaPage extends LiftBase {

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

  open() {
    cy.visit(url);
  }

  enterMfaInput(mfaCode) {
    this.mfaInput.type(`${ mfaCode }`);
  }

  clickMfaConfirmButton() {
    this.mfaConfirmButton.submit();
  }

  clickMfaResendToken() {
    this.mfaResendToken.click();
  }
}