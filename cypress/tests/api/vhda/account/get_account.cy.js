import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('vhda: GET accounts', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('GET accounts returns 200 with valid jwt', () => {
    vhdaApi.getAccounts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.attributes).to.exist;
    });
  });

  it('GET accounts returns 401 with invalid jwt', () => {
    vhdaApi.getAccounts(faker.finance.accountNumber(300)).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});