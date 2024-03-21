import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

describe('vhda: Create Bank Account', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[ 'test_credentials' ][ 0 ];
    });
  });

  xit('Create Bank Account:Verify invalid account gives validation error', () => {
    vhdaApi.createBankAccounts().then((response) => {
      expect(response.status).to.eq(422);
    });
  });

  xit('Create Bank Account:Verify valid account data creates a new loan account', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.createBankAccounts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.not.equal(null);
    });
  });

  xit('Create Bank Account:Verify invalid token gives Authentication error', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.createBankAccounts().then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});