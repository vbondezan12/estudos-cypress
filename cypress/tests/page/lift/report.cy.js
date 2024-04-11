import { LoginPage } from '../../../support/page_objects/lift/login_page';
import { HomePage } from '../../../support/page_objects/lift/home_page';
import { ReportsPage } from '../../../support/page_objects/lift/reports_page';
import { MockLoanServiceApi } from '../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../config/constants';
import { LOAN_STATUS } from '../../../config/constants';

describe('Lift Home', { tags: [ '@Home', '@regression' ] }, () => {
    const loginPage = new LoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    const homePage = new HomePage();
    const reportsPage = new ReportsPage();
  
    let testCredential;
  
    beforeEach(() => {
      mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[1]
        loginPage.open()
        loginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);
        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
      });
    });

    it('should go the listing option on the side menu and search', { tags: '@smoke' }, function () {
        homePage.clickEndtourButton()
        homePage.clientSelectionForm()
        homePage.clientSelection(CLIENT.VHDA)
        reportsPage.openReports()
        reportsPage.setListingStartDate()
        reportsPage.clickSearchButton()
        
    
        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ')    
      });
})
  