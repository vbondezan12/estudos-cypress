import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

describe('US Bank', function () {
  describe('/pay_accounts', function () {
    const usbApi = new UsBankApi();
    let queryParameters;

    xit('GET pay_accounts: verify type and account_holder_id for each record', () => {
      usbApi.getPayAccounts(queryParameters).then((response) => {
        expect(response.status).to.eq(200);

        const accountsList = response.body.data;
        accountsList.forEach((object) => {
          expect(object.type).to.eq('pay_account');
          expect(object.attributes.account_holder_id).to.eq(3553409);
        });
      });
    });

    it('VEN-15594_us_bank_get_pay_accounts_with_invalid_loan', () => {
      const queryParameters = { 'loan_number': 'invalid', 'client_id': '515' };

      usbApi.getPayAccounts(queryParameters).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array').that.is.empty;
      });
    });
  });
});