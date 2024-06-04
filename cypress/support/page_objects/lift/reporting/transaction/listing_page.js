import { LiftBase } from '../../lift_base';

const url = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;

export class TransactionListing extends LiftBase {

  get reportingSection() {
    return cy.get('#side-menu > .parent_nav:nth-child(5) > a');
  }

  get transactionSection() {
    return cy.get('.nav-second-level > :nth-child(3) > [href="#"]');
  }

  get listingOption() {
    return cy.get('.nav-second-level > .active > .nav > :nth-child(2) > a');
  }

  get listingStartDate() {
    return cy.get('#transaction_listing_start_date').clear();
  }

  get listingEndDate() {
    return cy.get('#transaction_listing_end_date').clear();
  }

  get searchButton() {
    return cy.get('.pull-right > .btn-primary');
  }

  get transactionListed() {
    return cy.get('.footable-even > :nth-child(2)');
  }

  get statusDropdownButton() {
    return cy.get('#transaction_listing_status');
  }

  get pendingPresentmentTransactionStatus() {
    return cy.get('#status_100452579');
  }

  get authorizedTransactionStatus() {
    return cy.get('#status_100452580');
  }

  get cardDeclinedTransactionStatus() {
    return cy.get('#status_100452564');
  }

  get cardRefundedTransactionStatus() {
    return cy.get('#status_100452573');
  }

  get totalAmountreported() {
    return cy.get('tfoot > tr > :nth-child(2)');
  }

  get advanceOptionsButton() {
    return cy.get('.text-center > .btn-outline-primary');
  }

  get transactionListingAmount() {
    return cy.get('#transaction_listing_amount');
  }

  get transactionDetails() {
    return cy.get('#tracking_100452577');
  }

  get clientReferenceNumber() {
    return cy.get('tbody > :nth-child(9) > :nth-child(2)');
  }

  openReportsListing() {
    cy.visit(url);
  }

  clickReportingSection() {
    this.reportingSection.click();
  }

  clickTransactionSection() {
    this.transactionSection.click();
  }

  clickListingOption() {
    this.transactionSection.click();
  }

  accessListing() {
    this.clickReportingSection();
    this.clickTransactionSection();
    this.clickListingOption();
  }

  setListingStartDate(startDate) {
    this.listingStartDate.type(startDate).type('{esc}');
  }

  setListingEndDate(endDate) {
    this.listingEndDate.type(endDate).type('{esc}');
  }

  clickSearchButton() {
    this.searchButton.click();
  }

  selectStatusDropdownButton(option) {
    this.statusDropdownButton.select(option);
  }

  clickAdvanceOptionsButton() {
    this.advanceOptionsButton.click();
  }

  setListingAmount() {
    this.transactionListingAmount.type('10.00');
  }

  clickTransactionDetails() {
    this.transactionDetails.click();
  }

}