import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';

describe('Lift', () => {
  describe('Home', () => {
    const homePage = new HomePage();

    beforeEach(() => {
      cy.liftLogin(CLIENT.VENTANEX);
      homePage.open();
    });

    it('VEN-15594_lift_home_with_valid_client_selection', { tags: '@smoke' }, function () {
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(CLIENT.VHDA);

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
      homePage.clientSelectionForm
        .should('contains.text', ' 863 Virginia Housing ');
    });
  });
});