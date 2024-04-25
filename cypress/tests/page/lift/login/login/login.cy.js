import { faker } from '@faker-js/faker';
import { LoginPage } from '../../../../../support/page_objects/lift/login/login_page';
import { MfaPage } from '../../../../../support/page_objects/lift/login/mfa_page';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { CLIENT } from '../../../../../config/constants';
import { LOAN_STATUS } from '../../../../../config/constants';




describe('Lift Login', { tags: [ '@Login', '@regression' ] }, () => {

  const loginPage = new LoginPage();
  const mockLoanServiceApi = new MockLoanServiceApi();
  const mfaPage = new MfaPage();
  let testCredential;

  before(() => {
    mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[1]
    });
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const username = testCredential.username;
    const password = testCredential.password;
    const clientId = CLIENT.VENTANEX;

    loginPage.open()
    loginPage.login(username, password, clientId);
    cy.wait(1000)
    loginPage.getMfaCode(testCredential.email).then((response) => {
      expect(response.status).to.eq(200)
      mfaPage.enterMfaInput(response.body)
      mfaPage.clickMfaConfirmButton()
    });

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const clientId = CLIENT.VENTANEX;

    loginPage.open()
    loginPage.login(username, password, clientId);

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/login`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'User could not be authenticated. Please check your user, password and client code');
  });

  it('should present toast message from invalid Token', { tags: '@smoke' }, function () {
    const username = testCredential.username;
    const password = testCredential.password;
    const clientId = CLIENT.VENTANEX;

    loginPage.open()
    loginPage.login(username, password, clientId);
    mfaPage.enterMfaInput(faker.number.int({min: 100000, max: 999999 }))
    mfaPage.clickMfaConfirmButton()

    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/mfa`);
    mfaPage.mfaToastMessage
      .should('be.visible')
      .should('have.text', 'Invalid Token');
  });

  it('should resend a mfa token and login successfully', { tags: '@smoke' }, function () {
    const username = testCredential.username;
    const password = testCredential.password;
    const clientId = CLIENT.VENTANEX;
    let response1, response2;

    loginPage.open()
    loginPage.login(username, password, clientId);
    cy.wait(500)
    for (let i = 0; i < 2; i++) {
        loginPage.getMfaCode(testCredential.email).then((response) => {          
          if (i === 0){
            response1 = response.body
            mfaPage.clickMfaResendToken()
          } else {
            response2 = response.body
            mfaPage.enterMfaInput(response2)
            mfaPage.clickMfaConfirmButton()
            expect(response1).not.to.equal(response2);
          }
      });      
    }
    cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
  });

})