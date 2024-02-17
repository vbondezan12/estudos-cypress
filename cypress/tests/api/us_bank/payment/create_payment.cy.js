import { UsbPaymentPayloadGenerator } from 'cypress/support/payload_generators/usbank/usb_payment_payload_generator';
import moment from 'moment';

describe('us_bank: Payment', function () {
  const usbPayloadGenerator = new UsbPaymentPayloadGenerator();

  it('Create Payment: verify valid payment data creates a payment', () => {
    let paymentPayload = usbPayloadGenerator.generateData('515', '2200020541');
    paymentPayload.data.attributes.post_date = moment().endOf('month').format('YYYY-MM-DD');
    paymentPayload.data.attributes.email = 'example_test@demo.com';
  });
});