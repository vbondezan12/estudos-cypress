import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
import { QuickPayLoginPage } from '../../../../support/page_objects/vhda/quick_pay/quick_pay_login_page';

describe('Quickpay Login', { tags: [ '@Login', '@regression' ] }, () => {
  const baseUrl = Cypress.config().vhda.baseUrl;
  let quickPay;
  let testCredential;
  const vhdaApi = new VhdaApi();

  before(() => {
    quickPay = new QuickPayLoginPage();
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[ 0 ];
    });
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, function () {
    const loanNumber = testCredential.loan_number;
    const zipCode = testCredential.zip_code;
    const ssn = testCredential.last_4_ssn;

    quickPay.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
  });

  it('should present toast message from invalid credentials', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1000, max: 9999 });

    quickPay.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    quickPay.toastMessage
      .should('be.visible')
      .should('have.text', 'Invalid loan number, zip, or ssn');
  });

  it('should give error when ssn is not 4 digits', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1, max: 9 });

    quickPay.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    quickPay.ssnErrorMessage
      .should('be.visible')
      .should('have.text', 'Must be 4 characters');
  });

  it('should navigate to Login when Go to Login is clicked', { tags: '@smoke' }, function () {
    const loanNumber = faker.number.int({ min: 1, max: 9 });
    const zipCode = faker.number.int({ min: 1, max: 9 });
    const ssn = faker.number.int({ min: 1, max: 9 });

    quickPay.login(loanNumber, zipCode, ssn);

    cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
    quickPay.goToLoginLink.should('have.text', 'Go to Login');

    quickPay.goToLoginLink.click();
    cy.url().should('contains', `${ baseUrl }/login`);
  });
});