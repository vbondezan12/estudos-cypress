import { CLIENT } from '../../../../../config/constants';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';

describe('Lift', () => {
  describe('Reporting', () => {
    describe('Dashboard', () => {
      const homePage = new HomePage();

      beforeEach(() => {
        cy.liftLogin(CLIENT.VENTANEX);
        homePage.open();
        homePage.clickEndtourButton();
        homePage.clickClientSelectionForm();
        homePage.clientSelection(CLIENT.VHDA);
      });
      it('VEN-15594_lift_home_should_access_Reporting_Dashboards_transaction_dashboard_successfully', { tags: '@smoke' }, function () {
        cy.intercept('GET', `${ Cypress.config().lift.baseUrl }/reports/transaction_dashboard`).as('transactionDashboard');

        homePage.clickReportingSideMenu()
        homePage.dashboards.wait(1000).click()
        homePage.clickTransactionDashboard()

        cy.wait('@transactionDashboard').its('response.statusCode').should('be.oneOf', [ 200, 201, 202 ]);
        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_dashboard`);
      });
    });
  });
});