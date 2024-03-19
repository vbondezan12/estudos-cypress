import { LOAN_STATUS } from '../../../../config/constants';
import { VhdaApi } from '../../../../support/api_objects/vhda/vhda_api';

const { faker } = require('@faker-js/faker');

describe('vhda: POST quick_pay', function () {
  const vhdaApi = new VhdaApi();
  let testCredential;

  before(() => {
    const testPayload = vhdaApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    vhdaApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body['test_credentials'][0];
    });
  });

  it('quick_pay returns 201 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      testCredential.last_4_ssn);

    vhdaApi.createQuickPayJwt(payload).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.jwt).to.not.be.null;
      expect(response.body.jwt).to.not.be.empty;
    });
  });

  it('quick_pay returns 201 with valid credentials', () => {
    const payload = vhdaApi.payloadGenerator.quickPay(testCredential.loan_number, testCredential.zip_code,
      faker.number.int());

    vhdaApi.createQuickPayJwt(payload).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.jwt).to.be.undefined;
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