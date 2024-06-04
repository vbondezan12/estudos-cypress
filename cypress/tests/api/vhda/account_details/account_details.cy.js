import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('VHDA', function () {
  describe('/account_details', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    xit('VEN-15594_vhda_create_account_details_with_valid_loan', () => {
      const validLoan = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      const invalidLoad = vhdaApi.payloadGenerator.newLoan(testCredential.loan_number, testCredential.zip,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(validLoan).then(() => {
        vhdaApi.createAccountDetails(invalidLoad).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.id).to.not.equal(null);
        });
      });
    });

    it('VEN-15594_vhda_create_account_details_with_invalid_loan', () => {
      const validLoan = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.finance.accountNumber(5), faker.finance.accountNumber(4));

      vhdaApi.createQuickPayJwt(validLoan).then(() => {
        vhdaApi.createAccountDetails(payload).then((response) => {
          expect(response.status).to.eq(422);
        });
      });
    });

    it('VEN-15594_vhda_get_account_details_with_valid_loan', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      const loanNumber = vhdaApi.payloadGenerator.switchLoan(testCredential.loan_number);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.switchLoan(loanNumber).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.not.equal(null);
          cy.log(response.body);
        });
      });
    });

    it('VEN-15594_vhda_get_account_details_with_invalid_loan', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));

      const loanNumber = vhdaApi.payloadGenerator.switchLoan(testCredential.loan_number);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.switchLoan(loanNumber).then((response) => {
          cy.log(response.body);
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});