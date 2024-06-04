import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js';

describe('HESC', function () {
  describe('/pay_accounts', function () {
    const hescApi = new HescApi();

    xit('GET pay account_holders: return 200 with valid account_holders number', () => {
      hescApi.getPayAccounts(environment.account_holder).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('VEN-15594_hesc_get_pay_accounts_with_invalid_account_number', () => {
      const account = faker.number.int({ min: 1000000, max: 9999999 });

      hescApi.getPayAccounts(account).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});