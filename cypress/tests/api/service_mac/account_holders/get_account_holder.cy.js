import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();
  let testCredential;

  before(() => {
    const testPayload = serviceMacApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    serviceMacApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body['test_credentials'][0];
    });
  });

  it('Get Account Holder[200]: verify valid loan response', () => {
    const payload = serviceMacApi.payloadGenerator.generateAccountHoldersPayload(testCredential.loan_number);

    serviceMacApi.getAccountHolder(payload).then((response) => {
      // Verify a loan is found
      expect(response.status).to.eq(200);
      expect(response.body.data.length).to.be.greaterThan(0);

      // Get the loan and assert its attributes
      const loan = response.body.data[0];
      expect(loan.id).to.eq('99848');
      expect(loan.type).to.eq('account_holder');
      expect(loan.attributes.loan_number).to.eq(testCredential.loan_number.toString());
    });
  });

  it('Get Account Holder[404]: verify invalid loan has correct error', () => {
    const payload = serviceMacApi.payloadGenerator.generateAccountHoldersPayload(
      faker.number.int({ min: 1000000, max: 9999999 }));

    serviceMacApi.getAccountHolder(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.length).to.eq(0);
    });
  });
});