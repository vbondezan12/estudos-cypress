import { faker } from '@faker-js/faker';
import { LOAN_STATUS } from '../../../../config/constants';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();
  let testCredential;

  before(() => {
    const testPayload = serviceMacApi.payloadGenerator.generateTestCredentialsLookupPayload(LOAN_STATUS.CURRENT);
    serviceMacApi.getTestLoans(testPayload).then((response) => {
      testCredential = response.body[0];
    });
  });

  xit('Get Accounts lookup [200]: verify valid account_holders', () => {
    const account = testCredential.loan_number;

    serviceMacApi.getAccountLookup(account).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Get Accounts lookup [404]: verify invalid account_holders', () => {
    const account = faker.number.int({ min: 1000000, max: 9999999 });
    serviceMacApi.getAccountLookup(account).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});