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

    it('VEN-15594_lift_home_should_access_documents_research_archived_successfully', { tags: '@smoke' }, function () {
      homePage.clickDocumentsSideMenu()
      homePage.clickResearchArchived()

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/archive_documents/research`);
    });
  });
});