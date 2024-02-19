import moment from 'moment';
import { UsBankApi } from '../../../../support/api_objects/us_bank/us_bank_api';

describe('us_bank: Payment', function () {
  const usbApi = new UsBankApi();

  it('Create Payment: verify valid payment data creates a payment', () => {
    let paymentPayload = usbApi.payloadGenerator.generateData('515', '2200020541');
    paymentPayload.data.attributes.post_date = moment().endOf('month').format('YYYY-MM-DD');
    paymentPayload.data.attributes.email = 'example_test@demo.com';
  });
});