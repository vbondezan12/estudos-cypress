import { faker } from '@faker-js/faker';
const oneTimePaymentUrl = `${Cypress.config().lift.baseUrl}/payments/new/onetime_credit`

export class PaymentPage {

  openOneTimePayment() {
    cy.visit(oneTimePaymentUrl);
  }

  get customerReferenceNumber() {
    return cy.get('#payment_customer_reference_number');
  }

  get searchCutormerReferenceNumberButton() {
    return cy.get('tr:nth-child(1) .search_for_customers');
  }

  get accountHolderModalTitle() {
    return cy.get('#account_holder_search_modal .modal-title').should('be.visible');
  }

  get customerSearchModalTitle() {
    return cy.get('#account_holder_search_modal .modal-title');
  }

  get customerNumberValidation() {
    return cy.get('#account_holder_9018194 > td:nth-child(1)').should('be.visible');
  }

  get customerSelectionButton() {
    return cy.get('#account_holder_select_9018194').should('be.visible');
  }

  get paymentAmount() { 
    return cy.get('#payment_amount').clear();
  }

  get nextButton() {
    return cy.get('[aria-hidden="false"] > a');
  }

  inputCustomerReferenceNumber(loanNumber) {
    this.customerReferenceNumber.should('be.visible').type(loanNumber);
  }

  clickCustomerReferenceNumberButton() {
    this.searchCutormerReferenceNumberButton.should('be.visible').click();
  }

  selectCustomerButton() {
    this.customerNumberValidation
    this.customerSelectionButton.click();
  }

  inputPaymentAmount() {
    this.paymentAmount.type(`${ faker.finance.amount({ min: 1, max: 100 }) }`)
  }

  clickNextButton() {
    this.nextButton.click()
  }

  




}