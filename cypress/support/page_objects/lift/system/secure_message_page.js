import { LiftBase } from '../lift_base';

const url = `${ Cypress.config().lift.baseUrl }/system/secure_messages`;

export class SecureMessageCenter extends LiftBase {

  get loanNumber() {
    return cy.get('#loan_number');
  }

  get searchButton() {
    cy.get('.button');
  }

  get unreadMessage() {
    cy.get('.unread_row:nth-child(1) > td:nth-child(1)');
  }

  open() {
    cy.visit(url);
  }

}