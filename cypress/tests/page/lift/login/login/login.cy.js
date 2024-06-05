import { faker } from '@faker-js/faker';
import { CLIENT, LOAN_STATUS } from '../../../../../config/constants';
import { MockLoanServiceApi } from '../../../../../support/api_objects/mock_loan_service/mock_loan_service_api';
import { LiftLoginPage } from '../../../../../support/page_objects/lift/login/lift_login_page';
import { LiftMfaPage } from '../../../../../support/page_objects/lift/login/lift_mfa_page';

describe('Lift', () => {
  describe('Login', () => {
    const loginPage = new LiftLoginPage();
    const mockLoanServiceApi = new MockLoanServiceApi();
    const mfaPage = new LiftMfaPage();
    let testCredential;

    before(() => {
      mockLoanServiceApi.getTestLoans(CLIENT.VENTANEX, LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 1 ];
      });
    });

    it('VEN-15594_lift_login_with_valid_credentials', { tags: '@smoke' }, function () {
      const username = testCredential.username;
      const password = testCredential.password;
      const clientId = CLIENT.VENTANEX;

      loginPage.open();
      loginPage.login(username, password, clientId);
      loginPage.getMfaCode(testCredential.email).then((response) => {
        expect(response.status).to.eq(200);
        mfaPage.enterMfaInput(response.body);
        mfaPage.clickMfaConfirmButton();
      });

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    });

    it('VEN-15594_lift_login_with_invalid_credentials', { tags: '@smoke' }, function () {
      const username = faker.internet.userName();
      const password = faker.internet.password();
      const clientId = CLIENT.VENTANEX;

      loginPage.open();
      loginPage.login(username, password, clientId);

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/login`);
      loginPage.toastMessage
        .should('be.visible')
        .should('have.text', 'User could not be authenticated. Please check your user, password and client code');
    });

    it('VEN-15594_lift_login_with_invalid_mfa', { tags: '@smoke' }, function () {
      const username = testCredential.username;
      const password = testCredential.password;
      const clientId = CLIENT.VENTANEX;

      loginPage.open();
      loginPage.login(username, password, clientId);
      mfaPage.enterMfaInput(faker.number.int({ min: 100000, max: 999999 }));
      mfaPage.clickMfaConfirmButton();

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/sessions/mfa`);
      mfaPage.mfaToastMessage
        .should('be.visible')
        .should('have.text', 'Invalid Token');
    });

    // TODO: should be split into two test cases - one for resend, one for valid MFA
    it('VEN-15594_lift_login_with_valid_mfa', { tags: '@smoke' }, function () {
      const username = testCredential.username;
      const password = testCredential.password;
      const clientId = CLIENT.VENTANEX;
      let response1, response2;

      loginPage.open();
      loginPage.login(username, password, clientId);
      for (let i = 0; i < 2; i++) {
        loginPage.getMfaCode(testCredential.email).then((response) => {
          if (i === 0) {
            response1 = response.body;
            mfaPage.clickMfaResendToken();
          } else {
            response2 = response.body;
            mfaPage.enterMfaInput(response2);
            mfaPage.clickMfaConfirmButton();
            expect(response1).not.to.equal(response2);
          }
        });
      }

      cy.url().should('contains', `${ Cypress.config().lift.baseUrl }/home`);
    });
  });
});