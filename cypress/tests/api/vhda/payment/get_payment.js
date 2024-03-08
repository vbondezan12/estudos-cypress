import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GET payment', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get Payment returns 200 with valid credentials', () => {
    vhdaApi.getPayments().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.not.equal(null);
    });
  });

  it('get Payment preferences returns 401 with invalid credentials', () => {
    vhdaApi.getPayments(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});