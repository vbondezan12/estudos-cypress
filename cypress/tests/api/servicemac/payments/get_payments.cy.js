import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/servicemac/servicemac_api';

describe('API Tests: servicemac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Get Payment [200]: verify valid payments', () => {
    const account = serviceMacApi.cypressEnv.account;

    serviceMacApi.getPayments(account).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].attributes.loan_number).to.eq(serviceMacApi.cypressEnv.loan_number);
    });
  });

  it('Get Payments [404]: verify invalid payments', () => {
    const account = faker.number.int({ min: 1000000, max: 9999999 });

    serviceMacApi.getPayments(account).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

