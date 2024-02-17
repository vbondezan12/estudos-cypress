import { UsBankApi } from '../../../../support/api_objects/usbank/usbank_api';

describe('US Bank: Pay Account', function () {
  const usbApi = new UsBankApi();
  let queryParameters;

  before(() => {
    queryParameters = {
      'loan_number': usbApi.cypressEnv.loan_number,
      'client_id': usbApi.cypressEnv.client_id
    };
  });

  it('GET pay_accounts: verify type and account_holder_id for each record', () => {
    usbApi.getPayAccounts(queryParameters).then((response) => {
      expect(response.status).to.eq(200);

      const accountsList = response.body.data;
      accountsList.forEach((object) => {
        expect(object.type).to.eq('pay_account');
        expect(object.attributes.account_holder_id).to.eq(3553409);
      });
    });
  });

  it('Get pay_accounts: verify invalid loan has empty data', () => {
    const queryParameters = { 'loan_number': 'invalid', 'client_id': '515' };

    usbApi.getPayAccounts(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('array').that.is.empty;
    });
  });
});