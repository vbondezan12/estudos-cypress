import { VhdaApi } from '../../../../support/api_objects/vhda/vhda';
import { VhdaPayloadGenerator } from '../../../../support/payload_generators/vhda/vhda_payload_generator';

const { faker } = require('@faker-js/faker');

describe('vhda: GetEscrowShortage', function () {
  const vhdaPayloadGenerator = new VhdaPayloadGenerator();
  const environment = Cypress.env('vhda');
  const vhdaApi = new VhdaApi();
  let credentials = vhdaPayloadGenerator.quick_pay(environment.loan_number, environment.zip, environment.ssn);

  before(() => {
    vhdaApi.createQuickPayJwt(credentials);
  });

  it('get escrow shortage returns 200 with valid credentials', () => {
    vhdaApi.getEscrowShortage().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.equal(null);
    });
  });

  it('get escrow shortage returns 401 with invalid credentials', () => {
    vhdaApi.getEscrowShortage(faker.string.uuid).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.not.equal(null);

    });
  });
});