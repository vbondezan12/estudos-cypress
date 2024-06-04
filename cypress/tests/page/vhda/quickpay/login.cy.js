import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
import { QuickPayLoginPage } from '../../../../support/page_objects/vhda/quick_pay/quick_pay_login_page';

describe('VHDA', () => {
  describe('Quickpay', () => {
    describe('Login', () => {
      const baseUrl = Cypress.config().vhda.baseUrl;
      const vhdaApi = new VhdaApi();
      let quickPay;
      let testCredential;

      before(() => {
        quickPay = new QuickPayLoginPage();
        const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
        vhdaApi.getTestLoans(testPayload).then((response) => {
          testCredential = response.body[ 0 ];
        });
      });

      it('VEN-15594_vhda_quickpay_login_with_valid_credentials', { tags: '@smoke' }, function () {
        const loanNumber = testCredential.loan_number;
        const zipCode = testCredential.zip_code;
        const ssn = testCredential.last_4_ssn;

        quickPay.login(loanNumber, zipCode, ssn);

        cy.url().should('contains', `${ Cypress.config().vhda.baseUrl }/payments/new`);
      });

      it('VEN-15594_vhda_quickpay_login_with_invalid_credentials', { tags: '@smoke' }, function () {
        const loanNumber = faker.number.int({ min: 1, max: 9 });
        const zipCode = faker.number.int({ min: 1, max: 9 });
        const ssn = faker.number.int({ min: 1000, max: 9999 });

        quickPay.login(loanNumber, zipCode, ssn);

        cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
        quickPay.toastMessage
          .should('be.visible')
          .should('have.text', 'Invalid loan number, zip, or ssn');
      });

      it('VEN-15594_vhda_quickpay_login_with_valid_ssn_length', { tags: '@smoke' }, function () {
        const loanNumber = faker.number.int({ min: 1, max: 9 });
        const zipCode = faker.number.int({ min: 1, max: 9 });
        const ssn = faker.number.int({ min: 1, max: 9 });

        quickPay.login(loanNumber, zipCode, ssn);

        cy.url().should('contains', `${ baseUrl }/quick_pay/new`);
        quickPay.ssnErrorMessage
          .should('be.visible')
          .should('have.text', 'Must be 4 characters');
      });

      it('VEN-15594_vhda_quickpay_login_should_redirect_to_home_login_when_go_to_login_link_is_clicked',
        { tags: '@smoke' }, function () {
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
  });
});