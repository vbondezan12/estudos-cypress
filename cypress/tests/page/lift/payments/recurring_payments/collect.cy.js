
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
    it('VEN-15594_lift_home_should_access_Recurring_Payments_Create_page_successfully', { tags: '@smoke' }, function () {
      cy.intercept('GET', `${ Cypress.config().lift.baseUrl }/recurring_payments/new/collect`).as('collectRecurringPayment');

      homePage.clickPaymentsSideMenu()
      homePage.paymentsRecurringPayment.wait(1000).click()
      homePage.clickPaymentsRecurringPaymentCollect()

      cy.wait('@collectRecurringPayment').its('response.statusCode').should('be.oneOf', [ 200, 201, 202 ]);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/recurring_payments/new/collect`);
    });
  });
});