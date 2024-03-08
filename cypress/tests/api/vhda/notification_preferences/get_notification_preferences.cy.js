import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GetNotificationPreferences', function () {
  const vhdaApi = new VhdaApi();
  let credentials = vhdaApi.payloadGenerator.quickPay(
    vhdaApi.cypressEnv.loan_number,
    vhdaApi.cypressEnv.zip,
    vhdaApi.cypressEnv.ssn
  );

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get notification preferences returns 200 with valid credentials', () => {
    vhdaApi.getNotificationPreferences().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('get notification preferences returns 401 with invalid credentials', () => {
    vhdaApi.getNotificationPreferences(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});