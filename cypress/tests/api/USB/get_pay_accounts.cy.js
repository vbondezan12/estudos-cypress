import { UsbPaymentApi } from "../../../support/api_objects/USB/usb_payment"

describe('API Tests: VHDA', function() {
    const usbApi = new UsbPaymentApi();
    

    it('Get Pay Accounts: verify type and account_holder_id for each record',() => {
        const queryParameters = {"loan_number": "10916454","client_id": "515"}

        usbApi.getPayAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            const accountsList = response.body.data;
            accountsList.forEach((object) => {
                expect(object.type).to.eq('pay_account')
                expect(object.attributes.account_holder_id).to.eq(3553409)
            });
        });
    });

    it('Get Pay Accounts: verify invalid loan has empty data',() => {
        const queryParameters = {"loan_number": "invalid","client_id": "515"}

        usbApi.getPayAccounts(queryParameters).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array').that.is.empty;
        });
    });    
})