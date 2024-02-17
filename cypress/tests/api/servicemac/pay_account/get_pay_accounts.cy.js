import { faker } from '@faker-js/faker';
import { ServiceMacApi } from 'cypress/support/api_objects/servicemac/servicemac_api';

describe('API Tests: servicemac', function () {
  const serviceMacApi = new ServiceMacApi();

  it('Get Pay Accounts [200]: verify valid account', () => {
    const accountHolder = serviceMacApi.cypressEnv.account_holder;

    serviceMacApi.getPayAccounts(accountHolder).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0].type).to.eq('pay_account');
    });
  });

  it('Get Pay Accounts [404]: verify invalid account', () => {
    const accountHolder = faker.number.int({ min: 1000000, max: 9999999 });

    serviceMacApi.getPayAccounts(accountHolder).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});