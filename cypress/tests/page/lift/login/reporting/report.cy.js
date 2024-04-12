import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { TransactionListing } from '../../../../../support/page_objects/lift/reporting/transaction/listing_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';

describe('Lift Home', { tags: [ '@Home', '@regression' ] }, () => {
    const loginPage = new LoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    const homePage = new HomePage();
    const transactionListing = new TransactionListing();
  
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
        homePage.clickClientSelectionForm()
        homePage.clientSelection(CLIENT.VHDA)
        transactionListing.openReportsListing()
        transactionListing.setListingStartDate()
        transactionListing.clickSearchButton()        
    
        cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
        homePage.clientSelectionForm
          .should('contains.text', ' 863 Virginia Housing ')    
          transactionListing.transactionListed
          .should('not.be.empty')
          .should('be.visible')
      });
})
  