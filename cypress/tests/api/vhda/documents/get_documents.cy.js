import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';

const { faker } = require('@faker-js/faker');

describe('vhda: GetDocuments', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(vhdaApi.cypressEnv.loan_number, vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn);

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get documents returns 200 with valid credentials', () => {
    vhdaApi.getDocuments().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('get documents returns 401 with invalid credentials', () => {
    vhdaApi.getDocuments(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});