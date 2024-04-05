import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('vhda: Create Loan', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[0];
    });
  });

  xit('Create Loan:Verify valid loan data creates a new loan', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);

    const loanRequest = vhdaApi.payloadGenerator.newLoan(testCredential.loan_number, testCredential.zip,
      testCredential.last_4_ssn);

    vhdaApi.newLoan(loanRequest).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.not.equal(null);
    });
  });

  it('Create Loan:Verify invalid token gives Authentication error', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(payload);

    const loanRequest = vhdaApi.payloadGenerator.newLoan(testCredential.loan_number, testCredential.zip,
      testCredential.last_4_ssn);

    vhdaApi.newLoan(loanRequest).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});