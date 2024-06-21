import { CLIENT, LOAN_STATUS } from '../config/constants';
import { LiftLoginPage } from './page_objects/lift/login/lift_login_page';
import { LiftMfaPage } from './page_objects/lift/login/lift_mfa_page';
import { VhdaLoginPage } from './page_objects/vhda/login/vhda_login_page';
import { QuickPayLoginPage } from './page_objects/vhda/quick_pay/quick_pay_login_page';
import { HomePage } from './page_objects/lift/home/home_page';

const vhdaLoginPage = new VhdaLoginPage();
const quickPayLoginPage = new QuickPayLoginPage();
const liftLoginPage = new LiftLoginPage();
const liftMfaPage = new LiftMfaPage();
const homePage = new HomePage()

Cypress.Commands.add('vhdaLogin', () => {
  cy.session('vhda_login', () => {
    vhdaLoginPage.getTestLoans(CLIENT.VHDA, LOAN_STATUS.CURRENT).then((response) => {
      const testCredential = response.body[2];

      vhdaLoginPage.open();

      vhdaLoginPage.enterUserName(testCredential.username);
      vhdaLoginPage.enterPassword(testCredential.password);
      vhdaLoginPage.clickLoginButton();

      vhdaLoginPage.getLastMfaCode(testCredential.email).then((mfaResponse) => {
        expect(mfaResponse.status).to.eq(200);
        vhdaLoginPage.enterMFACode(mfaResponse.body);
        vhdaLoginPage.clickAuthenticateButton();
      });
    });
  });
});

Cypress.Commands.add('vhdaQuickpayLogin', () => {
  cy.session('vhda_quickpay_login', () => {
    quickPayLoginPage.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      const testCredential = response.body[0];

      quickPayLoginPage.login(testCredential.loan_number, testCredential.zip_code, testCredential.last_4_ssn);

      cy.url().should('contains', `${Cypress.config().vhda.baseUrl}/payments/new`);
    });
  });
});

Cypress.Commands.add('liftLogin', (client) => {
  cy.session('lift_login', () => {
    liftLoginPage.getTestLoans(client, LOAN_STATUS.CURRENT).then((response) => {
      const testCredential = response.body[1];

      liftLoginPage.open();
      liftLoginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);

      liftLoginPage.getMfaCode(testCredential.email).then((response) => {
        liftMfaPage.enterMfaInput(response.body);
        liftMfaPage.clickMfaConfirmButton();
      });

      cy.url().should('contains', `${Cypress.config().lift.baseUrl}/home`);
    });
  });
});

Cypress.Commands.add('liftLoginClientSelection', (clientLogin, clientSelection) => {
  cy.session('lift_login_client_selection', () => {
    liftLoginPage.getTestLoans(clientLogin, LOAN_STATUS.CURRENT).then((response) => {
      const testCredential = response.body[1];

      liftLoginPage.open();
      liftLoginPage.login(testCredential.username, testCredential.password, CLIENT.VENTANEX);

      liftLoginPage.getMfaCode(testCredential.email).then((response) => {
        liftMfaPage.enterMfaInput(response.body);
        liftMfaPage.clickMfaConfirmButton();
      });
      homePage.clickEndtourButton();
      homePage.clickClientSelectionForm();
      homePage.clientSelection(clientSelection);

    });
  });
});