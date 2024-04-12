import { faker } from "@faker-js/faker";
const url = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;

export class TransactionListing {

  openReportsListing() {
    cy.visit(url);
  }

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

  get searchButton() {
    return cy.get('form');
  }

  get transactionListed() {
    return cy.get('.footable-even > :nth-child(2)')
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
    this.clickReportingSection()
    this.clickTransactionSection()
    this.clickListingOption()
  }

  setListingStartDate() {
    this.listingStartDate.type(`${ faker.date.recent({ days: 40}).toLocaleDateString('en-US') }`);
  }

  clickSearchButton() {
    this.searchButton.click();
  }



}