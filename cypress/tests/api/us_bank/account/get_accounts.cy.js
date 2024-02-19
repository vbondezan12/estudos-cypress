import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

const { faker } = require('@faker-js/faker');

describe('US Bank: Accounts', function () {
  const usbApi = new UsBankApi();
  let queryParameters;

  before(() => {
    queryParameters = {
      'loan_number': usbApi.cypressEnv.loan_number,
      'client_id': usbApi.cypressEnv.client_id
    };
  });

  it('GET accounts: returns 200 when valid loan_number and client_id', () => {
    usbApi.getAccounts(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('GET accounts: returns 401 when invalid loan_number and client_id', () => {
    queryParameters = { 'loan_number': faker.finance.accountNumber(7), 'client_id': faker.company.name() };

    usbApi.getAccounts(queryParameters).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq('Invalid Account Number or Product Id. Please validate and resubmit');
    });
  });
});