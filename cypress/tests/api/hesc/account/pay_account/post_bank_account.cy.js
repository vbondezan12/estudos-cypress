import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../../support/api_objects/hesc/hesc_api.js'
import { HescPaymentPayloadGenerator } from '../../../../../support/payload_generators/hesc/hesc_payment_payload_generator.js'

describe('HESC: API tests', function () {
  const hescApi = new HescApi();
  const environment = Cypress.env('hesc');
  const HescPayloadGenerator = new HescPaymentPayloadGenerator();

  it('POST create bank account: returns 200 with valid account number', () => {
    let payload = HescPayloadGenerator.generateData(environment.account_number, environment.routing_number);
    hescApi.createBankAccount(payload, environment.account_holder).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('POST create bank account: returns 404 using invalid routing number', () => {
    const routing = faker.number.int({ min: 1000000, max: 9999999 });
    let payload = HescPayloadGenerator.generateData(environment.account_number, routing);
    hescApi.createBankAccount(payload, environment.account_holder).then((response) => {
      expect(response.status).to.eq(422);
    });
  });
});