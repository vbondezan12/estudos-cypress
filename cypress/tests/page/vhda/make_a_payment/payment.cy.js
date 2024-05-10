import { faker } from '@faker-js/faker';
import { MakePayment } from '../../../../support/page_objects/vhda/make_a_payment/payment';
import { LoginPage } from '../../../../support/page_objects/vhda/login/login_page';
import { CLIENT } from '../../../../config/constants';
import { MockLoanServiceApi } from '../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LOAN_STATUS } from '../../../../config/constants';


describe('Login Tests', { tags: [ '@Login', '@regression' ] }, () => {

  // Variables for Login process
  let loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  let testCredential;
  let mfaCode;

  // Variables for payment process
  let makePayment = new MakePayment();
  // const loanNumber = "053200983";

  // Method to get the credentials of login in API (endpoint 'Test Credential/Lookup')
  beforeEach(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VHDA, LOAN_STATUS.CURRENT).then((response) => { // The method getTestLoans run the endpoint and receive/save the value of the endpoint's response.
      testCredential = response.body[2] // the variable 'testCredential' save the position two of the response (result). This list contem differents json files with datas related with credetials created to login in VHDA webpay qa app.

      // LOGIN//
      loginPage.openPage();

      // Variables used to do a login in VHDA webpay of qa enviroment
      const userName = testCredential.username; // the variable userName save the value associate with username field of the second json that we have inside the testCredential list. List that is a response of getTestLoans
      const password = testCredential.password; // the variable password save the value associate with password field of the json, that is a response of get request in API
      const email = testCredential.email

      // Methods to enter the values in fields and click the button
      loginPage.enterUserName(userName);
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();

      // ---MFA---//
      // eslint-disable-next-line
      cy.wait(2000) // time necessary to wait the endpoint (API) update the mfa code, then the code can take the updated mfa code
      // Bellow code get MFA code from API, that is, endpoint 'Test Credential/VHDA Last MFA Token'
      mockLoanServiceApi.getLastMfaCode(CLIENT.VHDA, email).then((response) => { // the method getMfaCode make a request using the payloadMfa (json)
        mfaCode = response.body // the variable 'mfaCode' save the response/result of above request. this .body is the body of response not of request.
        expect(response.status).to.eq(200); // this line verify if the answer of request (get) is equal to 200, that is, if the endpoint did work.
        // Test execution
        loginPage.enterMFACode(mfaCode);
        loginPage.clickAuthenticateButton();
        // Test validation

      });
      // cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }`);
    });
  })

  it('Make a Payment', { tags: '@smoke' }, function () {

    const name = faker.person.fullName();
    const nickName = faker.person.firstName();
    let routingNumber = '053200983';
    let accountNumber = '11101010';

    // call methods that execute actions
    makePayment.openPage();
    makePayment.clickNewPayAccountButton();
    // eslint-disable-next-line
    cy.wait(1000); // it's necesary for system can type the full routing number in the field.
    makePayment.enterRoutingNumber(routingNumber);
    makePayment.enterAccountNumber(accountNumber);
    makePayment.enterName(name);
    makePayment.enterNickName(nickName);
    makePayment.clickAddButton();
  })

})



