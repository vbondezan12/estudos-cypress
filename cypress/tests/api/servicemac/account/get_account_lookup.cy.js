import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/servicemac/servicemac_api';

describe('API Tests: servicemac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Get Accounts lookup [200]: verify valid account', () => {
    const account = serviceMacApi.cypressEnv.account;

    serviceMacApi.getAccountLookup(account, serviceMacApi.cypressEnv.authorization).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Get Accounts lookup [404]: verify invalid account', () => {
    const account = faker.number.int({ min: 1000000, max: 9999999 });
    serviceMacApi.getAccountLookup(account, serviceMacApi.cypressEnv.authorization).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

});