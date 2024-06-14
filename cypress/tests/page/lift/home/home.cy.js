import { CLIENT } from '../../../../config/constants';
import { HomePage } from '../../../../support/page_objects/lift/home/home_page';

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

    describe('User Section', () => {

      it('VEN-15594_lift_home_should_open_profile_page', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickProfileButton()

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/users`);
      });

      xit('VEN-15594_lift_home_should_open_inbox_page', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickInboxButton()

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/inbox`);
        // Inbox page is returning a 500, need to be implemented in QA environment
      });

      it('VEN-15594_lift_home_should_logout_successfully', { tags: '@smoke' }, function () {
        homePage.clickUserButton()
        homePage.clickLogoutButton()

        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/logout`);
        homePage.toastMessage
          .should('contains.text', 'Successfully Logged Out')
      });

    });
  });
});