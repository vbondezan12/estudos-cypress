import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js';

describe('HESC', function () {
  describe('/bank_accounts', function () {
    const hescApi = new HescApi();

    xit('POST create bank account_holders: returns 200 with valid account_holders number', () => {
      let payload = hescApi.payloadGenerator.generateData(environment.account_number, environment.routing_number);
      hescApi.createBankAccount(payload, environment.account_holder).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    xit('POST create bank account_holders: returns 404 using invalid routing number', () => {
      const routing = faker.number.int({ min: 1000000, max: 9999999 });
      let payload = hescApi.payloadGenerator.generateData(environment.account_number, routing);
      hescApi.createBankAccount(payload, environment.account_holder).then((response) => {
        expect(response.status).to.eq(422);
      });
    });
  });
});