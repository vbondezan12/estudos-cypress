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

  // User elements
  get profileButton() {
    return cy.get(':nth-child(1) > .dropdown-item').contains('Profile')
  }

  get inboxButton() {
    return cy.get(':nth-child(3) > .dropdown-item').should('be.visible');
  }

  get logoutButton() {
    return cy.get(':nth-child(5) > .dropdown-item').should('be.visible');
  }

  // Payment Menu elements

  get paymentsNewMspPayment() {
    return cy.get('[href="/msp_payments/new"]').contains('New MSP Payment');
  }

  clickPaymentsNewMspPayment() {
    this.paymentsNewMspPayment.should('be.visible').click()
  }

  get paymentsMSPRecurringPayment() {
    return cy.get('a[href="#"]')
      .contains('MSP Recurring Payment')
      .should('exist')
      .should('be.visible')
  }

  clickPaymentsMspRecurringPayment() {
    this.paymentsMSPRecurringPayment.click()
  }

  get paymentsMSPRecurringPaymentManage() {
    return cy.get('a[href="/msp_recurring_payments"]').contains('Manage');
  }

  clickMspRecurringPaymentManage() {
    this.paymentsMSPRecurringPaymentManage.should('be.visible').click()
  }

  get paymentsMSPRecurringPaymentCreate() {
    return cy.get('a[href="/msp_recurring_payments/new"]').contains('Create');
  }

  clickMspRecurringPaymentCreate() {
    this.paymentsMSPRecurringPaymentCreate.should('be.visible').click()
  }


  get paymentsCollectOneTimePayment() {
    return cy.get('a[href="/payments/new/onetime_debit"]');
  }

  clickPaymentsCollectOneTimePayment() {
    this.paymentsCollectOneTimePayment.should('be.visible').click()
  }

  get paymentsIssueOneTimePayment() {
    return cy.get('a[href="/payments/new/onetime_credit"]');
  }

  clickPaymentsIssueOneTimePayment() {
    this.paymentsIssueOneTimePayment.should('be.visible').click()
  }

  get paymentsRecurringPayment() {
    return cy.get('li.parent_nav').eq(2).within(() => {
      cy.get('a[href="#"]').invoke('text').then((text) => {
        expect(text.trim()).to.equal('Recurring Payments');
      });
    });
  }

  clickPaymentsRecurringPayment() {
    this.paymentsRecurringPayment.should('be.visible').click()
  }

  get paymentsRecurringPaymentManage() {
    return cy.get('a[href="/recurring_payments"]').contains('Manage');
  }

  clickPaymentsRecurringPaymentManage() {
    this.paymentsRecurringPaymentManage.should('be.visible').click()
  }

  get paymentsRecurringPaymentCollect() {
    return cy.get('a[href="/recurring_payments/new/collect"]').contains('Collect');
  }

  clickPaymentsRecurringPaymentCollect() {
    this.paymentsRecurringPaymentCollect.should('be.visible').click()
  }

  get paymentsResearch() {
    return cy.get('a[href="#"]').contains('Research').should('be.visible');
  }

  clickPaymentsResearch() {
    this.paymentsResearch.should('be.visible').click()
  }

  get paymentsResearchEmailConfirmations() {
    return cy.get('a[href="/email_confirmations"]');
  }

  clickPaymentsResearchEmailConfirmations() {
    this.paymentsResearchEmailConfirmations.should('be.visible').click()
  }

  get paymentsResearchMySummary() {
    return cy.get('a[href="/stored_payments/my_summary"]');
  }

  clickPaymentsResearchMySummary() {
    this.paymentsResearchMySummary.should('be.visible').click()
  }

  // Secure Exchange elements

  get fileManagement () {
    return cy.get('a[href="/client_inbound_files"]')
  }

  clickFileManagement() {
    this.fileManagement.should('be.visible').click()
  }

  get mspLockboxExceptionItems () {
    return cy.get('a[href="/msp_lockbox_exceptions"]')
  }

  clickMspLockboxExceptionItems() {
    this.mspLockboxExceptionItems.should('be.visible').click()
  }

  get secureMessages () {
    return cy.get('a[href="/secure_messages"]')
  }

  clickSecureMessages() {
    this.secureMessages.should('be.visible').click()
  }

  // Documents elements

  get management () {
    return cy.get('a[href="/documents"]')
  }

  clickManagement() {
    this.management.should('be.visible').click()
  }

  get research () {
    return cy.get('a[href="/documents/research"]')
  }

  clickResearch() {
    this.research.should('be.visible').click()
  }

  get researchArchived () {
    return cy.get('a[href="/archive_documents/research"]')
  }

  clickResearchArchived() {
    this.researchArchived.should('be.visible').click()
  }

  // Reporting elements

  get dashboards () {
    return cy.get('a[href="#"]').contains('Dashboards ').should('be.visible')
  }

  clickDashboards() {
    this.dashboards.should('be.visible').click()
  }

  get transactionDashboard () {
    return cy.get('a[href="/reports/transaction_dashboard"]')
  }

  clickTransactionDashboard() {
    this.transactionDashboard.should('be.visible').click()
  }

  get slaDashboard () {
    return cy.get('a[href="/reports/sla_dashboard"]')
  }

  clickSlaDashboard() {
    this.slaDashboard.should('be.visible').click()
  }

  get webpayDashboard () {
    return cy.get('a[href="/dashboards/webpay"]')
  }

  clickWebpayDashboard() {
    this.webpayDashboard.should('be.visible').click()
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

  clickMspRecurringPayment() {
    this.paymentsMSPRecurringPayment.click()
  }

}