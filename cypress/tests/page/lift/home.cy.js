import { LoginPage } from '../../../support/page_objects/lift/login_page';
import { HomePage } from '../../../support/page_objects/lift/home_page';
import { MockLoanServiceApi } from '../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../config/constants';
import { LOAN_STATUS } from '../../../config/constants';

describe('Lift Home', { tags: [ '@Home', '@regression' ] }, () => {
  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  const homePage = new HomePage();

  let testCredential;

  beforeEach(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
      loginPage.open()
      loginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    });
  });

  it('should select a client successfully', { tags: '@smoke' }, function () {
    homePage.clickEndtourButton()
    homePage.clickClientSelection()
    homePage.clickClientSelectionVhda()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    homePage.clientSelection
      .should('contains.text', ' 863 Virginia Housing ')
  });

  it('should go the listing option on the side menu and search', { tags: '@smoke' }, function () {
    homePage.clickEndtourButton()
    homePage.clickClientSelection()
    homePage.clickClientSelectionVhda()
    homePage.openReports()
    homePage.setListingStartDate()
    homePage.clickSearchButton()
    

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/reports/transaction_listing`);
    homePage.clientSelection
      .should('contains.text', ' 863 Virginia Housing ')    
  });

})