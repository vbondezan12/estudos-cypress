import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('vhda: GetEscrowShortage', function () {
  const vhdaApi = new VhdaApi();
  let credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get escrow shortage returns 200 with valid credentials', () => {
    vhdaApi.getEscrowShortage().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.equal(null);
    });
  });

  it('get escrow shortage returns 401 with invalid credentials', () => {
    vhdaApi.getEscrowShortage(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.not.equal(null);
    });
  });
});