import { faker } from '@faker-js/faker';
const oneTimePaymentUrl = `${Cypress.config().lift.baseUrl}/payments/new/onetime_debit`

export class OneTimePaymentPage {

  openOneTimeDebitPayment() {
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

  get efectiveDate() {
    return cy.get('#payment_effective_date').clear();

  }

  get cardNumber(){
    return cy.get('#payment_pay_account_attributes_account_number');
  }

  get expirationMonth(){
    return cy.get('#payment_pay_account_attributes_expiration_month');
  }

  get expirationYear() {
    return cy.get('#payment_pay_account_attributes_expiration_year')
  }

  get cardCode() {
    return cy.get('#payment_pay_account_attributes_credit_card_code')
  }

  get cardFirstName() {
    return cy.get('#payment_pay_account_attributes_first_name')
  }

  get cardLastName() {
    return cy.get('#payment_pay_account_attributes_last_name')
  }

  get streetName1() {
    return cy.get('#payment_pay_account_attributes_street_1')
  }

  get streetName2() {
    return cy.get('#payment_pay_account_attributes_street_2')
  }

  get cityName() {
    return cy.get('#payment_pay_account_attributes_city')
  }

  get stateName() {
    return cy.get('#payment_pay_account_attributes_state')
  }

  get zipCode() {
    return cy.get('#payment_pay_account_attributes_zip')
  }

  get finishButton() {
    return cy.get('[aria-hidden="false"] > a')
  }

  get postThisPaymentButton() {
    return cy.get('.add_payment')
  }

  get availablePaymentAccount(){
    return cy.get('#payment_pay_account_id')
  }

//   cy.visit('https://lift-qa.secureconduit.net/payments/new/onetime_debit');
// cy.get('#payment_pay_account_id').click();
// cy.get('#payment_pay_account_id').type('5091526');
// cy.get('#payment_pay_account_id').click();
// cy.get('.actions li:nth-child(3) > a').click();


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
    this.nextButton.should('be.visible').click()
  }

  addingNewCard() {
    this.cardNumber.should('be.visible').type('4111111111111111')
    this.expirationMonth.select(`${ faker.number.int({ min: 1, max: 12 }) }`);
    this.expirationYear.select(`${ faker.date.future({ years: 2 }).getFullYear() }`);
    this.cardCode.type(`${ faker.number.int({ min: 1, max: 12 }) }`);
    this.cardFirstName.type(`${ faker.person.firstName() }`);
    this.cardLastName.type(`${ faker.person.lastName() }`);
    this.streetName1.type(`${ faker.location.street() }`);
    this.streetName2.type(`${ faker.location.street()}`);
    this.cityName.type(`${ faker.location.city()}`);
    this.stateName.select(`${ faker.location.state()}`);
    this.zipCode.type(`${ faker.number.int({min: 11111, max: 99999})}`);
  }

  clickFinishButton() {
    this.finishButton.should('be.visible').click()
  }

  clickPostThisPaymentButton() {
    this.postThisPaymentButton.should('be.visible').click()
  }

  selectAvailablePaymentAccount(){
    this.availablePaymentAccount.select('5091526')
  }










}