import { faker } from "@faker-js/faker";
const url = `${ Cypress.config().lift.baseUrl }/home`;
const urlReports = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;


export class HomePage {

  open() {
    cy.visit(url);
  }

  openReports() {
    cy.visit(urlReports)
  }

  get clientSelection() {
    return cy.get('#client-toggle');
  }
  get clientSelectionVhda() {
    return cy.get('.client-select:nth-child(3652) > a');
  }

  get endTourButton() {
    return cy.get('[data-role="end"]')
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

  clickEndtourButton(){
    this.endTourButton.click();
  }

  clickClientSelection() {
    this.clientSelection.click();
  }

  clickClientSelectionVhda() {
    this.clientSelectionVhda.click();
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
    this.listingStartDate.type(`${ faker.date.recent({ days: 5}).toLocaleDateString('en-US') }`);
  }

  clickSearchButton() {
    this.searchButton.click();
  }
}