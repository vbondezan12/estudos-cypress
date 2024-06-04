import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

const { faker } = require('@faker-js/faker');

// TODO: Must create US Bank sub-clients and seed them
describe('US Bank', function () {
  describe('/accounts', function () {
    const usBankApi = new UsBankApi();
    let testCredential;

    xit('GET accounts: returns 200 when valid loan_number and client_id', () => {
      const payload = usBankApi.payloadGenerator.generateGetAccountsPayload(testCredential.loan_number);

      usBankApi.getAccounts(payload).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    xit('GET accounts: returns 401 when invalid loan_number and client_id', () => {
      const payload = usBankApi.payloadGenerator.generateGetAccountsPayload(faker.finance.accountNumber(7));

      usBankApi.getAccounts(payload).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq('Invalid Account Number or Product Id. Please validate and resubmit');
      });
    });
  });
});