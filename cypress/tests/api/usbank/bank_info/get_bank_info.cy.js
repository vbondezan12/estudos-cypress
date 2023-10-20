import { UsBankApi } from '../../../../support/api_objects/usbank/usbank_api'

describe('US Bank: Bank Info', function () {
    const usbankApi = new UsBankApi();

    it('Get Bank Info: verify valid bank returns correct data', () => {
        const queryParameters = {
            'client_id': usbankApi.cypressEnv.client_id,
            'routing_number': usbankApi.cypressEnv.routing_number
        };

        usbankApi.getBankInfo(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.bank_name).to.eq('US BANK NA');
            expect(response.body.found).to.eq(true);
            expect(response.body.waived_fee).to.eq(true);
        });
    });
})