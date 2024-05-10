import { faker } from '@faker-js/faker';
import { CLIENT, LOAN_STATUS } from '../../../../config/constants';
import { MockLoanServiceApi } from '../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LoginPage } from '../../../../support/page_objects/vhda/login/login_page';

describe('Login Tests', { tags: [ '@Login', '@regression' ] }, () => {
  // Variables
  let loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  let testCredential;
  let mfaCode;

  // Method to get the credentials of login in API (endpoint 'Test Credential/Lookup')
  before(() => {
    // const testPayload = mockLoanServiceApi.payloadGenerator.generateTestCredentialsLookupPayload(CLIENT.VHDA, LOAN_STATUS.CURRENT) // variable testPayload save the request body of endpoint 'Test Credential/lookup', that is, the json with the data necessary to make a request of mentioned endpoint.
    mockLoanServiceApi.getTestLoans(CLIENT.VHDA, LOAN_STATUS.CURRENT).then((response) => { // method getTestLoans receive the payload (json with data necessary to make a get call), and with this payload (json) the method execute (run) a request that return a list with userS created by endpoint 'Test Credential/Create'.
      testCredential = response.body[ 2 ]; // the variable 'testCredential' save the position two of the response (result) list of the request made in the above code line. This list contem differents json files with datas related with credetials created to login in VHDA webpay qa app.
      cy.log(testCredential); // only to print the variable
      cy.log(JSON.stringify(testCredential)); // only to print the variable
    });
  });

  // //// Unhappy Path 1 ///////

  it('Login with invalid credentials (Unhappy Path)', { tags: '@smoke' }, function () {
    let username = faker.internet.userName(); // generate fake value for userName
    let password = faker.internet.password(); // generate fake value for password

    // Test execution
    loginPage.openPage();
    loginPage.enterUserName(username);
    loginPage.enterPassword(password);
    loginPage.clickLoginButton();
    // Necessary to wait to MFA code generation
    // eslint-disable-next-line
    cy.wait(2000);

    // Test validation
    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/login`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'Invalid username and/or password');
  });

  // /// Unhappy Path 2 /////

  it('Login with valid credentials and Invalid MFA (Unhappy Path)', { tags: '@smoke' }, function () { // Name of the test case

    // ---------------- Login Page-----------------------

    // Variables used to do a login in VHDA webpay of qa enviroment
    const userName = testCredential.username; // the variable userName save the value associate with username field of the second json that we have inside the testCredential list. List that is a response of getTestLoans
    const password = testCredential.password; // the variable password save the value associate with password field of the json, that is a response of get request in API
    // const email = testCredential.email // the variable password save the value associate with password field of the json, that is a response of get request in API

    // Test execution. Methods to execute the tasks in the page are called here
    loginPage.openPage();
    loginPage.enterUserName(userName);
    loginPage.enterPassword(password);
    loginPage.clickLoginButton();
    // Test validation. Here we validate if the next page after click in Login button contem the follow link
    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);
    // cy.wait(2000)

    // ---------------- MFA Page-----------------------

    // variable to use in the execution of tests
    let fakeMfaCode = faker.internet.password(); // generate fake value for mfa

    // Test execution
    loginPage.enterMFACode(fakeMfaCode);
    loginPage.clickAuthenticateButton();

    // Test validation
    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'token: is not correct. Please try again.');
    // cy.wait(2000)
  });

  // /// Happy Path 1 /////
  it('Login with valid credentials and Valid MFA (Happy Path)', { tags: '@smoke' }, function () { // Name of the test case

    // ---------------- Login Page-----------------------

    // Variables used to do a login in VHDA webpay of qa enviroment
    const userName = testCredential.username; // the variable userName save the value associate with username field of the second json that we have inside the testCredential list. List that is a response of getTestLoans
    const password = testCredential.password; // the variable password save the value associate with password field of the json, that is a response of get request in API
    const email = testCredential.email; // the variable password save the value associate with password field of the json, that is a response of get request in API

    // Test execution. Methods to execute the tasks in the page are called here
    loginPage.openPage();
    loginPage.enterUserName(userName);
    loginPage.enterPassword(password);
    loginPage.clickLoginButton();
    // Test validation. Here we validate if the next page after click in Login button contem the follow link
    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

    // ---------------- MFA Page-----------------------

    // time necessary to wait the endpoint (API) update the mfa code, then the code can take the updated mfa code
    // eslint-disable-next-line
    cy.wait(2000);

    // Bellow code get MFA code from API, that is, endpoint 'Test Credential/VHDA Last MFA Token'
    // const payloadMfa = mockLoanServiceApi.payloadGenerator.generateMFAPayload(email) // The method 'generateMFAPayload' create a payload (json file) with the email (used to do a login in webpay) that there is inside of json file, that is saved in testCredential variable. This json make parte of a list of jsons returned by Test Credential/Lookup endpoint in API.
    mockLoanServiceApi.getLastMfaCode(CLIENT.VHDA, email).then((response) => { // the method getMfaCode make a request using the payloadMfa (json)
      // variable to use in the execution of tests
      mfaCode = response.body; // the variable 'mfaCode' save the response/result of above request. this .body is the body of response not of request.
      expect(response.status).to.eq(200); // this line verify if the answer of request (get) is equal to 200, that is, if the endpoint did work.
      cy.log(mfaCode);// only to verify the variable value

      // Test execution
      loginPage.enterMFACode(mfaCode);
      loginPage.clickAuthenticateButton();

      // Test validation
      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }`);
    });

  });

});






