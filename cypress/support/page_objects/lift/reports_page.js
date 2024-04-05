const url = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;

export class HomePage {

  open() {
    cy.visit(url);
  }



}