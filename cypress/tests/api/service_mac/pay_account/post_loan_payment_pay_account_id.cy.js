import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

const moment = require('moment');

xdescribe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();

  // this scenario can fail if faker creates the same amounts
  it('Post Loan Payment with Account [200]: post valid Payment', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('paymentId');
    payload.data.id = serviceMacApi.cypressEnv.account;
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;

    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.attributes.transaction_date).to.eq(moment().format('YYYY-MM-DD'));
      expect(response.body.data.relationships.pay_account.data.id).to.eq(serviceMacApi.cypressEnv.account_id);
    });
  });

  it('Post Loan Payment with Account [422]: post invalid Payment', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('paymentId');
    payload.data.id = serviceMacApi.cypressEnv.account;
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    payload.data.attributes.late_fees_paid = faker.number.int({ min: 10000000000, max: 99999999999 }).toString();

    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.late_fees).to.be.an('array');
      expect(response.body.errors.late_fees).to.deep.include('cannot be paid because none are owed.');
    });
  });

  // this scenario can fail if faker creates the same amounts
  it('Post Loan Payment with Account [422]: post duplicated payment', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('paymentId');
    payload.data.id = serviceMacApi.cypressEnv.account;
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;

    const MAX_ATTEMPTS = 2;

    for (let numberOfExecutions = 0; numberOfExecutions < MAX_ATTEMPTS; numberOfExecutions++) {
      serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
        // First call needs to pass for the validation works on the second call as duplicated request
        if (numberOfExecutions !== 0) {
          expect(response.status).to.eq(422);
          expect(response.body.errors.duplicate_payment[0])
            .to
            .eq(
              'has been detected. The payment dates already have a payment scheduled for this customer, for the same amount and using the same account for this payment.');
        }
      });
    }
  });

  it('Post Loan Payment with Account [422]: invalid total_amount_due', () => {
    let payload = serviceMacApi.payloadGenerator.generateData('paymentId');
    payload.data.id = serviceMacApi.cypressEnv.account;
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    const totalAmount = payload.data.attributes.total_amount_due;
    delete payload.data.attributes.total_amount_due;

    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.total_amount_due[0]).to.eq(`does not add up! Should be $${ totalAmount }.00.`);
    });
  });
});