import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';
import { LOAN_STATUS } from '../../../../config/constants';

const { faker } = require('@faker-js/faker');

describe('vhda: GetMSPOtherFees', function () {
  const vhdaApi = new VhdaApi();
  let Test_Credential;
  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      Test_Credential = response.body['test_credentials'][0];
    });
  });

  it('get MSP other Fees returns 200 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(Test_Credential.loan_number, Test_Credential.zip_code,
      Test_Credential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);
    vhdaApi.getMspOtherFees().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.equal(null);
    });
  });

  it('get MSP other Fees returns 401 with invalid credentials', () => {
    const Credentials = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(Credentials);
    vhdaApi.getMspOtherFees().then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});