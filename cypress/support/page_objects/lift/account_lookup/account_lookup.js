import { LiftBase } from '../lift_base';

const url = `${Cypress.config().lift.baseUrl}/account_lookup/search`;

export class AccountLookup extends LiftBase {

  get loanNumberLookup() {
    return cy.get('input[id="loan_number"]')
  }

  inputLoanNumber(loanNumber) {
    this.loanNumberLookup.should('be.visible').type(loanNumber)
  }

  get lookupButton() {
    return cy.get('[type="submit"]').should('be.visible')
  }

  clickLookupButton() {
    this.lookupButton.should('be.visible').click()
  }

  alertMessage() {
    return cy.get('[role=alert]')
      .should('be.visible')
      .should('exist')
      .contains(`The account could not be found. Please confirm that account # exists.`);
  }




}