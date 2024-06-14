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
    it('VEN-15594_lift_home_should_access_MSP_Recurring_Payments_Create_page_successfully', { tags: '@smoke' }, function () {
      cy.intercept('GET', `${ Cypress.config().lift.baseUrl }/msp_recurring_payments/new`).as('newMspRecurringPayments');

      homePage.clickPaymentsSideMenu()
      homePage.paymentsMSPRecurringPayment.wait(1000).click()
      homePage.clickMspRecurringPaymentCreate()

      cy.wait('@newMspRecurringPayments').its('response.statusCode').should('be.oneOf', [ 200, 201, 202 ]);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/msp_recurring_payments/new`);
    });
  });
});
