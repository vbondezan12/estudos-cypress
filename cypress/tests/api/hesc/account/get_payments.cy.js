import { faker } from "@faker-js/faker";
import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js'

describe('HESC: Accounts', function () {
    const hescApi = new HescApi();
    const environment = Cypress.env('hesc');

    it('GET payments: return 200 with valid account', () => {
        hescApi.getPayments(environment.account_holder).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get payments: return 404 with invalid account number', () => {
        hescApi.getPayments(faker.finance.accountNumber(300)).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})