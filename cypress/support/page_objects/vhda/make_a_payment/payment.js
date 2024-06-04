import { VhdaBase } from '../vhda_base';

const url = `${ Cypress.config().vhda.baseUrl }/payments/new`;

export class MakePayment extends VhdaBase {
  get newPayAccountButton() {
    return cy.get('.text-center > .btn');
  }

  get routingNumberInput() {
    return cy.get('#payment_pay_account_routing_number');
  }

  get accountNumberInput() {
    return cy.get('#payment_account_number');
  }

  get accountNameInput() {
    return cy.get('#payment_pay_account_name');
  }

  get nickNameInput() {
    return cy.get('#payment_pay_account_nickname');
  }

  get addButton() {
    return cy.get('.btn-primary > .fa');
  }

  open() {
    return cy.visit(url);
  }

  clickNewPayAccountButton() {
    this.newPayAccountButton.click();
  }

  enterRoutingNumber(routingNumber) {
    this.routingNumberInput.type(routingNumber);
  }

  enterAccountNumber(accountNumber) {
    this.accountNumberInput.type(accountNumber);
  }

  enterName(name) {
    this.accountNameInput.type(name);
  }

  enterNickName(nickName) {
    this.nickNameInput.type(nickName);
  }

  clickAddButton() {
    this.addButton.click();
  }
}