import { faker } from '@faker-js/faker';
import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js';

describe('HESC', function () {
  describe('/account_holders', function () {
    const hescApi = new HescApi();

    beforeEach(() => {
      cy.clearAllSessionStorage({ log: true });
    });

    xit('GET account_holders holders: returns 200 when given valid auth', () => {
      hescApi.getAccountHolders(environment.authorization).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    xit('Get account_holders holders: returns 401 when given invalid auth', () => {
      hescApi.getAccountHolders(faker.finance.accountNumber(300)).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});