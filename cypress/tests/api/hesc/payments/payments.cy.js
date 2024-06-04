import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js';

describe('HESC', function () {
  describe('/payments', function () {
    const hescApi = new HescApi();

    xit('GET vru_payment: return 200 with valid account_holders', () => {
      hescApi.getPayments(environment.account_holder).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('VEN-15594_hesc_get_payments_with_invalid_account_number', () => {
      const account = faker.number.int({ min: 1000000, max: 9999999 });

      hescApi.getPayments(account).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});