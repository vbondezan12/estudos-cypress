import { HescApi } from '../../../../support/api_objects/hesc/hesc_api.js'

describe('HESC: Accounts', function () {
    const hescApi = new HescApi();

    it('GET account holders: returns 200 when given invalid auth', () => {
        hescApi.getAccountHolders().then((response) => {
            expect(response.status).to.eq(200);
        });
    });
})