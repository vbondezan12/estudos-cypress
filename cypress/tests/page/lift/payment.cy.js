import { LoginPage } from '../../../support/page_objects/lift/login_page';
import { PaymentPage } from '../../../support/page_objects/lift/payment_page';
import { HomePage } from '../../../support/page_objects/lift/home_page';
import { MockLoanServiceApi } from '../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../config/constants';
import { LOAN_STATUS } from '../../../config/constants';

describe('Lift Payment', { tags: [ '@Home', '@regression' ] }, () => {
  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();  
  const paymentPage = new PaymentPage();
  const homePage = new HomePage();

  let testCredential;

  beforeEach(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
      loginPage.open()
      loginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);
      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
      homePage.clickEndtourButton()
      homePage.clickClientSelectionForm()
      homePage.clientSelection(CLIENT.VHDA)
    });
  });

  it('should create a one time payment successfully', { tags: '@smoke' }, function () {
    paymentPage.openOneTimePayment()
    paymentPage.inputCustomerReferenceNumber('130369')
    paymentPage.clickCustomerReferenceNumberButton()
    paymentPage.selectCustomerButton()
    paymentPage.inputPaymentAmount()
    paymentPage.clickNextButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/payments/new/onetime_credit`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')    
  });


})