import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';

describe('Lift', () => {
  describe('Payments', () => {
    const homePage = new HomePage();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);
    });

    it('VEN-15594_lift_home_should_access_new_msp_payment_page_successfully', { tags: '@smoke' }, function () {
      cy.intercept('GET', `${ Cypress.config().lift.baseUrl }/msp_payments/new`).as('newMspPaymentPage');

      homePage.clickPaymentsSideMenu()
      homePage.clickPaymentsNewMspPayment()

      cy.wait('@newMspPaymentPage').its('response.statusCode').should('be.oneOf', [ 200, 201, 202 ]);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/msp_payments/new`);
    });
  });
});