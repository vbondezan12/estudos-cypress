import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { OneTimePaymentPage } from '../../../../../support/page_objects/lift/payment/one_time_payment/one_time_payment_page';
import { HomePage } from '../../../../../support/page_objects/lift/home/home_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';
import { MfaPage } from '../../../../../support/page_objects/lift/login/mfa_page';

describe('Lift Payment', { tags: [ '@Home', '@regression' ] }, () => {
  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  const paymentPage = new OneTimePaymentPage();
  const homePage = new HomePage();
  const mfaPage = new MfaPage()

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
      homePage.clickEndtourButton()
      homePage.clickClientSelectionForm()
      homePage.clientSelection(CLIENT.VHDA)
    });
  });

  it('should create a one time payment adding card information successfully', { tags: '@smoke' }, function () {
    paymentPage.openOneTimeDebitPayment()
    paymentPage.inputCustomerReferenceNumber('130369')
    paymentPage.clickCustomerReferenceNumberButton()
    paymentPage.selectCustomerButton()
    paymentPage.inputEffectiveDate()
    paymentPage.inputPaymentAmount()
    // Hard wait needed for payment amount save
    // eslint-disable-next-line
    cy.wait(1000)
    paymentPage.clickNextButton()
    // Hard wait needed to change from one page to the other
    // eslint-disable-next-line
    cy.wait(3000)
    paymentPage.clickPaymentMethod()
    paymentPage.addingNewCard()
    paymentPage.clickFinishButton()
    paymentPage.clickPostThisPaymentButton()


    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/payments/new/onetime_debit`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
    paymentPage.transactionSuccessMessage
      .should('have.text', 'Thank You')
    paymentPage.thankYouTittle
      .should('have.text', 'The information detailed below has been successfully submitted for processing.')

  });

  it.only('should create a one time payment successfully with saved card', { tags: '@smoke' }, function () {
    paymentPage.openOneTimeDebitPayment()
    paymentPage.inputCustomerReferenceNumber('130369')
    paymentPage.clickCustomerReferenceNumberButton()
    paymentPage.selectCustomerButton()
    paymentPage.inputEffectiveDate()
    paymentPage.inputPaymentAmount()
    // Hard wait needed for payment amount save
    // eslint-disable-next-line
    cy.wait(1000)
    paymentPage.clickNextButton()
    // Hard wait needed to change from one page to the other
    // eslint-disable-next-line
    cy.wait(3000)
    paymentPage.selectAvailablePaymentAccount()
    paymentPage.nameOnPaymentAccount
    paymentPage.clickFinishButton()
    paymentPage.clickPostThisPaymentButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/payments/new/onetime_debit`);
    homePage.clientSelectionForm
      .should('contains.text', ' 863 Virginia Housing ')
  });


})