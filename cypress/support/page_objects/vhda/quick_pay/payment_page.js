const url = `${ Cypress.config().vhda.baseUrl }/payments/new`;
import { faker } from '@faker-js/faker';
import { VhdaBase } from '../vhda_base';

export class PaymentPage extends VhdaBase {
  get newPayAccountButton() {
    return cy.get('.text-center > .btn');
  }

  // Bank account_holders
  get routingNumberInput() {
    return cy.get('#payment_pay_account_routing_number');
  }

  get accountNumberInput() {
    return cy.get('#payment_account_number');
  }

  get accountNameInput() {
    return cy.get('#payment_pay_account_name');
  }

  get accountNicknameInput() {
    return cy.get('#payment_pay_account_nickname');
  }

  get newAccountInfo() {
    return cy.get('.new_account_info');
  }

  get savingsAccountCheckbox() {
    return cy.get('#payment_pay_account_checking_savings');
  }

  get businessAccountCheckbox() {
    return cy.get('#payment_pay_account_account_business_business');
  }

  get addButton() {
    return cy.get('.float-right');
  }

  get routingNumberErrorMessage() {
    return cy.get('.parsley-routing');
  }

  // bank account_holders errors

  get accountNumberErrorMessage() {
    return cy.get('.parsley-microbilt');
  }

  get accountNameErrorMessage() {
    return cy.get('.parsley-fullName');
  }

  get debitCardButton() {
    return cy.get('[data-type="debit"]');
  }

  // Debit card

  get cardNameInput() {
    return cy.get('#payment_pay_account_card_name');
  }

  get cardNumberInput() {
    return cy.get('#payment_number');
  }

  get cardExpMonthInput() {
    return cy.get('#payment_pay_account_exp_month');
  }

  get cardExpYearInput() {
    return cy.get('#payment_pay_account_exp_year');
  }

  get cardNicknameInput() {
    return cy.get('#payment_pay_account_card_nickname');
  }

  get cardAddressInput() {
    return cy.get('#payment_pay_account_address1');
  }

  get cardCityInput() {
    return cy.get('#payment_pay_account_city');
  }

  get cardStateInput() {
    return cy.get('#payment_pay_account_state');
  }

  get cardZipCodeInput() {
    return cy.get('#payment_pay_account_zip');
  }

  get cardNameErrorMessage() {
    return cy.get('#parsley-id-72');
  }

  // debit card errors

  get cardNumberErrorMessage() {
    return cy.get('#parsley-id-74');
  }

  get cardAddressErrorMessage() {
    return cy.get('#parsley-id-82');
  }

  get cardCityErrorMessage() {
    return cy.get('#parsley-id-86');
  }

  get cardStateErrorMessage() {
    return cy.get('#parsley-id-88');
  }

  get cardZipCodeErrorMessage() {
    return cy.get('#parsley-id-90');
  }

  open() {
    return cy.visit(url);
  }

  addNewBankAccount(routingNumber, accountNumber, accountName, accountNickname, accountType = null) {
    this.newPayAccountButton.should('be.visible').click();
    this.routingNumberInput.type(routingNumber);
    this.accountNumberInput.type(accountNumber);
    this.accountNameInput.type(accountName);
    this.accountNicknameInput.type(accountNickname);
    switch (accountType) {
      case 'checking-personal':
        this.addButton.click();
        break;
      case 'savings-personal':
        this.savingsAccountCheckbox.click();
        this.addButton.click();
        break;
      case 'checking-business':
        this.businessAccountCheckbox.click();
        this.addButton.click();
        break;
      case 'savings-business':
        this.savingsAccountCheckbox.click();
        this.addButton.click();
        break;
      default:
        this.addButton.click();
        break;
    }
  }

  addNewDebitCard(cardName, cardNumber, cardAddress, city, state, zipCode) {
    this.newPayAccountButton.should('be.visible').click();
    this.debitCardButton.should('be.visible').click();
    this.cardNameInput.type(cardName);
    this.cardNumberInput.type(cardNumber);
    this.cardExpMonthInput.select(`${ faker.number.int({ min: 1, max: 12 }) }`);
    this.cardExpYearInput.select(`${ faker.date.future({ years: 2 }).getFullYear() }`);
    this.cardNicknameInput.type(`${ faker.person.firstName() } ${ faker.person.lastName() }`);
    this.cardAddressInput.type(cardAddress);
    this.cardCityInput.type(city);
    this.cardStateInput.select(state);
    this.cardZipCodeInput.type(zipCode);
    this.addButton.click();
  }
}