import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('vhda: GetMSPOtherFees', function () {
  const vhdaApi = new VhdaApi();
  let credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get MSP other Fees returns 200 with valid credentials', () => {
    vhdaApi.getMspOtherFees().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.equal(null);
    });
  });

  it('get MSP other Fees returns 401 with invalid credentials', () => {
    vhdaApi.getMspOtherFees(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});