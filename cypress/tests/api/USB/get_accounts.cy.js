import { UsbPaymentApi } from "../../../support/api_objects/USB/usb_payment"

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
    
    it('Get Accounts: verify invalid loan has correct error',() => {
        const queryParameters = {"loan_number": "invalid","client_id": "DDA"}

        usbApi.getAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.error).to.eq('Invalid Account Number or Product Id. Please validate and resubmit');
        });
    });
    
})