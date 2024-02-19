import { faker } from '@faker-js/faker';
import { ServiceMacApi } from "../../../../support/api_objects/service_mac/servicemac_api"

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Get Account Holder[200]: verify valid loan response', () => {
    const queryParameters = {
      'loan_number': serviceMacApi.cypressEnv.loan_number
    };
    serviceMacApi.getAccountHolder(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Get Account Holder[404]: verify invalid loan has correct error', () => {
    const queryParameters = {
      'loan_number': faker.number.int({ min: 1000000, max: 9999999 })
    };

    serviceMacApi.getAccountHolder(queryParameters).then((response) => {
      // TODO
      expect(response.status).to.eq(404);
    });
  });
});