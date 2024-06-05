const url = `${ Cypress.config().lift.baseUrl }/home`;
const urlReports = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;
import { LiftBase } from '../lift_base';

export class HomePage extends LiftBase {

  get toastMessage() {
    return cy.get('.toast-message');
  }

  get clientSelectionForm() {
    return cy.get('#client-toggle');
  }

  get endTourButton() {
    return cy.get('[data-role="end"]');
  }

  get userButton() {
    return cy.get('#profile-name').should('be.visible');
  }

  get profileButton() {
    return cy.get(':nth-child(1) > .dropdown-item').contains('Profile')
  }

  get inboxButton() {
    return cy.get(':nth-child(3) > .dropdown-item').should('be.visible');
  }

  get logoutButton() {
    return cy.get(':nth-child(5) > .dropdown-item').should('be.visible');
  }

  get paymentsSideMenu() {
    return cy.contains('span', 'Payments').should('be.visible');
  }

  get paymentsNewMspPayment() {
    return cy.get('[href="/msp_payments/new"]').contains('New MSP Payment');
  }

  get paymentsMSPRecurringPayment() {
    return cy.get('a[href="#"]')
      .contains('MSP Recurring Payment')
      .should('exist')
      .should('be.visible')
  }

  get paymentsMSPRecurringPaymentManage() {
    return cy.get('a[href="/msp_recurring_payments"]').contains('Manage');
  }

  get paymentsMSPRecurringPaymentCreate() {
    return cy.get('a[href="/msp_recurring_payments/new"]').contains('Create');
  }

  get paymentsCollectOneTimePayment() {
    return cy.get('a[href="/payments/new/onetime_debit"]');
  }

  get paymentsIssueOneTimePayment() {
    return cy.get('a[href="/payments/new/onetime_credit"]');
  }

  get paymentsRecurringPayment() {
    return cy.get('li.parent_nav').eq(2).within(() => {
      cy.get('a[href="#"]').invoke('text').then((text) => {
        expect(text.trim()).to.equal('Recurring Payments');
      });
    });
  }

  get paymentsRecurringPaymentManage() {
    return cy.get('a[href="/recurring_payments"]').contains('Manage');

  }

  get paymentsRecurringPaymentCreate() {
    return cy.get('a[href="/recurring_payments/new/collect"]').contains('Collect');
  }

  get paymentsResearch() {
    return cy.get('a[href="#"]').contains('Research').should('be.visible');
  }

  get paymentsReseachEmailConfirmations() {
    return cy.get('a[href="/email_confirmations"]');
  }

  get paymentsReseachMySummary() {
    return cy.get('a[href="/stored_payments/my_summary"]');
  }

  open() {
    cy.visit(url);
  }

  openReports() {
    cy.visit(urlReports);
  }

  clickEndtourButton() {
    this.endTourButton.click();
  }

  clickClientSelectionForm() {
    this.clientSelectionForm.click();
  }

  clickUserButton() {
    this.userButton.click();
  }

  clickProfileButton() {
    this.profileButton.click();
  }

  clickInboxButton() {
    this.inboxButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  clientSelection(clientId) {
    cy.get(`[data-id="${ clientId }"]`).click()
    cy.contains('span', clientId).should('be.visible');
  }

  clickPaymentsSideMenu() {
    this.paymentsSideMenu.click()
  }

  clickMspRecurringPayment() {
    this.paymentsMSPRecurringPayment.click()
  }
}