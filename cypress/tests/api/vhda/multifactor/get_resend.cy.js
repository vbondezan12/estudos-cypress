import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GET resend', function () {
  const vhdaApi = new VhdaApi();
  const credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('resend returns 200 with valid credentials', () => {
    vhdaApi.resendMultifactor().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('resend returns 401 with invalid credentials', () => {
    vhdaApi.resendMultifactor(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});