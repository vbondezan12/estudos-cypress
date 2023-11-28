import { faker } from "@faker-js/faker";
import { HescApi } from '../../../../../support/api_objects/hesc/hesc_api.js'

describe('HESC: API tests', function () {
    const hescApi = new HescApi();
    const environment = Cypress.env('hesc');

    beforeEach(() => {
        cy.clearAllSessionStorage({log: true});
    });

    it.only('GET account holders: returns 200 when given valid auth', () => {
        hescApi.getAccountHolders(environment.authorization).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get account holders: returns 401 when given invalid auth', () => {
        hescApi.getAccountHolders(faker.finance.accountNumber(300)).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
})