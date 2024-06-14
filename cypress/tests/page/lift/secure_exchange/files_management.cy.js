import { CLIENT } from '../../../../config/constants';
import { HomePage } from '../../../../support/page_objects/lift/home/home_page';

describe('Lift', () => {
  describe('Secure Exchange', () => {
    const homePage = new HomePage();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VILLAGE_CAPITAL);
    });

    it('VEN-15594_lift_home_should_access_File_management_successfully', { tags: '@smoke' }, function () {
      cy.intercept('GET', `${ Cypress.config().lift.baseUrl }/client_inbound_files`).as('filesManagement');

      homePage.clickSecureExchangeSideMenu()
      homePage.clickFileManagement()

      cy.wait('@filesManagement').its('response.statusCode').should('be.oneOf', [ 200, 201, 202 ]);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/client_inbound_files`);
    });
  });
});