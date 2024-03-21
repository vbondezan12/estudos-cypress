import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GetMSPOtherFees', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[ 'test_credentials' ][ 0 ];
    });
  });

  it('get MSP other Fees returns 200 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);
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