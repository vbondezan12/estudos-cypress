import { UsbPaymentApi } from "../../../support/api_objects/USB/usb_payment"

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
    

    it('Get Bank Info: verify valid bank returns forrect data',() => {
        const queryParameters = {"routing_number": "042100175","client_id": "515"}

        usbApi.getBankInfo(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.bank_name).to.eq('US BANK NA');
            expect(response.body.found).to.eq(true);
            expect(response.body.waived_fee).to.eq(true);
        });

    });
    
})