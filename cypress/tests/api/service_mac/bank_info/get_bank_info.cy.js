import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';
import { faker } from '@faker-js/faker';

describe('API Tests: ServiceMac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Get Bank Info [200]: verify valid bank info', () => {
    const queryParameters = {
      'routing_number': serviceMacApi.cypressEnv.routing_number
    };
    serviceMacApi.getBankInfo(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bank_name).to.eq('US BANK NA');
      expect(response.body.found).to.eq(true);
    });
  });

  it('Get Bank Info [404]: verify invalid bank info', () => {
    const queryParameters = {
      'routing_number': faker.number.int({ min: 100000, max: 999999 })
    };
    serviceMacApi.getBankInfo(queryParameters).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bank_name).to.eq(null);
      expect(response.body.found).to.eq(false);
    });
  });
});