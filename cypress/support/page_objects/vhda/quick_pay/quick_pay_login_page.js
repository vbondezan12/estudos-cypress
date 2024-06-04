import { VhdaBase } from '../vhda_base';

const url = `${ Cypress.config().vhda.baseUrl }/quick_pay/new`;

export class QuickPayLoginPage extends VhdaBase {
  get quickPayButton() {
    return cy.get('#login');
  }

  get goToLoginLink() {
    return cy.get('.simple_link');
  }

  get loanNumberInput() {
    return cy.get('#user_loan_number');
  }

  get zipCodeInput() {
    return cy.get('#user_zip');
  }

  get ssnInput() {
    return cy.get('#user_ssn');
  }

  get toastMessage() {
    return cy.get('.toast-message');
  }

  get ssnErrorMessage() {
    return cy.get('.parsley-ssn');
  }

  open() {
    return cy.visit(url);
  }

  login(loanNumber, zipCode, ssn) {
    this.open();
    this.loanNumberInput.type(loanNumber);
    this.zipCodeInput.type(zipCode);
    this.ssnInput.type(ssn);
    this.quickPayButton.submit();
  }
}