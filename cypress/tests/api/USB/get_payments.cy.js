import { UsbPaymentApi } from "../../../support/api_objects/USB/usb_payment"

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
   
    it('Get Payments: verify type and account_holder_id for each record',() => {
        const queryParameters = {"loan_number": "10916454","client_id": "515"}

        usbApi.getPayments(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            const accountsList = response.body.data;
            accountsList.forEach((object) => {
                expect(object.type).to.eq('payment')
                expect(object.id).to.eq(String(object.attributes.tracking))
            });
        });
    });
    
})