import { faker } from '@faker-js/faker';
import { CLIENT, LOAN_STATUS } from '../../../../config/constants';
import { VhdaLoginPage } from '../../../../support/page_objects/vhda/login/vhda_login_page';

describe('VHDA', () => {
  describe('Login', () => {
    let loginPage = new VhdaLoginPage();
    let testCredential;

    before(() => {
      loginPage.getTestLoans(CLIENT.VHDA, LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 2 ];
      });
    });

    it('VEN-15594_vhda_login_with_invalid_credentials', { tags: '@smoke' }, function () {
      const username = faker.internet.userName(); // generate fake value for userName
      const password = faker.internet.password(); // generate fake value for password

      loginPage.open();
      loginPage.enterUserName(username);
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();

      // Necessary to wait to MFA code generation
      // eslint-disable-next-line
      cy.wait(2000);

      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/login`);
      loginPage.toastMessage
        .should('be.visible')
        .should('have.text', 'Invalid username and/or password');
    });

    it('VEN-15594_vhda_login_with_invalid_mfa', { tags: '@smoke' }, function () {
      const userName = testCredential.username;
      const password = testCredential.password;
      const fakeMfaCode = faker.internet.password();

      loginPage.open();
      loginPage.enterUserName(userName);
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();
      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

      loginPage.enterMFACode(fakeMfaCode);
      loginPage.clickAuthenticateButton();

      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);
      loginPage.toastMessage
        .should('be.visible')
        .should('have.text', 'token: is not correct. Please try again.');
    });

    it('VEN-15594_vhda_login_with_valid_mfa', { tags: '@smoke' }, function () {
      const userName = testCredential.username;
      const password = testCredential.password;
      const email = testCredential.email;

      loginPage.open();
      loginPage.enterUserName(userName);
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();
      cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/multifactor/new`);

      // time necessary to wait the endpoint (API) update the mfa code, then the code can take the updated mfa code
      // eslint-disable-next-line
      cy.wait(2000);

      loginPage.getLastMfaCode(email).then((response) => {
        expect(response.status).to.eq(200);

        loginPage.enterMFACode(response.body);
        loginPage.clickAuthenticateButton();

        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }`);
      });
    });
  });
});