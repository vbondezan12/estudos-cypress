import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';
import { MfaPage } from '../../../../../support/page_objects/lift/login/mfa_page';

describe('Lift Home', { tags: [ '@Home', '@regression' ] }, () => {
  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  const homePage = new HomePage();
  const mfaPage = new MfaPage();

  let testCredential;

  beforeEach(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
      loginPage.open()
      loginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);
      loginPage.getMfaCode(testCredential.email).then((response) => {
        mfaPage.enterMfaInput(response.body)
        mfaPage.clickMfaConfirmButton()
      });
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    });
  });

  it('should select a client successfully', { tags: '@smoke' }, function () {
    homePage.clickEndtourButton()
    homePage.clickClientSelectionForm()
    homePage.clientSelection(CLIENT.VHDA)

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
  });

})