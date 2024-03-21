import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../../support/api_objects/hesc/hesc_api.js';

describe('HESC: API tests', function () {
  const hescApi = new HescApi();

  xit('GET pay account: return 200 with valid account number', () => {
    hescApi.getPayAccounts(environment.account_holder).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('GET pay account: return 404 with invalid account number', () => {
    const account = faker.number.int({ min: 1000000, max: 9999999 });

    hescApi.getPayAccounts(account).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});