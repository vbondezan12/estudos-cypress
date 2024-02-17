import { faker } from '@faker-js/faker';
import { ServiceMacApi } from 'cypress/support/api_objects/servicemac/servicemac_api';
import { ServiceMacLoanPaymentPayAccountId } from 'cypress/support/payload_generators/service_mac/service_mac_loan_payment_pay_account_id';

const moment = require('moment');

describe('API Tests: SERVICE_MAC', function () {
  const serviceMacApi = new ServiceMacApi();
  const serviceMacPayloadGenerator = new ServiceMacLoanPaymentPayAccountId();

  it('Post Loan Payment with Account [200]: post valid Payment', () => {
    // this scenario can fail if faker creates the same amounts

    let payload = serviceMacPayloadGenerator.generateData();
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    cy.log(JSON.stringify(payload));

    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.attributes.transaction_date).to.eq(moment().format('YYYY-MM-DD'));
      expect(response.body.data.relationships.pay_account.data.id).to.eq(serviceMacApi.cypressEnv.account_id);
    });
  });

  it('Post Loan Payment with Account [422]: post invalid Payment', () => {
    let payload = serviceMacPayloadGenerator.generateData();
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    payload.data.attributes.late_fees_paid = faker.number.int({ min: 10000000000, max: 99999999999 }).toString();

    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.late_fees).to.be.an('array');
      expect(response.body.errors.late_fees).to.deep.include('cannot be paid because none are owed.');
    });
  });

  it('Post Loan Payment with Account [422]: post duplicated payment', () => {
    // this scenario can fail if faker creates the same amounts

    let payload = serviceMacPayloadGenerator.generateData();
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    cy.log(JSON.stringify(payload));
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
    let payload = serviceMacPayloadGenerator.generateData();
    payload.data.attributes.pay_account_id = serviceMacApi.cypressEnv.account_id;
    const totalAmount = payload.data.attributes.total_amount_due;
    delete payload.data.attributes.total_amount_due;
    cy.log(JSON.stringify(payload));
    serviceMacApi.postLoanPaymentPayAccountId(payload).then((response) => {


      expect(response.status).to.eq(422);
      expect(response.body.errors.total_amount_due[0]).to.eq(`does not add up! Should be $${ totalAmount }.00.`);
    });
  });
});