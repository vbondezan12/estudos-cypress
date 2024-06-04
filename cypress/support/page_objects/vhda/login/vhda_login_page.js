import { VhdaBase } from '../vhda_base';

const url = `${ Cypress.config().vhda.baseUrl }/login`;

export class VhdaLoginPage extends VhdaBase {

  get userNameInput() {
    return cy.get('#user_username');
  }

  get passwordInput() {
    return cy.get('#user_password');
  }

  get loginButton() {
    return cy.get('.btn');
  }

  get toastMessage() {
    return cy.get('.toast-message');
  }

  get errorMessage() {
    return cy.get('.card-body');
  }

  get multifactorToken() {
    return cy.get('#multifactor_token_token');
  }

  get authenticateButton() {
    return cy.get('.btn');
  }

  get toastMessageMfaPage() {
    return cy.get('.toast-message');
  }

  open() {
    return cy.visit(url);
  }

  login(userName, password, mfa) {
    this.open();
    this.enterUserName(userName);
    this.enterPassword(password);
    this.clickLoginButton();
    this.enterMFACode(mfa);
  }

  enterUserName(userName) {
    this.userNameInput.type(userName);
  }

  enterPassword(password) {
    this.passwordInput.type(password);
  }

  clickLoginButton() {
    this.loginButton.click();
  }

  enterMFACode(mfaCode) {
    this.multifactorToken.type(mfaCode);
  }

  clickAuthenticateButton() {
    this.authenticateButton.click();
  }
}