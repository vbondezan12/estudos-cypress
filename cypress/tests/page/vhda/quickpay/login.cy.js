import { LoginPage } from '../../../../support/page_objects/vhda/quick_pay/login_page';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
import { faker } from '@faker-js/faker';

describe('Quickpay Login', { tags: [ '@Login', '@regression' ] }, () => {
  const baseUrl = Cypress.config().vhda.baseUrl;
  let loginPage;
  let testCredential;
  const vhdaApi = new VhdaApi();

  before(() => {
    loginPage = new LoginPage();
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[0];
    });
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const loanNumber = testCredential.loan_number;
    const zipCode = testCredential.zip_code;
    const ssn = testCredential.last_4_ssn;

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1000, max: 9999 });

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.toastMessage
      .should('be.visible')
      .should('have.text', 'Invalid loan number, zip, or ssn');
  });

  it('should give error when ssn is not 4 digits', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1, max: 9 });

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.ssnErrorMessage
      .should('be.visible')
      .should('have.text', 'Must be 4 characters');
  });

  it('should navigate to Login when Go to Login is clicked', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1, max: 9 });

    loginPage.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    loginPage.goToLoginLink.should('have.text', 'Go to Login');

    loginPage.goToLoginLink.click();
    cy.url().should('contains', `${ baseUrl }/login`);
  });
});