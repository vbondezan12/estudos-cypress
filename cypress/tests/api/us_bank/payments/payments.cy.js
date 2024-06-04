import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

describe('US Bank', function () {
  describe('/payments', function () {
    const usbApi = new UsBankApi();

    it('VEN-15594_us_bank_get_payments_with_valid_loan', () => {
      const queryParameters = { 'loan_number': '10916454', 'client_id': '515' };

      usbApi.getPayments(queryParameters).then((response) => {
        expect(response.status).to.eq(200);

        response.body.data.forEach((account) => {
          expect(account.type).to.eq('payment');
          expect(account.id).to.eq(String(account.attributes.tracking));
        });
      });
    });

    it('VEN-15594_us_bank_get_payments_with_invalid_loan', () => {
      const queryParameters = { 'loan_number': 'invalid', 'client_id': '515' };

      usbApi.getPayments(queryParameters).then((response) => {
        expect(response.body.data.length).to.eq(0);
      });
    });
  });
});