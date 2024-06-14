import { CLIENT } from '../../../../config/constants';
import { HomePage } from '../../../../support/page_objects/lift/home/home_page';

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

    it('VEN-15594_lift_home_should_validate_payment_side_menu_options', { tags: '@smoke' }, function () {
      homePage.clickPaymentsSideMenu()

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ')
      homePage.paymentsNewMspPayment
        .should('exist')
        .contains('New MSP Payment')
      homePage.paymentsMSPRecurringPayment
        .should('exist')
        .contains('MSP Recurring Payment')
      homePage.paymentsCollectOneTimePayment
        .should('exist')
        .contains('Collect Onetime Payment')
      homePage.paymentsIssueOneTimePayment
        .should('exist')
        .contains('Issue Onetime Payment')
      homePage.paymentsRecurringPayment
        .should('exist')
      homePage.paymentsResearch
        .should('exist')
        .contains('Research')
    });
  });
});