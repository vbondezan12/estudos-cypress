import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('VHDA', function () {
  describe('/bank_accounts', function () {
    const vhdaApi = new VhdaApi();
    let testCredential;

    before(() => {
      vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
        testCredential = response.body[ 0 ];
      });
    });

    xit('Create Bank Account:Verify invalid account_holders gives validation error', () => {
      vhdaApi.createBankAccounts().then((response) => {
        expect(response.status).to.eq(422);
      });
    });

    xit('Create Bank Account:Verify valid account_holders data creates a new loan account_holders', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
        testCredential.last_4_ssn);

      vhdaApi.createQuickPayJwt(payload).then(() => {
        vhdaApi.createBankAccounts().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.id).to.not.equal(null);
        });
      });
    });

    xit('Create Bank Account:Verify invalid tokens gives Authentication error', () => {
      const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
        faker.number.int(5), faker.number.int(4));
      vhdaApi.createQuickPayJwt(payload).then(() => {

        vhdaApi.createBankAccounts().then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});