import { UsbPaymentApi } from '../../../../support/api_objects/usb/us_bank'

describe('US Bank: Bank Info', function () {
    const usbApi = new UsbPaymentApi();
    let queryParameters;

    before(() => {
        queryParameters = {
            'loan_number': usbApi.getEnvironment().loan_number,
            'client_id': usbApi.getEnvironment().client_id
        };
    })

    it('Get Bank Info: verify valid bank returns forrect data', () => {
        usbApi.getBankInfo(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.bank_name).to.eq('US BANK NA');
            expect(response.body.found).to.eq(true);
            expect(response.body.waived_fee).to.eq(true);
        });
    });
})