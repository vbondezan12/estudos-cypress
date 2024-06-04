import { faker } from '@faker-js/faker';
import { ServiceMacApi } from '../../../../support/api_objects/service_mac/servicemac_api';

describe('ServiceMac', function () {
  describe('/pay_accounts', function () {
    const serviceMacApi = new ServiceMacApi();

    xit('Get Pay Accounts [200]: verify valid account_holders', () => {
      const accountHolder = serviceMacApi.cypressEnv.account_holder;

      serviceMacApi.getPayAccounts(accountHolder).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data[ 0 ].type).to.eq('pay_account');
      });
    });

    it('VEN-15594_servicemac_get_pay_accounts_with_invalid_account_holder', () => {
      const accountHolder = faker.number.int({ min: 1000000, max: 9999999 });

      serviceMacApi.getPayAccounts(accountHolder).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});