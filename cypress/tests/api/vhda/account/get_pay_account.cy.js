import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
const { faker } = require('@faker-js/faker');

describe('vhda: GetPayAccount', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip, vhdaApi.cypressEnv.ssn);

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get pay account returns 200 with valid credentials', () => {
    vhdaApi.getPayAccounts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.type).to.not.equal(null);
    });
  });

  it('get pay account returns 401 with invalid credentials', () => {
    vhdaApi.getPayAccounts(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});