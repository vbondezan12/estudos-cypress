import { faker } from "@faker-js/faker";
import { HescApi } from '../../../../../support/api_objects/hesc/hesc_api.js'

describe('HESC: API tests', function () {
    const hescApi = new HescApi();
    const environment = Cypress.env('hesc');

    it('GET payments: return 200 with valid account', () => {
        hescApi.getPayments(environment.account_holder).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Get payments: return 404 with invalid account number', () => {
        const account = faker.number.int({ min: 1000000, max: 9999999 })
        hescApi.getPayments(account).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
})