import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: POST quick_pay', function () {
  const vhdaApi = new VhdaApi();
  let test_credential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      test_credential = response.body['test_credentials'][0];
    });
  });

  it('quick_pay returns 201 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(test_credential.loan_number, test_credential.zip_code,
      test_credential.last_4_ssn);

    vhdaApi.createQuickPayJwt(payload).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.jwt).to.not.be.null;
      expect(response.body.jwt).to.not.be.empty;
    });
  });

  it('quick_pay returns 200 when random account number', () => {
    const credentials = vhdaApi.payloadGenerator.quickPay(faker.finance.accountNumber(8),
      faker.number.int(5), faker.number.int(4));

    vhdaApi.createQuickPayJwt(credentials).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.jwt).to.be.undefined;
    });
  });
});