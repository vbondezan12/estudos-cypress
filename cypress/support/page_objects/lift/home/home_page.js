const url = `${ Cypress.config().lift.baseUrl }/home`;
const urlReports = `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`;
import { CLIENT } from '../../../../config/constants';


export class HomePage {

  open() {
    cy.visit(url);
  }

  openReports() {
    cy.visit(urlReports)
  }

  get clientSelectionForm() {
    return cy.get('#client-toggle');
  }

  get endTourButton() {
    return cy.get('[data-role="end"]')
  }

  clickEndtourButton() {
    this.endTourButton.click();
  }

  clickClientSelectionForm() {
    this.clientSelectionForm.click();
  }

  clientSelection(client) {
    switch (client) {
      case CLIENT.US_BANK:
        return cy.get('.client-select:nth-child(3652) > a').click();
        break
      case CLIENT.VHDA:
        return cy.get('.client-select:nth-child(3652) > a').click();
        break
      case CLIENT.VENTANEX:
        return cy.get('.client-select:nth-child(3652) > a').click();
        break
        break
    }
  }
}