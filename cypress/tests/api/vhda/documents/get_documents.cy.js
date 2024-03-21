import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
import { LOAN_STATUS } from '../../../../config/constants';

const { faker } = require('@faker-js/faker');

describe('vhda: GetDocuments', function () {
  const vhdaApi = new VhdaApi();
  let Test_Credential;
  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      Test_Credential = response.body['test_credentials'][0];
    });
  });

  it('get documents returns 200 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(Test_Credential.loan_number, Test_Credential.zip_code,
      Test_Credential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);
    vhdaApi.getDocuments().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('get documents returns 401 with invalid credentials', () => {
    const Credentials = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(Credentials);
    vhdaApi.getDocuments().then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});