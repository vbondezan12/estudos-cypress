import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: GetDocuments', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[ 'test_credentials' ][ 0 ];
    });
  });

  it('get documents returns 200 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.getDocuments().then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('get documents returns 401 with invalid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));
    vhdaApi.createQuickPayJwt(payload);

    vhdaApi.getDocuments().then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});