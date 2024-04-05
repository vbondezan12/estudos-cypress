import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GET accounts', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    vhdaApi.getTestLoans(LOAN_STATUS.CURRENT).then((response) => {
      testCredential = response.body[0];
    });
  });

  it('GET accounts returns 200 with valid jwt', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.getAccounts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.attributes).to.exist;
    });
  });

  it('GET accounts returns 401 with invalid jwt', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.getAccounts().then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});