import { CLIENT } from '../../../../config/constants';
import { LiftBase } from '../lift_base';

const url = `${ Cypress.config().lift.baseUrl }/sessions/login`;

export class LiftLoginPage extends LiftBase {
  get usernameInput() {
    return cy.get('#username');
  }

  get passwordInput() {
    return cy.get('#password');
  }

  get clientIdInput() {
    return cy.get('#code');
  }

  get loginButton() {
    return cy.get('.btn');
  }

  get forgetPasswordLink() {
    return cy.get('.alert-light');
  }

  get toastMessage() {
    return cy.get('.toast-message');
  }

  open() {
    cy.visit(url);
  }

  enterUsername(username) {
    this.usernameInput.type(username);
  }

  enterPassword(password) {
    this.passwordInput.type(password);
  }

  enterClientId(clientId) {
    this.clientIdInput.type(clientId);
  }

  clickLogin() {
    this.loginButton.click();
  }

  login(username, password, clientId) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.enterClientId(clientId);
    this.clickLogin();
  }

  getMfaCode(email) {
    return this.getLastMfaCode(CLIENT.VENTANEX, email);
  }
}